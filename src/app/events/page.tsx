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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 py-10 px-4">
      <div className="max-w-5xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-6">Temukan Event</h1>
  
        {/* Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari event..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3 placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
  
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Semua Kategori</option>
            <option value="musik">Musik</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
          </select>
  
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Semua Lokasi</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Bandung">Bandung</option>
            <option value="Surabaya">Surabaya</option>
          </select>
        </div>
  
        {/* Event List */}
        {events.length === 0 ? (
          <p className="text-center text-gray-300">Tidak ada event ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white text-gray-900 border p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
              >
                <h2 className="text-lg font-semibold mb-1">{event.name}</h2>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-base font-medium mt-2">Rp {event.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}
