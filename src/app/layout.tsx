import Navbar from '@/components/Navbar'; // Impor Navbar
import { SessionProvider } from 'next-auth/react'; // Impor SessionProvider

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar /> {/* Navbar ditampilkan di sini */}
      <div>{children}</div> {/* Menampilkan konten halaman */}
    </SessionProvider>
  );
}
