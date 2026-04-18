"use client";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "@/modules/base/components/ProfileMenu";
import { internal_user } from "../utils/test";
import { UserInfo } from "../types";
import { useAuth } from "../hooks/useAuth";
interface Props {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsSidebarOpen }: Props) {
  const { userInfo } = useAuth();

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 z-20 text-black">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden px-2 py-1 bg-gray-100 rounded"
            onClick={() => setIsSidebarOpen?.((v) => !v)}
          >
            ☰
          </button>
          {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 relative">
          {/* Search */}
          <div className="relative mr-3">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 border-gray-200 text-black"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {/* Popup Card */}
          {userInfo && (
            <ProfileMenu
              userInfo={userInfo}
              profile_menus={[
                {
                  label: "My Account",
                  icon: faUser,
                  href: "",
                },
                {
                  label: "Account Settings",
                  icon: faGear,
                  href: "",
                },
              ]}
            />
          )}
        </div>
      </div>
    </header>
  );
}
