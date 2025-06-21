import Link from "next/link";

export default function HomeLanding() {
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-950 to-purple-900">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-white space-y-8">
              <h1 className="text-5xl font-bold leading-tight">
                ¿Tienes un negocio en Chile y quieres vender?
              </h1>
              <p className="text-xl text-gray-300">
                Una plataforma Chilena, pensada para negocios Chilenos y para
                público Chileno.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#planes"
                  className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Ver planes
                </Link>
                <Link
                  href="/login/business"
                  className="inline-block bg-transparent text-white border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Registra tu Negocio
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-image.jpg"
                alt="Rate Place Hero"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div id="planes" className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Elige el plan perfecto para tu negocio
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comienza a vender en línea con la plataforma más fácil de usar
                en Chile
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Plan Básico */}
              <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 text-white border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-block bg-white/10 rounded-full px-4 py-1 text-sm font-medium mb-4">
                    Para empezar
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan Básico</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">$0</span>
                    <span className="text-gray-400">/mes</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Perfil de negocio básico
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">Hasta 10 productos</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">Estadísticas básicas</span>
                  </li>
                </ul>
                <Link
                  href="/register/basic"
                  className="block w-full text-center bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl transition-all duration-300 font-medium"
                >
                  Comenzar Gratis
                </Link>
              </div>

              {/* Plan Pro */}
              <div className="bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 text-white border-2 border-white/30 transform scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </div>
                </div>
                <div className="text-center mb-8">
                  <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm font-medium mb-4">
                    Para crecer
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan Pro</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">$19.990</span>
                    <span className="text-gray-400">/mes</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Todo lo del plan Básico
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">Productos ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Estadísticas avanzadas
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">Soporte prioritario</span>
                  </li>
                </ul>
                <Link
                  href="/register/pro"
                  className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl transition-all duration-300 font-medium"
                >
                  Comenzar Ahora
                </Link>
              </div>

              {/* Plan Empresarial */}
              <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 text-white border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-block bg-white/10 rounded-full px-4 py-1 text-sm font-medium mb-4">
                    Para empresas
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan Empresarial</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">$49.990</span>
                    <span className="text-gray-400">/mes</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">Todo lo del plan Pro</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">Múltiples sucursales</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">API personalizada</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Gerente de cuenta dedicado
                    </span>
                  </li>
                </ul>
                <Link
                  href="/register/enterprise"
                  className="block w-full text-center bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl transition-all duration-300 font-medium"
                >
                  Contactar Ventas
                </Link>
              </div>
            </div>
          </div>

          {/* Chilean Market Focus Section */}
          <div className="mt-24 bg-white/5 backdrop-blur-sm rounded-3xl p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">
                  El sistema más fácil de administrar en Chile
                </h2>
                <p className="text-xl text-gray-300">
                  Diseñado específicamente para el mercado chileno, con
                  características que hacen la diferencia:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-green-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Integración con medios de pago chilenos (Webpay,
                      Transferencia, etc.)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-green-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Soporte en horario chileno y en español
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-green-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Facturación electrónica integrada con SII
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-green-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-300">
                      Interfaz intuitiva y familiar para el usuario chileno
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/chile-market.jpg"
                  alt="Mercado Chileno"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Product Management Features Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Gestiona tus productos de manera eficiente
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Todo lo que necesitas para mostrar y vender tus productos de la
                mejor manera
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Variantes */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Variantes de Productos
                </h3>
                <p className="text-gray-300">
                  Crea variantes de talla, color, material y más. Gestiona
                  precios y stock para cada variante.
                </p>
              </div>

              {/* Stock */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="bg-green-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Control de Stock</h3>
                <p className="text-gray-300">
                  Monitorea tu inventario en tiempo real. Recibe alertas de
                  stock bajo y gestiona múltiples bodegas.
                </p>
              </div>

              {/* Fotos */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Galería de Fotos</h3>
                <p className="text-gray-300">
                  Sube múltiples fotos por producto. Organiza, edita y optimiza
                  tus imágenes automáticamente.
                </p>
              </div>

              {/* Descripción */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="bg-yellow-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Descripciones Detalladas
                </h3>
                <p className="text-gray-300">
                  Crea descripciones ricas con formato, especificaciones
                  técnicas y características destacadas.
                </p>
              </div>
            </div>

            {/* Preview Image */}
            <div className="mt-12 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/product-management.jpg"
                alt="Gestión de Productos"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Interfaz Intuitiva</h3>
                <p className="text-lg text-gray-200">
                  Gestiona todos tus productos desde un panel de control fácil
                  de usar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
