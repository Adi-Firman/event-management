'use client';  // Menandakan ini adalah Client Component

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold">Home</Link>
        <div className="flex items-center">
          {status === "loading" ? (
            <p className="text-white">Loading...</p>
          ) : session ? (
            <>
              <p className="text-white mr-4">Hello, {session.user?.name}</p>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
