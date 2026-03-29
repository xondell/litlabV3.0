import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LitLab — Interactive Literature Laboratory",
  description:
    "An interactive, multi-lingual laboratory hub for literature. Connect physical library books via QR codes to student-created multimedia content — podcasts, games, infographics, and more.",
  keywords: ["literature", "library", "education", "podcast", "QR code", "multilingual", "books"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GlobalAudioPlayer />
      </body>
    </html>
  );
}
