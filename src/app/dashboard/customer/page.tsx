'use client';

import CustomerNavbar from '@/components/navbar/CustomerNavbar';

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <CustomerNavbar />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Customer</h1>
        <p className="text-gray-600">Selamat datang di halaman customer.</p>
      </div>
    </div>
  );
}
