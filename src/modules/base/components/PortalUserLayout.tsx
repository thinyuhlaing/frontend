import { ReactNode, useEffect } from "react";
import "@/modules/website/styles/website.css";
import Header from "@/modules/website/components/Header";
import Footer from "@/modules/website/components/Footer";
import AppSnackbar from "./AppSnackBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/base/hooks/useAuth";
import Loading from "@/modules/base/components/Loading";

export default function PortalUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <Loading />;

  if (status === "unauthenticated") {
    router.replace("/auth/login");
    return null;
  }

  return (
    <div>
      <Header />
      <main className="wrapper">{children}</main>
      <AppSnackbar />
      <Footer />
    </div>
  );
}
