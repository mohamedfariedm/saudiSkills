import Credentials from "next-auth/providers/credentials";

import { loginUser } from "@/actions";
import { NextAuthOptions } from "next-auth";
import { User } from "@/types";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      //@ts-ignore it expects id not _id
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await loginUser("Credentials", {
          email,
          password,
        });
        console.log("auth-authorize", result);
        if (result.success && result.user) {
          return result.user;
        } else {
          console.log("auth-failed");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //console.log("jwt runs", { token, user, account });
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
