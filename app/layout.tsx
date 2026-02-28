import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

// 🔥 ១. Import Font ខ្មែរកាលីប "Kantumruy Pro" ពី Google Fonts
import { Kantumruy_Pro } from "next/font/google";

// 🔥 ២. កំណត់ទម្ងន់ (Weight) សម្រាប់អក្សរធម្មតា និងអក្សរដិត
const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap", // ជួយឱ្យវិបសាយ Load លឿន
});

export const metadata: Metadata = {
  title: "Grand Palace | Luxury Hotel Booking",
  description: "បទពិសោធន៍ស្នាក់នៅដ៏ប្រណីតនៅក្នុងក្រុងសៀមរាប។",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      {/* 🔥 ៣. បំពាក់ Font ${kantumruy.className} ទៅលើ Body តែម្តង ទើបវាប្តូរគ្រប់ទំព័រ! */}
      <body className={`${kantumruy.className} flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900`}>
        
        <NextTopLoader 
          color="#f59e0b"
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={3} 
          showSpinner={false} 
        />

        <Navbar />

        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>

        <Footer />
        
        <Toaster position="bottom-right" reverseOrder={false} />

      </body>
    </html>
  );
}