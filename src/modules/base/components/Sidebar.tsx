"use client";
import Image from "next/image";
import SideMenuItem from "./SideMenuItem";
import { useEnabledModules } from "../../../../moduleRegistry";
import { buildMergedMenus } from "@/modules/website/utils/buildMenus";
import { MainMenu } from "@/modules/website/types/website";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const modules = useEnabledModules();

  const exampleMenus: MainMenu[] = buildMergedMenus(modules);
  return (
    <>
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-gray-800  text-white  w-64 space-y-6 py-7 px-2 z-30 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/image/logo.png"
            alt="logo"
            width={36}
            height={36}
            className="rounded"
          />
          <div>
            <div className="font-bold">BEE Data Myanmar</div>
          </div>
        </div>
        <nav className="list-none">
          {exampleMenus.map((menu, index) => (
            <SideMenuItem key={index} item={menu} />
          ))}
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
