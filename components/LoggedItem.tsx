"use client";

import Link from "next/link";
import Button from "./commons/Button";
import LogOut from "./LogOut";
import { User } from "lucide-react";

type Props = {
  session: any;
};

export default function LoggedItem({ session }: Props) {
  if (session)
    return (
      <div className="flex items-center">
        <Link
          href={session.user.role === "company" ? "/company" : "/me"}
          className="text-sm text-gray-700 mr-4 flex items-center font-bold gap-1"
        >
          <User size={22} />
          {session.user.name}
        </Link>
        <LogOut />
      </div>
    );
  return (
    <Button color="primary" href="/login">
      Login
    </Button>
  );
}
