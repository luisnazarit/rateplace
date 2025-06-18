// app/components/LinkSession.tsx
import { headers } from "next/headers";
import Button from "./commons/Button";

export default async function LinkSession({
  url,
  session,
  children,
}: {
  url: string;
  children: React.ReactNode;
  session: any;
}) {
  const headersList = await headers();

  const host = headersList.get("host"); // dominio
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const pathname = headersList.get("x-pathname") || ""; // Next.js internal
  const fullUrl = `${protocol}://${host}${pathname}`;

  // Generar URL con parámetros si no hay sesión
  const finalUrl = !session
    ? (() => {
        const urlObj = new URL(fullUrl);
        urlObj.searchParams.set("login", "true");
        urlObj.searchParams.set("redirect", url);
        return urlObj.toString();
      })()
    : url;

  return <Button color="primary" href={finalUrl}>{children}</Button>;
}
