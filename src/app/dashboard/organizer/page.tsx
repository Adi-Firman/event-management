'use client'

import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Event } from "@prisma/client";

const DashboardOrganizer = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchEvents = async () => {
        const response = await fetch(`/api/events/organizer/${session.user.id}`);
        const data = await response.json();
        setEvents(data);
      };
      fetchEvents();
    }
  }, [session]);

  // Format harga ke Rupiah tanpa desimal
  const formatCurrency = (amount: number) =>
    "Rp" + amount.toLocaleString("id-ID");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard Organizer</h1>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-600">Events List</h2>
        <Link
          href="/dashboard/organizer/events/new"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
        >
          Create Event
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="text-gray-500">No events found. Start by creating an event.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">{event.name}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span className="block">📍 {event.location}</span>
                <span className="block">
                  💰 {event.price === 0 ? 'Gratis' : formatCurrency(event.price)}
                </span>
                <span className="block">
                  🗓️ {new Date(event.startDate).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/dashboard/organizer/events/${event.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit Event
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardOrganizer;
// Removed duplicate import of useState

// Removed duplicate declaration of CurrencyInput

import { useState } from "react";

export const CurrencyInput = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const [displayValue, setDisplayValue] = useState(formatRupiah(value));

  function formatRupiah(value: number) {
    return "Rp" + value.toLocaleString("id-ID");
  }

  function parseRupiah(str: string) {
    return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseRupiah(e.target.value);
    setDisplayValue(formatRupiah(numericValue));
    onChange(numericValue);
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
      placeholder="Rp0"
    />
  );
};

