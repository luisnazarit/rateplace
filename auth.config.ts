import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { prisma } from "./libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Session, User, Account, Profile } from "next-auth";

// Initialize PrismaAdapter
const adapter = PrismaAdapter(prisma);

const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role: "user",
      };
    },
  }),
  Credentials({
    id: "admin",
    name: "Global Admin Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials): Promise<User | null> => {
      if (!credentials?.username || !credentials?.password) {
        throw new Error("Missing credentials");
      }

      const email = credentials.username;
      const password = credentials.password;

      if (
        email !== process.env.ADMIN_USER ||
        !password ||
        password !== process.env.ADMIN_PASS
      ) {
        throw new Error("Invalid credentials");
      }

      return {
        id: "admin",
        email: email,
        name: "Global Admin",
        role: "admin",
      } as User;
    },
  }),
];

export const authConfig = {
  adapter,
  providers,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: "user",
              },
            });
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }: { user: User }) {
      console.log("New user created:", user.email);
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
};
