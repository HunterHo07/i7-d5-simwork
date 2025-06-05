import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SimWork - The Future of Work Simulation",
  description: "Enter a 2.5D office world inspired by Ragnarok Online. Complete real work challenges, discover talented freelancers, and prove your skills in an immersive gaming environment.",
  keywords: ["simulation", "work", "gaming", "freelancer", "skills", "2.5D", "office", "ragnarok online"],
  authors: [{ name: "SimWork Team" }],
  creator: "SimWork",
  publisher: "SimWork",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simwork.app",
    title: "SimWork - The Future of Work Simulation",
    description: "Enter a 2.5D office world inspired by Ragnarok Online. Complete real work challenges, discover talented freelancers, and prove your skills in an immersive gaming environment.",
    siteName: "SimWork",
  },
  twitter: {
    card: "summary_large_image",
    title: "SimWork - The Future of Work Simulation",
    description: "Enter a 2.5D office world inspired by Ragnarok Online. Complete real work challenges, discover talented freelancers, and prove your skills in an immersive gaming environment.",
  },
  icons: {
    icon: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
    shortcut: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
    apple: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased font-sans bg-game-bg text-game-text`}
      >
        {children}
      </body>
    </html>
  );
}
