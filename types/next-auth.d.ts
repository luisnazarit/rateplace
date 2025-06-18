// types/next-auth.d.ts
import { Subscriber, Subscription, User as PrismaUser } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "subscriber" | "user" | "admin";
  }

  interface JWT {
    role?: "subscriber" | "user" | "admin";
    user?: {
      id: string;
      email: string;
      name: string;
      role: "subscriber" | "user" | "admin";
    };
  }

  interface Session {
    user?: {
      id: string;
      email: string;
      name: string;
      role: "subscriber" | "user" | "admin";
    };
    role?: "subscriber" | "user" | "admin";
  }
}