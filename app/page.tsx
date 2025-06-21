import { headers } from "next/headers";
import HomeLanding from "./components/HomeLanding";
import HomeSubdomain from "./components/HomeSubdomain";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const hostname = host.split(":")[0];
  const MAIN_DOMAINS = [
    "rateplace.cl",
    "www.rateplace.cl",
    "localhost",
    "127.0.0.1",
  ];
  const isMainDomain = MAIN_DOMAINS.includes(hostname);

  if (!isMainDomain) {
    return <HomeSubdomain hostname={hostname} />;
  }

  return <HomeLanding />;
}
