import { Jost, Edu_AU_VIC_WA_NT_Hand } from "next/font/google";
import SessionProvider from "./components/SessionProvider";
import "./globals.css";
import { auth } from "@/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const jost = Jost({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
});

const eduHand = Edu_AU_VIC_WA_NT_Hand({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-edu-hand',
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
  const session = await auth();

  return (
    <html lang="es" className="dark">
      <body className={`${jost.className} ${eduHand.variable} bg-gray-900 text-gray-100`}>
        <SessionProvider session={session}>
          <ToastContainer position="top-right" autoClose={2000} />
          <main className="min-h-screen bg-gray-900">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
