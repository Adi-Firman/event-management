// src/lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma"; // Sesuaikan path
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Contoh provider

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Tambahkan provider lain di sini
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id as string;
      return session;
    },
  },
};
