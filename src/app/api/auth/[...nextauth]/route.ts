// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs"; // Untuk memverifikasi password hash

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Pastikan email dan password ada dalam request
        if (!credentials?.email || !credentials?.password) return null;

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Verifikasi password yang diinput dengan yang ada di database
        const isValid = await compare(credentials.password, user.password);

        if (!isValid) return null;

        // Jika password valid, return user
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Menggunakan JWT untuk session
  },
  callbacks: {
    // Callback untuk JWT, menyimpan informasi user di token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Menambahkan role ke token (jika ada)
      }
      return token;
    },
    // Callback untuk session, menambahkan informasi token ke session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string; // Menambahkan role ke session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Halaman login custom jika belum login
  },
});

export { handler as GET, handler as POST };
