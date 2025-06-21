// types/next-auth.d.ts
import { Subscriber, Subscription, User as PrismaUser } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
  }

  interface JWT {
    role?: "user" | "admin";
    user?: {
      id: string;
      email: string;
      name: string;
      role: "user" | "admin";
    };
  }

  interface Session {
    user?: {
      id: string;
      email: string;
      name: string;
      role: "user" | "admin";
    };
    role?: "user" | "admin";
  }
}
