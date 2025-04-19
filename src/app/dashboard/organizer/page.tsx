'use client'

import LogoutButton from '@/components/LogoutButton'

export default function OrganizerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Organizer</h1>
      <p>Selamat datang di halaman event organizer.</p>
      <LogoutButton />
    </div>
  )
}
