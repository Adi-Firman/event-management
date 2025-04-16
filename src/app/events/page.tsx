"use client";

import { useEffect, useState } from "react";
import { searchEvents } from "@/services/event.service";
import Link from "next/link";
import debounce from "lodash.debounce";

export default function EventListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState<{ id: string; name: string; location: string; price: number; startDate: string }[]>([]);

  const fetchFiltered = async () => {
    const data = await searchEvents({ search, category, location });
    setEvents(data);
  };

  // debounce pencarian
  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
  }, 500);

  useEffect(() => {
    fetchFiltered();
  }, [search, category, location]);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Temukan Event</h1>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari event..."
          className="border p-2 rounded w-full sm:w-1/3"
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">Semua Kategori</option>
          <option value="musik">Musik</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">Semua Lokasi</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Surabaya">Surabaya</option>
        </select>
      </div>

      {/* Event List */}
      {events.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada event ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500">{event.location}</p>
              <p className="text-sm mt-2">Rp {event.price.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(event.startDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
