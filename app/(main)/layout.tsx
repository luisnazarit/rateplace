import { auth } from "@/auth";
import { headers } from "next/headers";

import SessionProvider from "../components/SessionProvider";
import AccountLayout from "./AccountLayout";
import MainLayout from "./MainLayout";

const MAIN_DOMAINS = [
  "rateplace.cl",
  "www.rateplace.cl",
  "localhost",
  "127.0.0.1",
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const hostname = host.split(":")[0];
  const isMainDomain = MAIN_DOMAINS.includes(hostname);
  const session = await auth();

  return (
    <SessionProvider session={session}>
      {isMainDomain ? (
        <MainLayout>{children}</MainLayout>
      ) : (
        <AccountLayout>{children}</AccountLayout>
      )}
    </SessionProvider>
  );
}
