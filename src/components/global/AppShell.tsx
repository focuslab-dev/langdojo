import { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

interface Breadcrumb {
  label: string;
  href: string;
}

interface AppShellProps {
  children: ReactNode;
  breadcrumbs?: Breadcrumb[];
  showTagline?: boolean;
}

export function AppShell({ children, breadcrumbs, showTagline }: AppShellProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-50">
      <SiteHeader breadcrumbs={breadcrumbs} showTagline={showTagline} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
