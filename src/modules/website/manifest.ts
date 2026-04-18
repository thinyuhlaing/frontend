import { ModuleManifest } from "@/moduleTypes";
// import * as websiteApiModule from "@/modules/website/api/endpoints";
import {
  faFileInvoiceDollar,
  faGlobe,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import WebSetting from "./pages/WebSetting";

const manifest: ModuleManifest = {
  id: "website",
  api_prefix: "website",
  icon: faGlobe,
  name: "Website",
  description: "Enterprise builder",

  routes: [
    // { path: "/admin", component: WebSetting },
    { path: "/admin/website/settings", component: WebSetting },
  ],
  navItems: [
    {
      id: "website",
      label: "Website",
      href: "#",
      icon: faGlobe,
    },
    {
      id: "website.configuration",
      parent: "website",
      label: "Configuration",
      href: "#",
      icon: faUserClock,
    },

    {
      id: "website.menu",
      sub_parent: "website.configuration",
      label: "Website Menus",
      href: "/admin/website/menus",
      icon: faUserClock,
    },
    {
      id: "website.setting",
      sub_parent: "website.configuration",
      label: "Settings",
      href: "/admin/website/settings",
      icon: faUserClock,
    },
  ],

  requiredPermissions: [],
};
export default manifest;
