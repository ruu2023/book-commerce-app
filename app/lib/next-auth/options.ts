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
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "空欄で構いません",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "空欄で構いません",
        },
      },
      async authorize() {
        // Prisma を使用してデータベースからユーザーを取得
        const user = await prisma.user.findUnique({
          where: {
            email: "guest@example.com",
          },
        });
        if (user) {
          // パスワードが一致する場合に認証成功
          console.log("認証成功!!!");
          return user;
        }
        // 認証失敗時は null を返す
        console.log("認証失敗");
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    // secret: process.env.NEXTAUTH_JWT_SECRET,
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
    // session: ({ session, user }) => {
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: user.id,
    //     },
    //   };
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
