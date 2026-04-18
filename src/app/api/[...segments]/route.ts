import { allModules } from "@/registry";
import { NextRequest, NextResponse } from "next/server";
import { ModuleManifest } from "@/moduleTypes";

// Map module IDs to manifests
const moduleMap = new Map<string, ModuleManifest>();
allModules.forEach((module) => moduleMap.set(module.api_prefix, module));

/**
 * Dynamically imports and resolves the handler from the module's API route file
 */
async function resolveHandler(
  moduleName: string,
  segments: string[],
  method: string,
) {
  const module = moduleMap.get(moduleName);
  if (!module) return null;

  const folder = module.id;

  // 1️⃣ Try exact match first
  let routePath = `@/modules/${folder}/api/${segments.join("/")}/route`;

  try {
    const routeModule = await import(routePath);
    const handler = routeModule[method] || routeModule.default?.[method];
    if (typeof handler === "function") return handler;
  } catch {}

  // 2️⃣ Fallback: replace last segment with [id] for dynamic routes
  if (segments.length > 0) {
    const dynamicSegments = [...segments];
    dynamicSegments[dynamicSegments.length - 1] = "[id]";

    routePath = `@/modules/${folder}/api/${dynamicSegments.join("/")}/route`;

    try {
      const routeModule = await import(routePath);
      const handler = routeModule[method] || routeModule.default?.[method];
      if (typeof handler === "function") return handler;
    } catch {}
  }

  return null;
}

/**
 * Main Dispatcher for all HTTP Methods
 */
async function handleRequest(req: NextRequest) {
  const segments = req.nextUrl.pathname
    .replace(/^\/api\//, "")
    .split("/")
    .filter(Boolean);

  const [moduleName, ...rest] = segments;

  if (!moduleName) {
    return NextResponse.json({ message: "API root" });
  }

  if (!moduleMap.has(moduleName)) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  const handler = await resolveHandler(moduleName, rest, req.method);

  if (!handler) {
    return NextResponse.json(
      { error: `Endpoint ${req.method} /api/${segments.join("/")} not found` },
      { status: 404 },
    );
  }

  // Pass req and the remaining path segments to the handler
  return handler(req, rest);
}

// Export all HTTP methods
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
