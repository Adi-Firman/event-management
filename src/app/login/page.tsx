'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Kirim permintaan login ke backend
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan token ke localStorage
        localStorage.setItem('token', data.token);

        // Dekode token untuk memeriksa role
        const payload = JSON.parse(atob(data.token.split('.')[1])); // Dekode token (part kedua)
        const role = payload.role; // Ambil role dari payload

        // Arahkan ke halaman berdasarkan role
        if (role === 'ORGANIZER') {
          router.push('/dashboard/organizer'); // Halaman khusus untuk organizer
        } else {
          router.push('/dashboard/customer'); // Halaman khusus untuk customer
        }
      } else {
        // Jika login gagal, tampilkan pesan error
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      // Tangani error
      setError('Terjadi kesalahan.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Masuk Akun</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
            <input
              type="password"
              placeholder="Kata Sandi"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full transition duration-200"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
