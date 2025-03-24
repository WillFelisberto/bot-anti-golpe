import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "📍 Comprovante de Localização",
  description:
    "Seu comprovante de localização foi gerado com sucesso. Utilize este documento como prova de presença e verificação de segurança.",
  keywords:
    "comprovante, localização, segurança, anti-golpe, verificação, prova de presença, Telegram",
  openGraph: {
    title: "📍 Comprovante de Localização",
    description:
      "Este é um comprovante oficial de localização. Utilize como prova de presença e verificação de segurança.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    site: "@seu_usuario",
    title: "📍 Comprovante de Localização",
    description:
      "Seu comprovante de localização foi gerado com sucesso. Utilize como prova de presença e verificação.",
  },
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
        {children}
      </body>
    </html>
  );
}
