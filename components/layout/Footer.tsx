import Link from "next/link";
import Image from "next/image";

import { navItems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-deep-navy bg-deep-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8 lg:py-20">
        <div>
          <Link href="/" className="inline-block" aria-label="Kedia Group home">
            <Image
              src="/kedia-logo-white-transparent.png"
              alt="Kedia Group"
              width={260}
              height={147}
              className="h-auto w-40 object-contain md:w-52"
            />
          </Link>
          {/* <p className="mt-5 max-w-sm text-sm leading-7 text-white/72">
            Premium real estate developer projects across residential,
            commercial, farm, and industrial formats.
          </p> */}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-silver-shadow">
            Explore
          </h2>
          <div className="mt-5 grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/72 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-silver-shadow">
            Contact
          </h2>
          <address className="mt-5 not-italic text-sm leading-7 text-white/72">
            B2/12, Gandhi Path Rd, Vaishali Nagar, Jaipur, Rajasthan 302013, India
            <br />
            <br />
            hello@kediarealty.com
            <br />
            +91 9950158468
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Kedia Group. All rights reserved.</p>
          <p>Equal Housing Opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
