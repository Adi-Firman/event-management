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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
