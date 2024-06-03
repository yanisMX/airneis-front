import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { AuthProvider } from '@/app/context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airneis',
  description: 'Fournisseur de meubles de qualité',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
        <Footer />

        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      </body>
    </html>
  );
}
