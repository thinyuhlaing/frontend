"use client";
import { createContext, useContext, useState } from "react";
type Tenant = { id: string; name: string; enabledFeatures: string[] };
const TenantCtx = createContext<Tenant | null>(null);
export function TenantProvider({ children }: { children: React.ReactNode }) {
  // In real life, fetch from API after auth. Here we hardcode for demo.
  const [tenant] = useState<Tenant>({
    id: "t1",
    name: "Acme",
    enabledFeatures: [
      "base",
      "website",
    ],
  });
  return <TenantCtx.Provider value={tenant}>{children}</TenantCtx.Provider>;
}
export function useTenant() {
  const ctx = useContext(TenantCtx);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider");
  return ctx;
}
