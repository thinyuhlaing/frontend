"use client";

import { useParams, notFound } from "next/navigation";
import { useMemo } from "react";
import { useEnabledModules } from "../../../moduleRegistry";

export default function DynamicModulePage() {
  const params = useParams();
  const segments = (params?.segments as string[]) || [];

  const subpath = "/" + segments.join("/");

  const modules = useEnabledModules();

  const RouteComp = useMemo(() => {
    for (const mod of modules) {
      for (const r of mod.routes) {
        // exact match
        if (r.path === subpath) return r.component;

        // dynamic match
        if (r.path.includes("[") && r.path.includes("]")) {
          const routeParts = r.path.split("/");
          const subParts = subpath.split("/");

          if (routeParts.length === subParts.length) {
            const isMatch = routeParts.every((part, i) => {
              return part.startsWith("[") || part === subParts[i];
            });

            if (isMatch) return r.component;
          }
        }
      }
    }

    return null;
  }, [modules, subpath]);

  if (!RouteComp) return notFound();

  return <RouteComp />;
}

// authentication, GET / POST,
// authentication from odoo -> api call > store in session ->  SSR get role and check before page load
