import { getEventById } from "@/services/event.service";

type Props = {
  params: { id: string };
};

export default async function EventDetailPage({ params }: Props) {
  const event = await getEventById(params.id);

  if (!event) {
    return <p className="text-center text-gray-500">Event tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-2">{event.location}</p>
      <p className="text-sm text-gray-400">
        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
      </p>

      <div className="my-4">
        <p className="text-xl font-semibold">Rp {event.price.toLocaleString()}</p>
        <p className="text-sm text-gray-500">Sisa kursi: {event.availableSeat}</p>
      </div>

      <p className="mt-4">{event.description}</p>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Daftar / Beli Tiket
        </button>
      </div>
    </div>
  );
}
