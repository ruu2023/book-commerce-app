import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma";
import { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Guest Account",
      credentials: {
        // username: {
        //   label: "Username",
        //   type: "text",
        //   placeholder: "空欄で構いません",
        // },
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "空欄で構いません",
        // },
      },
      async authorize() {
        const user = await prisma.user.findUnique({
          where: {
            email: "guest@example.com",
          },
        });
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/login/guest",
  // },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });

      //pass in user id to token
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });

      //pass in user id to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
