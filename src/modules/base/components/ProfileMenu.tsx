"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faUser,
  faGear,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { logout } from "@/modules/base/utils/auth";
import { UserInfo } from "../types";

interface MenuItem {
  label: string;
  icon: IconDefinition;
  href: string;
}

interface Props {
  // employee: {
  //   name: string;
  //   job_title: string;
  //   image_1920: string;
  // };
  userInfo: UserInfo;
  profile_menus?: MenuItem[];
}

export default function ProfileMenu({ userInfo, profile_menus }: Props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  // const profile_menus: MenuItem[] = [
  //   {
  //     label: "My Account",
  //     icon: faUser,
  //     href: "",
  //   },
  //   {
  //     label: "Account Settings",
  //     icon: faGear,
  //     href: "",
  //   },
  // ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popupRef}>
      {/* Profile Trigger */}
      <button
        onClick={() => setIsPopupOpen((s) => !s)}
        className="flex items-center gap-3 focus:outline-none group p-1 rounded-full hover:bg-gray-50 transition-colors"
      >
        <div className="relative">
          <Image
            src="/image/default-avatar.jpg"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-transparent group-hover:border-(--primary)/30 transition-all object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div className="hidden md:block text-left mr-2">
          <div className="text-sm font-bold text-gray-800 leading-none">
            {userInfo.name}
          </div>
          {/* <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
            {employee.job_title}
          </div> */}
        </div>
      </button>

      {/* Popup Menu */}
      <div
        className={`absolute top-full mt-3 right-0 w-72 bg-white rounded-2xl shadow-2xl z-50 border border-gray-100
        transform transition-all duration-200 ease-out origin-top
        ${
          isPopupOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* ARROW - Matches the background of the first section */}
        <div className="absolute -top-1.5 left-5 md:left-auto md:right-5 w-3 h-3 bg-gray-50 border-t border-l border-gray-100 rotate-45 z-[-1]"></div>

        {/* Profile Header */}
        <div className="p-5 flex items-center gap-4 bg-gray-50/50 rounded-t-2xl">
          <Image
            src={"/image/default-avatar.jpg"}
            alt="Employee"
            width={48}
            height={48}
            className="rounded-full shadow-sm"
          />
          <div className="overflow-hidden">
            <h3 className="font-bold text-gray-900 truncate">
              {userInfo.name}
            </h3>
            <p className="text-xs text-gray-500 truncate lowercase">
              {userInfo.email}
            </p>
          </div>
        </div>

        <div className="p-2">
          {profile_menus?.map((menu, index) => (
            <Link href={menu.href} key={index}>
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 text-sm text-gray-600 hover:bg-(--primary)/10 hover:text-(--primary) rounded-xl transition-all group"
              >
                <FontAwesomeIcon
                  icon={menu.icon}
                  className="w-4 h-4 opacity-50 group-hover:opacity-100"
                />
                <span className="font-medium">{menu.label}</span>
              </button>
            </Link>
          ))}

          <hr className="my-2 border-gray-100 mx-2" />

          <button
            className="w-full flex items-center gap-3 p-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all group"
            // onClick={() => setIsPopupOpen(false)}
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />
            <span className="font-bold">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
