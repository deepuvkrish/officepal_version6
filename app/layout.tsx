import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/ui/layout/Navbar";
import { SessionProvider } from "next-auth/react"; // ✅ Import this for session data
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Officepal.ai",
  description:
    "Generate Office Related works simple, easier and more effective!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <div className="relative z-10">
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#333",
                  color: "#fff",
                  fontWeight: "500",
                  borderRadius: "8px",
                  padding: "12px",
                },
              }}
            />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
