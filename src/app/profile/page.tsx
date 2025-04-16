"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name ?? "");
  const [image, setImage] = useState(user?.image ?? "");

  const handleUpdate = async () => {
    await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name, image }),
    });
    alert("Profil diperbarui");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profil</h1>
      <label className="block mb-2">Nama</label>
      <input
        className="w-full border p-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mb-2">Foto (URL)</label>
      <input
        className="w-full border p-2 mb-4"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </div>
  );
}
