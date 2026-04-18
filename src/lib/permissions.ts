"use client";
export type Permission = string;
const userPerms: Permission[] = [
  "helpdesk.read",
  "helpdesk.update",
  "hr.read",
];
export function usePermissions() {
  return { has: (p: Permission) => userPerms.includes(p) };
}
