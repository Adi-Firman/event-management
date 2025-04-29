'use client'

import { useEffect, useState } from 'react'

export default function OrganizerEventListPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/organizer/events')
        const data = await res.json()

        if (data.events) {
          setEvents(data.events) // Menyimpan data events yang diterima dari API
        }
      } catch (error) {
        console.error('Gagal mengambil event', error)
      } finally {
        setLoading(false) // Menandakan selesai mengambil data
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!events.length) return <p>Belum ada event.</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Event Organizer</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              Lokasi: {event.location} | Kategori: {event.category}
            </p>
            <p className="text-sm text-gray-500">
              Tanggal: {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Harga: {event.price}</p>
            <p className="text-sm text-gray-500">Tersedia Kursi: {event.availableSeat}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
