import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Disclaimer } from "@/components/Disclaimer";
import { GlossaryDrawer } from "@/components/GlossaryDrawer";
import { TopNav } from "@/components/TopNav";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "MAHJ — Learn American Mahjong",
  description:
    "An independent educational app for learning American Mahjong from scratch. Not affiliated with the National Mah Jongg League.",
  manifest: "/manifest.json",
  icons: {
    icon: { url: "/favicon.svg?v=9", type: "image/svg+xml" },
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MAHJ",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#1A4D2E" />
        <meta name="apple-itunes-app" content="app-id=6762031478" />
      </head>
      <body className="min-h-full flex flex-col">
        <TopNav />
        <main className="flex-1">{children}</main>
        <Disclaimer />
        <GlossaryDrawer />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
