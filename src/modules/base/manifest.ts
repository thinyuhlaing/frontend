import { faHouse, faStore } from "@fortawesome/free-solid-svg-icons";
import { ModuleManifest } from "@/moduleTypes";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/LoginForm";
import AppPage from "@/modules/base/pages/AppHome";

import { baseApi } from "@/modules/base/store/services/baseApi";
import snackbarReducer from "@/modules/base/store/slices/appSnackbarSlice";

const manifest: ModuleManifest = {
  id: "base",
  api_prefix: "base",
  name: "Base",
  routes: [
    { path: "/auth/login", component: Login },
    { path: "/my", component: MyAccount },
    { path: "/admin/app", component: AppPage },
  ],
  navItems: [
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   href: "/admin",
    //   icon: faHouse,
    // },
    {
      id: "base.app",
      label: "App",
      href: "/admin/app",
      icon: faStore,
    },
    {
      id: "base.setting",
      label: "Settings",
      href: "#",
      icon: faStore,
    },
    {
      id: "base.setting.user_company",
      label: "User & Companies",
      parent: "base.setting",
      href: "#",
      icon: faStore,
    },
  ],
  requiredPermissions: [],
  store: {
    reducers: {
      snackbar: snackbarReducer,
    },
    apis: [baseApi],
  },
};
export default manifest;
