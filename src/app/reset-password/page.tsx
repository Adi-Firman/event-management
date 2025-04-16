"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password berhasil diganti");
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <input
        type="password"
        placeholder="Password baru"
        className="w-full border p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset} className="bg-green-600 text-white px-4 py-2 rounded">
        Reset
      </button>
    </div>
  );
}
