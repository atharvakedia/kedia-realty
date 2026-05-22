import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs";

export function CareersAdminTabs({
  activeId,
  rolesCount,
  applicationsCount,
}: {
  activeId: "roles" | "applications";
  rolesCount: number;
  applicationsCount: number;
}) {
  return (
    <AnimatedNavigationTabs
      activeId={activeId}
      items={[
        {
          id: "roles",
          title: "Open Roles",
          href: "/admin/careers",
          count: rolesCount,
        },
        {
          id: "applications",
          title: "Applications",
          href: "/admin/careers/applications",
          count: applicationsCount,
        },
      ]}
    />
  );
}
