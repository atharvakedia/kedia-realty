import type { Project } from "@/lib/types";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/logokediagroup.png"),
    email: "hello@kediarealty.com",
    telephone: "+91 9950158468",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B2/12, Gandhi Path Rd, Vaishali Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302013",
      addressCountry: "IN",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    url: siteUrl,
    image: absoluteUrl("/logokediagroup.png"),
    email: "hello@kediarealty.com",
    telephone: "+91 9950158468",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B2/12, Gandhi Path Rd, Vaishali Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302013",
      addressCountry: "IN",
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/properties/${project.slug}`),
    image: absoluteUrl(project.image),
    about: {
      "@type": "Place",
      name: project.title,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location,
        addressRegion: project.region,
        addressCountry: "IN",
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Project Type",
          value: project.type,
        },
        {
          "@type": "PropertyValue",
          name: "Project Status",
          value: project.status,
        },
        {
          "@type": "PropertyValue",
          name: "RERA Number",
          value: project.reraNumber,
        },
      ],
    },
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}
