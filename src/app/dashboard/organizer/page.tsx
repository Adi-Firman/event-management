"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Event = {
  id: string
  name: string
  description: string
  location: string
  category: string
  price: number
  startDate: string
  endDate: string
  availableSeat: number
}

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/organizer/events')
        const data = await res.json()

        // Log data yang diterima
        console.log('Data yang diterima dari API:', data)

        // Pastikan data.events adalah array sebelum di-set
        if (Array.isArray(data.events)) {
          setEvents(data.events)
        } else {
          console.error('Data events tidak valid:', data.events)
        }
      } catch (error) {
        console.error('Gagal memuat data event:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Organizer</h1>
      <button
        onClick={() => router.push('/dashboard/organizer/events/new')}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Tambah Event
      </button>

      {loading ? (
        <p>Memuat data event...</p>
      ) : events.length === 0 ? (
        <p>Belum ada event.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">{event.location} | {event.category}</p>
              <p className="mt-2">{event.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
              <p className="mt-1 text-sm text-gray-700">Harga: Rp{event.price.toLocaleString()}</p>
              <p className="text-sm">Sisa Kursi: {event.availableSeat}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
