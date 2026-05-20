import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kedia Group for premium real estate developer projects.",
};

export default function ContactPage() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Start with a focused project conversation."
            body="Share the decision in front of you. We will respond with a measured view of timing, value, and next steps."
          />
          <div className="mt-10 grid gap-6 border-t border-border-gray pt-8 text-sm leading-7 text-charcoal-text">
            <p>
              <span className="block text-slate-gray">Email</span>
              hello@kediarealty.com
            </p>
            <p>
              <span className="block text-slate-gray">Phone</span>
              +1 310 555 0184
            </p>
            <p>
              <span className="block text-slate-gray">Office</span>
              Beverly Hills, California
            </p>
          </div>
        </div>

        <form className="grid gap-5 bg-cool-mist p-6 md:p-8" aria-label="Contact form">
          {["Name", "Email", "Phone"].map((label) => (
            <label key={label} className="grid gap-2 text-sm text-charcoal-text">
              {label}
              <input
                className="min-h-12 border border-border-gray bg-white px-4 outline-none transition focus:border-primary-navy"
                type={label === "Email" ? "email" : "text"}
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm text-charcoal-text">
            How can we help?
            <textarea className="min-h-36 resize-y border border-border-gray bg-white px-4 py-3 outline-none transition focus:border-primary-navy" />
          </label>
          <Button href="mailto:hello@kediarealty.com" className="justify-self-start">
            Send inquiry
          </Button>
        </form>
      </div>
    </section>
  );
}
