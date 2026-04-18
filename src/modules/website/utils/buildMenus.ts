import { MainMenu } from "@/modules/website/types/website";
import { ModuleManifest, ModuleNavItem } from "@/moduleTypes";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export function buildMergedMenus(modules: ModuleManifest[]): MainMenu[] {
  //   console.log("Build Merged Menu running.............");

  const allNavItems = modules.flatMap((m) => m.navItems || []);

  const map = new Map<string, any>();

  // 1️⃣ Create all menu nodes
  allNavItems.forEach((item) => {
    map.set(item.id, {
      id: item.id,
      label: item.label,
      href: item.href || "#",
      icon: item.icon,
      parent: item.parent,
      sub_parent: (item as any).sub_parent,
      subMenu: [],
      nestedMenu: [],
    });
  });

  const roots: any[] = [];

  // 2️⃣ Build hierarchy
  map.forEach((item) => {
    // ROOT (no parent + no sub_parent)
    if (!item.parent && !item.sub_parent) {
      roots.push(item);
      return;
    }

    // SECOND LEVEL (has sub_parent)
    if (item.sub_parent) {
      const parent = map.get(item.sub_parent);
      if (parent) {
        parent.nestedMenu.push(item);
      }
    }
    // FIRST LEVEL (has parent)
    if (item.parent) {
      const parent = map.get(item.parent);
      if (parent) {
        parent.subMenu.unshift(item);
      }
      return;
    }
  });

  // 3️⃣ Normalize output shape
  return roots.map((root) => ({
    label: root.label,
    href: root.href,
    icon: root.icon,
    subMenu: root.subMenu.map((sub: any) => ({
      label: sub.label,
      href: sub.href,
      nestedMenu: sub.nestedMenu.map((nest: any) => ({
        label: nest.label,
        href: nest.href,
      })),
    })),
  }));
}
