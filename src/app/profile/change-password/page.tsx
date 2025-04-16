"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("Password baru tidak cocok");
      return;
    }

    const res = await fetch("/api/profile/change-password", {
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (res.ok) {
      alert("Password berhasil diganti");
      router.push("/profile");
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Ganti Password</h1>
      <input
        type="password"
        placeholder="Password Lama"
        className="w-full border p-2 mb-4"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password Baru"
        className="w-full border p-2 mb-4"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Konfirmasi Password Baru"
        className="w-full border p-2 mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Ganti Password
      </button>
    </div>
  );
}
