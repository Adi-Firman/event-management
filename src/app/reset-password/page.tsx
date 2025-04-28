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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Reset Password</h1>
  
        <input
          type="password"
          placeholder="Password Baru"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
        <button
          onClick={handleReset}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
  
  
}
