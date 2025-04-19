'use client'

import LogoutButton from '@/components/LogoutButton'

export default function CustomerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Customer</h1>
      <p>Selamat datang di halaman customer.</p>
      <LogoutButton />
    </div>
  )
}
