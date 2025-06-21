import { Jost } from "next/font/google";
import SessionProvider from "./components/SessionProvider";
import "./globals.css";
import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { headers } from "next/headers";
import MainLayout from "./main/layout";
import AccountLayout from "./account/layout";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

const MAIN_DOMAINS = [
  "rateplace.cl",
  "www.rateplace.cl",
  "localhost",
  "127.0.0.1",
];

export const metadata = {
  title: "Rate Place - Califica tus lugares favoritos",
  description: "Una aplicación para calificar y descubrir lugares",
};

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
    <html lang="es" className={`${jost.variable}`}>
      <body style={{ fontFamily: "var(--font-jost), sans-serif" }}>
        <SessionProvider session={session}>
          <ToastContainer />
          {isMainDomain ? (
            <MainLayout>{children}</MainLayout>
          ) : (
            <AccountLayout>
              {children}
            </AccountLayout>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
