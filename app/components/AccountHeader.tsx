import { auth } from "@/auth";
import LoggedItem from "@/components/LoggedItem";
import MainMenu from "@/components/MainMenu";
import Link from "next/link";

export default async function AccountHeader() {
  const session = await auth();

  return (
    <header
      className="bg-white relative z-10"
      style={{
        boxShadow: "0 0 5px 5px rgba(0,0,0,.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-16">
          <div className="flex items-center">
            <Link href="/">
              <img src="/logo.png" className="h-10" />
            </Link>
          </div>
          <MainMenu />
          <div className="ml-auto">
            <LoggedItem session={session} />
          </div>
        </div>
      </div>
    </header>
  );
}
