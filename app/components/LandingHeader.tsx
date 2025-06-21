import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-950 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <img src="/logo.png" width={50} alt="Cover" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="#planes"
              className="hover:text-gray-300 transition-colors"
            >
              Planes
            </Link>
            <Link
              href="/login/business"
              className="hover:text-gray-300 transition-colors"
            >
              Acceder
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Registra tu Negocio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
