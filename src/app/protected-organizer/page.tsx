'use client'; // Menandakan bahwa ini adalah komponen client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedOrganizerPage() {
  const [isOrganizer, setIsOrganizer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect ke login jika belum login
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        if (decodedToken.role === 'organizer') {
          setIsOrganizer(true); // Jika role adalah 'organizer', akses halaman
        } else {
          router.push('/'); // Jika bukan organizer, redirect ke homepage
        }
      } catch (error) {
        router.push('/login'); // Jika token invalid, redirect ke login
      }
    }
  }, []);

  if (!isOrganizer) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Halaman Organizer</h1>
      {/* Konten khusus organizer */}
    </div>
  );
}
