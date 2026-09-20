export const adminHostname =
  process.env.NEXT_PUBLIC_ADMIN_HOST || "admin.kediagrp.com";

const publicSiteHostnames = new Set(["kediagrp.com", "www.kediagrp.com"]);

export function isPublicSiteHostname(hostname: string) {
  return publicSiteHostnames.has(hostname);
}
