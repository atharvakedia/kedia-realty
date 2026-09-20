import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";

export default function PublicSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
