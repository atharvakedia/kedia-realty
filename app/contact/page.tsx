import type { Metadata } from "next";

import { ContactForm } from "@/app/contact/ContactForm";
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
