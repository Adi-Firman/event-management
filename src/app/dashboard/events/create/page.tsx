"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createEvent } from "@/services/event.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
// Removed duplicate import of useSession
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
// Removed duplicate import of redirect
// Removed unused import for CreateEventForm as the file './_form' does not exist


// Extend the Session type to include the role property
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add the role property
    };
  }
}
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3),
  location: z.string().min(3),
  category: z.string(),
  price: z.number().nonnegative(),
  startDate: z.string(),
  endDate: z.string(),
  availableSeat: z.number().int().positive(),
  description: z.string().min(10),
});

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      await createEvent({
        ...data,
        organizerId: "dummy-organizer-id", // Ganti dari session nanti
      });
      router.push("/events");
    } catch (error) {
      console.error("Failed to create event", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Buat Event Baru</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Nama Event" className="input" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <input {...register("location")} placeholder="Lokasi" className="input" />
        <select {...register("category")} className="input">
          <option value="">Pilih Kategori</option>
          <option value="musik">Musik</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
        </select>

        <input type="number" {...register("price", { valueAsNumber: true })} placeholder="Harga (IDR)" className="input" />
        <input type="number" {...register("availableSeat", { valueAsNumber: true })} placeholder="Jumlah Kursi" className="input" />

        <label className="block">Tanggal Mulai</label>
        <input type="date" {...register("startDate")} className="input" />
        <label className="block">Tanggal Selesai</label>
        <input type="date" {...register("endDate")} className="input" />

        <textarea {...register("description")} placeholder="Deskripsi Event" className="input h-24" />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Buat Event"}
        </button>
      </form>
    </div>
  );
}

// Removed duplicate implementation of CreateEventPage
  


  