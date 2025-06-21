import { Jost } from "next/font/google";

import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Rate Place - Califica tus lugares favoritos",
  description: "Una aplicación para calificar y descubrir lugares",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jost.variable}`}>
      <body style={{ fontFamily: "var(--font-jost), sans-serif" }}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
