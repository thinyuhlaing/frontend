"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { websiteMenus } from "../utils/menu";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "@/modules/base/components/ProfileMenu";
import { UserInfo } from "@/modules/base/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/modules/base/hooks/useAuth";
export default function Header() {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src="/image/logo.png"
            width={200}
            height={200}
            alt="GIC Logo"
            className="h-12 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-500">
          {websiteMenus.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              aria-current={pathname?.startsWith(m.href) ? "page" : undefined}
              className="hover:text-(--primary) transition-colors"
            >
              {m.label}
            </Link>
          ))}

          {!userInfo && (
            <Link href={"/auth/login"}>
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">
                Sign In
              </button>
            </Link>
          )}
        </div>
        {userInfo && (
          <ProfileMenu
            userInfo={userInfo}
            profile_menus={[
              {
                label: "My Account",
                icon: faUser,
                href: "/my",
              },
            ]}
          />
        )}
      </div>
    </nav>
  );
}
