import { ReduxProvider } from "@/lib/ReduxProvider";
// import "@/modules/website/styles/website.css";
import { ReactNode } from "react";
import { TenantProvider } from "@/lib/tenant";
import Header from "./Header";
import Footer from "./Footer";
import "@/modules/website/styles/website.css";
import AppSnackbar from "@/modules/base/components/AppSnackBar";
export const metadata = {
  title: "GIC – Guarantee International College",
  description: "Next.js modular app (Helpdesk + HR)",
};

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="wrapper">{children}</main>
      {/* <AppSnackbar /> */}
      <Footer />
      <AppSnackbar />
    </div>
  );
}
