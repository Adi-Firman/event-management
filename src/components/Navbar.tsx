'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      <Link href="/" className="text-xl font-bold text-gray-800">Event Platform</Link>
      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <span className="text-gray-500">Loading...</span>
        ) : session?.user ? (
          <>
            <span className="text-gray-700">Hi, {session.user.name}</span>
            <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
