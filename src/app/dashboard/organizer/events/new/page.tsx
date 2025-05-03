'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateEventPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    price: '',
    startDate: '',
    endDate: '',
    availableSeat: '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('location', form.location)
      formData.append('category', form.category)
      formData.append('price', form.price)
      formData.append('startDate', form.startDate)
      formData.append('endDate', form.endDate)
      formData.append('availableSeat', form.availableSeat)
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("API error:", data); // Log error dari API
        alert(data.error || 'Gagal menambahkan event')
      } else {
        alert('Event berhasil ditambahkan!')
        router.push('/dashboard/organizer/events')
      }
    } catch (err: any) {
      console.error(err)
      alert('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Tambah Event Baru</h1>

      {/* Input fields for the event */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Judul Event</label>
        <input
          name="title"
          placeholder="Judul Event"
          onChange={handleChange}
          value={form.title}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea
          name="description"
          placeholder="Deskripsi Event"
          onChange={handleChange}
          value={form.description}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lokasi</label>
        <input
          name="location"
          placeholder="Lokasi"
          onChange={handleChange}
          value={form.location}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Kategori</label>
        <input
          name="category"
          placeholder="Kategori"
          onChange={handleChange}
          value={form.category}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Harga</label>
        <input
          name="price"
          type="number"
          placeholder="Harga"
          onChange={handleChange}
          value={form.price}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
        <input
          name="startDate"
          type="datetime-local"
          onChange={handleChange}
          value={form.startDate}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
        <input
          name="endDate"
          type="datetime-local"
          onChange={handleChange}
          value={form.endDate}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Kursi Tersedia</label>
        <input
          name="availableSeat"
          type="number"
          placeholder="Kursi Tersedia"
          onChange={handleChange}
          value={form.availableSeat}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gambar Event</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Mengirim...' : 'Tambah Event'}
      </button>
    </form>
  )
}
