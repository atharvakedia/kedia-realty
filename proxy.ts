import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { adminHostname, isPublicSiteHostname } from "@/lib/admin-domain";

const ADMIN_REQUEST_HEADER = "x-kedia-admin-host";

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function requestHostname(request: NextRequest) {
  return (request.headers.get("x-forwarded-host") || request.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();
}

function cleanAdminPath(pathname: string) {
  const path = pathname.replace(/^\/admin(?=\/|$)/, "");
  return path || "/";
}

function internalAdminPath(pathname: string) {
  return pathname === "/" ? "/admin" : `/admin${pathname}`;
}

function adminDestination(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return url;
}

function createAdminRewrite(request: NextRequest, pathname: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(ADMIN_REQUEST_HEADER, "1");

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = pathname;

  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function proxy(request: NextRequest) {
  const hostname = requestHostname(request);
  const pathname = request.nextUrl.pathname;
  const isAdminHost = hostname === adminHostname;

  if (isPublicSiteHostname(hostname) && pathname.startsWith("/admin")) {
    const destination = request.nextUrl.clone();
    destination.hostname = adminHostname;
    destination.protocol = "https:";
    destination.port = "";
    destination.pathname = cleanAdminPath(pathname);
    return NextResponse.redirect(destination);
  }

  if (!isAdminHost && !pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  if (isAdminHost && pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  if (isAdminHost && pathname.startsWith("/admin")) {
    const destination = request.nextUrl.clone();
    destination.pathname = cleanAdminPath(pathname);
    return NextResponse.redirect(destination);
  }

  const adminPath = isAdminHost ? internalAdminPath(pathname) : pathname;
  const visiblePath = (path: string) =>
    isAdminHost ? path : path === "/" ? "/admin" : `/admin${path}`;
  const createResponse = () =>
    isAdminHost
      ? createAdminRewrite(request, adminPath)
      : NextResponse.next({ request });

  let response = createResponse();

  if (!hasSupabaseEnv()) {
    if (adminPath !== "/admin/login") {
      const loginUrl = adminDestination(request, visiblePath("/login"));
      loginUrl.searchParams.set("setup", "1");
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = createResponse();
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (adminPath !== "/admin/login") {
    if (!user) {
      return NextResponse.redirect(
        adminDestination(request, visiblePath("/login")),
      );
    }

    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) {
      const loginUrl = adminDestination(request, visiblePath("/login"));
      loginUrl.searchParams.set("unauthorized", "1");
      return NextResponse.redirect(loginUrl);
    }
  }

  if (adminPath === "/admin/login" && user) {
    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      return NextResponse.redirect(
        adminDestination(request, visiblePath("/")),
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
