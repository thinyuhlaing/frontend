"use client";
import { useMemo } from "react";
import { useTenant } from "@/lib/tenant";
import { usePermissions } from "@/lib/permissions";
import { allModules } from "@/registry";

export function useEnabledModules() {
  const tenant = useTenant();
  const { has } = usePermissions();
  return useMemo(
    () =>
      allModules.filter((m) => {
        const enabled = tenant.enabledFeatures.includes(m.id);
        const hasPerms = m.requiredPermissions.every(has);
        const depsOk = (m as any).depends
          ? (m as any).depends.every((d: string) =>
              tenant.enabledFeatures.includes(d),
            )
          : true;

        if (enabled && !depsOk) {
          const missing = (m as any).depends.filter(
            (d: string) => !tenant.enabledFeatures.includes(d),
          );
          // warn so developers / admins see install/enable problems
          // in a real UI you might surface this to the user instead
          // of only logging to console.
          // eslint-disable-next-line no-console
          console.warn(
            `Module '${m.id}' requires missing dependencies: ${missing.join(", ")}`,
          );
        }

        return enabled && hasPerms && depsOk;
      }),
    [tenant, has],
  );
}
