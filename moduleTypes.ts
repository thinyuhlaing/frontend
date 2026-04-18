import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { NextRequest, NextResponse } from "next/server";

export type ModuleRoute = {
  path: string;
  component: React.ComponentType;
};

export interface ModuleNavItem {
  id: string;
  label: string;
  href: string;
  icon?: IconDefinition;
  // hierarchy
  parent?: string;
  sub_parent?: string;
}

export type ModuleProfileBlockItem = {
  id: string;
  title: string;
  description?: string;
  icon: IconDefinition;
  href: string;
};
// export type ModuleNavItem = { label: string; href: string };
export type ApiHandler = (
  req: NextRequest,
  segments: string[],
) => Promise<NextResponse>;
export type ModuleApi = {
  GET?: (req: NextRequest, segments: string[]) => Promise<NextResponse>;
  POST?: (req: NextRequest, segments: string[]) => Promise<NextResponse>;
  PUT?: (req: NextRequest, segments: string[]) => Promise<NextResponse>;
  DELETE?: (req: NextRequest, segments: string[]) => Promise<NextResponse>;
  [key: string]: ApiHandler | ModuleApi | undefined;
};

export type ModuleManifest = {
  id: string;
  api_prefix: string; // API prefix for routing
  folder?: string; // Optional folder name, defaults to id
  icon?: IconDefinition;
  name: string;
  description?: string;
  depends?: string[];
  routes: ModuleRoute[];
  navItems: ModuleNavItem[];
  profileBlocks?: ModuleProfileBlockItem[]; // <--- new optional key
  requiredPermissions: string[];
  api?: ModuleApi; // <-- this allows dynamic API routing
  // Optional client-side store integration provided by the module.
  // `reducers` should be a map of slice key -> reducer function.
  // `apis` is an array of RTK Query API objects created with `createApi()`.
  store?: {
    reducers?: Record<string, any>;
    apis?: any[];
  };
};
