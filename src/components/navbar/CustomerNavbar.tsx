'use client';

import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import SearchBar from '@/components/SearchBar';

export default function CustomerNavbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Event Management
        </Link>

        {/* Search Bar */}
        <div className="ml-4">
          <SearchBar />
        </div>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link href="/transactions" className="text-gray-700 hover:text-blue-600">
          My Transactions
        </Link>
        <Link href="/profile" className="text-gray-700 hover:text-blue-600">
          My Profile
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}
