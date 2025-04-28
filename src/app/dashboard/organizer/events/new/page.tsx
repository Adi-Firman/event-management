'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateEventPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [priceFormatted, setPriceFormatted] = useState('')
  const [priceRaw, setPriceRaw] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [availableSeat, setAvailableSeat] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    const number = Number(raw)
    setPriceRaw(number)
    setPriceFormatted(number.toLocaleString('id-ID'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validasi tambahan
    if (priceRaw <= 0 || availableSeat <= 0) {
      setError('Harga dan jumlah kursi harus lebih dari 0.')
      setLoading(false)
      return
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('Tanggal mulai harus lebih awal dari tanggal selesai.')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', location)
    formData.append('category', category)
    formData.append('price', priceRaw.toString())
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    formData.append('availableSeat', availableSeat.toString())
    if (image) {
      formData.append('image', image)
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        setError(errorData.error || 'Gagal menambahkan event')
        return
      }

      router.push('/dashboard/organizer/events')
    } catch (err) {
      console.error('Terjadi kesalahan:', err)
      setError('Terjadi kesalahan saat mengirim data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Event Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium mb-1">Judul Event</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full border rounded p-2"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Deskripsi Event</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border rounded p-2"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Lokasi</label>
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full border rounded p-2"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Kategori</label>
    <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full border rounded p-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
    <input
      type="text"
      value={priceFormatted}
      onChange={handlePriceChange}
      className="w-full border rounded p-2"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
    <input
      type="datetime-local"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full border rounded p-2"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Tanggal Selesai</label>
    <input
      type="datetime-local"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="w-full border rounded p-2"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Kursi Tersedia</label>
    <input
      type="number"
      value={availableSeat}
      onChange={(e) => setAvailableSeat(Math.max(0, Number(e.target.value)))}
      className="w-full border rounded p-2"
      required
      min={0}
      step="1"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Gambar Event</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files?.[0] || null)}
      className="w-full"
    />
    {image && (
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        className="w-full h-auto mt-2 rounded"
      />
    )}
  </div>

  {error && <p className="text-red-500 text-sm">{error}</p>}

  <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
  >
    {loading ? 'Menyimpan...' : 'Tambah Event'}
  </button>
</form>

    </div>
  )
}
