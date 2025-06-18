// lib/getTenant.ts
import { headers } from "next/headers";

const RESERVED_DOMAINS = [
  "www",
  "admin",
  "api",
  "app",
  "auth",
  "blog",
  "dev",
  "mail",
  "shop",
  "store",
  "support",
  "test",
  "beta",
  "staging",
  "prod",
  "production",
  "demo",
  "help",
  "info",
  "login",
  "signup",
  "register",
  "dashboard",
  "portal",
  "system",
];

export async function getCurrentTenant() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const tenant = host.split(".")[0];

  if (RESERVED_DOMAINS.includes(tenant.toLowerCase())) {
    throw new Error(
      `Domain name "${tenant}" is reserved and cannot be used as a tenant name.`
    );
  }

  return tenant;
}
