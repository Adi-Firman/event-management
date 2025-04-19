'use client'; // Menandakan bahwa file ini menggunakan hooks dan fitur client-side React

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const token = router.query.token as string; // Ambil token dari URL
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cek jika password kosong
    if (!password) {
      setMessage('Password tidak boleh kosong!');
      return;
    }
    
    // Kirim permintaan POST untuk reset password
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Password berhasil direset!');
    } else {
      setMessage(data.message || 'Terjadi kesalahan.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Masukkan password baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
