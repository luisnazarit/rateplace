// lib/getTenant.ts
import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

export async function getCurrentUserRole() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const slug = await getCurrentTenant();

  const accountRole = await prisma.accountRole.findFirst({
    where: {
      userId: session.user.id,
      account: {
        slug: slug,
      },
    },
    include: {
      account: true,
      role: true,
    },
  });

  return accountRole;
}

export async function getCurrentAccount() {
  const slug = await getCurrentTenant();

  const account = await prisma.businessAccount.findUnique({
    where: {
      slug: slug,
    },
  });

  return account;
}
