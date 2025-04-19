'use client'; // Menandakan bahwa ini adalah komponen client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek token JWT dari localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect ke halaman login jika token tidak ada
      router.push('/login');
    } else {
      // Cek apakah token valid (contoh: bisa memverifikasi dengan server)
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Halaman Terproteksi</h1>
      {/* Konten halaman yang hanya bisa diakses setelah login */}
    </div>
  );
}
