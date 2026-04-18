"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NestedMenu, subMenu, MainMenu } from "@/modules/website/types/website";

interface Props {
  item: MainMenu;
}

export default function SideMenuItem({ item }: Props) {
  const nowPath = usePathname();
  const [activeMenu, setActiveMenu] = useState<string[]>([]);
  const [activesubMenu, setActivesubMenu] = useState<string[]>([]);

  const toggleSubMenu = (subMenu: string) => {
    setActivesubMenu((prev) =>
      prev.includes(subMenu)
        ? prev.filter((item) => item !== subMenu)
        : [...prev, subMenu],
    );
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu],
    );
  };

  useEffect(() => {
    if (item.href === nowPath) {
      setActiveMenu((prev) =>
        prev.includes(item.label) ? prev : [...prev, item.label],
      );
      return;
    }

    const foundSubMenu = item.subMenu.find((sub) => {
      if (sub.href === nowPath) return true;
      return sub.nestedMenu?.some((nested) => nested.href === nowPath);
    });

    if (foundSubMenu) {
      setActiveMenu((prev) =>
        prev.includes(item.label) ? prev : [...prev, item.label],
      );

      setActivesubMenu((prev) =>
        prev.includes(foundSubMenu.label)
          ? prev
          : [...prev, foundSubMenu.label],
      );
    }
  }, [nowPath, item]);

  return (
    <li className="list-none">
      {item.subMenu.length > 0 ? (
        <>
          {/* MAIN MENU */}
          <div
            onClick={() => toggleMenu(item.label)}
            className="flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 text-gray-400 hover:bg-gray-700"
          >
            {item.icon && (
              <FontAwesomeIcon icon={item.icon} className="mr-3 w-4 h-4" />
            )}

            <span className="font-medium">{item.label}</span>

            <FontAwesomeIcon
              className="ms-auto w-3 h-3"
              icon={activeMenu.includes(item.label) ? faAngleUp : faAngleDown}
            />
          </div>

          {/* SUB MENU */}
          {activeMenu.includes(item.label) && (
            <ul className=" my-3 ml-10 space-y-1 list-none ">
              {item.subMenu.map((submenu: subMenu, index: number) => (
                <li key={index} className="list-none">
                  {submenu.nestedMenu && submenu.nestedMenu.length > 0 ? (
                    <>
                      {/* SUB MENU TITLE */}
                      <div
                        onClick={() => toggleSubMenu(submenu.label)}
                        className={`flex items-center p-3  my-1 rounded-md cursor-pointer transition-colors duration-200 ${
                          activesubMenu.includes(submenu.label)
                            ? " text-gray-400"
                            : "text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        <span>{submenu.label}</span>

                        <FontAwesomeIcon
                          className="ms-auto w-3 h-3"
                          icon={
                            activesubMenu.includes(submenu.label)
                              ? faAngleUp
                              : faAngleDown
                          }
                        />
                      </div>

                      {/* NESTED MENU */}
                      {activesubMenu.includes(submenu.label) && (
                        <ul className="ml-6 my-3 space-y-1 list-none">
                          {submenu.nestedMenu.map(
                            (nestMenu: NestedMenu, index: number) => (
                              <li key={index}>
                                <Link
                                  className={`block p-2  my-1 rounded-md transition-colors duration-200 ${
                                    nestMenu.href === nowPath
                                      ? "bg-(--primary) "
                                      : "text-gray-400 hover:bg-gray-700"
                                  }`}
                                  href={nestMenu.href}
                                >
                                  {nestMenu.label}
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                        submenu.href === nowPath
                          ? "bg-(--primary) text-white"
                          : "text-gray-400 hover:bg-gray-700"
                      }`}
                      href={submenu.href}
                    >
                      {submenu.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 mb-2  ${
            item.href === nowPath
              ? "bg-(--primary) text-white"
              : "text-gray-400 hover:bg-gray-700"
          }`}
          href={item.href}
        >
          {item.icon && (
            <FontAwesomeIcon icon={item.icon} className="mr-3 w-4 h-4" />
          )}

          <span className="font-medium">{item.label}</span>
        </Link>
      )}
    </li>
  );
}
