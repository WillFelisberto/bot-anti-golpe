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
  title: "📍 Comprovante de Pagamento",
  description:
    "Seu comprovante de Pagamento foi gerado com sucesso. Utilize este documento como prova de pagamento e verificação de segurança.",
  keywords:
    "comprovante, Pagamento, segurança, verificação, prova de pagamento, Telegram",
  openGraph: {
    title: "📍 Comprovante de Pagamento",
    description:
      "Este é um comprovante oficial de Pagamento. Utilize como prova de pagamento e verificação de segurança.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    site: "@seu_usuario",
    title: "📍 Comprovante de Pagamento",
    description:
      "Seu comprovante de Pagamento foi gerado com sucesso. Utilize como prova de presença e verificação.",
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
