"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import AppSnackbar from "./AppSnackBar";
import { useAuth } from "@/modules/base/hooks/useAuth";
import Loading from "@/modules/base/components/Loading";

interface Props {
  children: React.ReactNode;
}

export default function AdminUserLayout({ children }: Props) {
  const pathname = usePathname() || "/";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-(--primary)/4 font-sans antialiased flex flex-col md:flex-row">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <AppSnackbar />
      </div>
    </div>
  );
}
