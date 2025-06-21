export default function HomeSubdomain({ hostname }: { hostname: string }) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-950 to-purple-900 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido al portal de empresa
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Estás accediendo desde el subdominio{" "}
          <span className="font-mono bg-white/10 px-2 py-1 rounded">
            {hostname}
          </span>
        </p>
        <p className="text-gray-400">
          Aquí pronto verás el dashboard o la tienda de la empresa.
        </p>
      </div>
    </>
  );
}
