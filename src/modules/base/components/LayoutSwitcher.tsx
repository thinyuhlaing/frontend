"use client";
import { usePathname } from "next/navigation";
import WebsiteLayout from "@/modules/website/components/WebsiteLayout";
import AdminUserLayout from "@/modules/base/components/AdminUserLayout";
import { ReactNode } from "react";
import PortalUserLayout from "@/modules/base/components/PortalUserLayout";

export default function LayoutSwitcher({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";

  if (pathname.includes("admin")) {
    return <AdminUserLayout>{children}</AdminUserLayout>;
  } else if (pathname.includes("my")) {
    return <PortalUserLayout>{children}</PortalUserLayout>;
  } else {
    return <WebsiteLayout>{children}</WebsiteLayout>;
  }
}
