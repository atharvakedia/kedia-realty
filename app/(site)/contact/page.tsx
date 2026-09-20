import type { Metadata } from "next";

import { ContactForm } from "@/app/(site)/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { publicPageMetadata } from "@/lib/seo";
import { localBusinessJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = publicPageMetadata({
  title: "Contact Kedia Group",
  description:
    "Contact Kedia Group in Jaipur for project information, site visits, pricing, layouts, and real estate development inquiries across Rajasthan.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 lg:py-24">
      <JsonLd data={localBusinessJsonLd()} />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Start with a focused project conversation."
            body="Share the decision in front of you. We will respond with a measured view of timing, value, and next steps."
            headingLevel="h1"
          />
          <div className="mt-10 grid gap-6 border-t border-border-gray pt-8 text-sm leading-7 text-charcoal-text">
            <p>
              <span className="block text-slate-gray">Email</span>
              hello@kediarealty.com
            </p>
            <p>
              <span className="block text-slate-gray">Phone</span>
              +91 9950158468
            </p>
            <p>
              <span className="block text-slate-gray">Office</span>
              B2/12, Gandhi Path Rd, Vaishali Nagar, Jaipur, Rajasthan 302013, India
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
