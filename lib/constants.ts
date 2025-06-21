export const RESERVED_DOMAINS = [
  "admin",
  "api",
  "auth",
  "blog",
  "dashboard",
  "help",
  "login",
  "register",
  "settings",
  "support",
  "www",
];

// Extraer el subdominio actual de la aplicación
export const getCurrentSubdomain = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");

    // Si hay más de 2 partes, el primero es el subdominio
    if (parts.length > 1) {
      return `${parts[0]}.`;
    }

    // Si no hay subdominio, devolver el dominio principal
    return hostname;
  }

  // En el servidor, usar la variable de entorno o localhost
  return "";
};


export const host = getCurrentSubdomain();

export const API_URL = `http://${host}${process.env.NEXT_PUBLIC_API_URL}`;
