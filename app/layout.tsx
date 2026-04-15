import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'MPL — Memon Premier League',
  description: 'Multi-sport management and fan engagement platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 56px)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
