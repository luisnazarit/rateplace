import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/Button";

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-gradient-to-r from-blue-950 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <img src="/logo.png" width={50} alt="Cover" />
          </Link>

          <nav className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  Hola, {session.user?.name || session.user?.email}
                </span>
                <Link
                  href="/profile"
                  className="text-sm hover:text-gray-300 transition-colors"
                >
                  Mi Perfil
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="text-sm hover:text-gray-300 transition-colors"
                >
                  Cerrar Sesión
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button href="/register">Registrar tu tienda</Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
