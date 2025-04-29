'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [form, setForm] = useState({
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await res.json()
        if (res.ok) {
          setForm({
            name: data.name,
            location: data.location,
            startDate: data.startDate.slice(0, 10),
            endDate: data.endDate.slice(0, 10),
            description: data.description,
          })
        } else {
          setError(data.message || 'Gagal memuat data event')
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat event')
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Gagal menyimpan perubahan')
        return
      }

      setSuccess('Event berhasil diperbarui')
      router.push('/dashboard/organizer/events')
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan perubahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Event"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Lokasi"
          className="w-full border p-2 rounded"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          className="w-full border p-2 rounded"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          className="w-full border p-2 rounded"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  )
}
