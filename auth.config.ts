import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { prisma } from "./libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Session, Account, Profile } from "next-auth";
import { findUserByEmail } from "./actions_db/actions";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

// Initialize PrismaAdapter
const adapter = PrismaAdapter(prisma);


const matchPassword = async (userPass: string, crePass: string) => {
  return await bcrypt.compare(crePass, userPass);
};

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
    // The name to display on the sign in form (e.g. "Sign in with...")
    id: "user",
    name: "user Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials: { email: string; password: string }) => {
      const { email, password } = credentials;
      const user = await findUserByEmail(email) as User;

      if (user && user.password) {
        const match = await matchPassword(user.password, password);
        if (!match) {
          throw new Error("Error de password");
        }
        return { ...user,  };
      }
      if (!user) {
        throw new Error("No user found");
      }
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
  // session: {
  //   strategy: "database",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
  session: {
    strategy: "jwt",
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
    async jwt({ token, user }) {
      // Agregar los datos correspondientes al token basándonos en el rol
      if (user) {
        token.role = user.role;
        token.user = user;
      }
      return token;
    },
    async session({ session, user }: { session: Session; user: User }) {
      return session;
    },
  },
  events: {
    async createUser({ user }: { user: User }) {
      console.log("New user created:", user.email);
    },
  },
  // debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
};
