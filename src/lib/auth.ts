import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma"; // Sesuaikan dengan path prisma
import { NextAuthOptions } from "next-auth";

// Define the User role
interface AdapterUser {
  role: "organizer" | "customer"; // Role yang digunakan
}

// Custom Prisma Adapter untuk menambahkan role
const CustomPrismaAdapter = (prisma: any) => {
  const adapter = PrismaAdapter(prisma);

  // Extend getUser untuk menambahkan role
  const customAdapter = {
    ...adapter,
    getUser: async (id: string) => {
      const user = await adapter.getUser(id);
      if (user) {
        // Menambahkan role (role bisa diambil dari DB atau di-set default)
        return { ...user, role: "customer" }; // Atau fetch role dari DB jika perlu
      }
      return null;
    },
  };

  return customAdapter;
};

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma), // Gunakan Custom Prisma Adapter
  providers: [
    // Contoh: Provider autentikasi, misalnya CredentialsProvider
    // Sesuaikan dengan kebutuhan provider yang kamu pakai
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   authorize: async (credentials) => {
    //     // Logika authorize di sini
    //   },
    // }),
  ],
  session: {
    strategy: "jwt", // Menyimpan session menggunakan JWT
  },
  callbacks: {
    // Menambahkan user.id ke dalam token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Menambahkan id user ke token
        token.role = user.role; // Menambahkan role user ke token
      }
      return token;
    },
    // Menambahkan user.id dan role ke dalam session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "organizer" | "customer"; // Menambahkan role ke session
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
