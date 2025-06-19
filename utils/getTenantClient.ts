const RESERVED_DOMAINS = [
  "www", "admin", "api", "app", "auth", "blog", "dev", "mail", "shop", "store",
  "support", "test", "beta", "staging", "prod", "production", "demo", "help",
  "info", "login", "signup", "register", "dashboard", "portal", "system"
];

export function getTenantClient() {
  if (typeof window === "undefined") return null;
  const host = window.location.host;
  const tenant = host.split(".")[0];
  if (RESERVED_DOMAINS.includes(tenant.toLowerCase())) return null;
  return tenant;
} 