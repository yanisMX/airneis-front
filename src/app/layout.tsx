import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AuthProvider } from "@/app/context/AuthContext";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airneis",
  description: "Fournisseur de meubles de qualité",
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
          <Footer/> 
    
    </body>
    </html>
  );
}
