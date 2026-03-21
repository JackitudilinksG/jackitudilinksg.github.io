import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./provider";
import { ThemeProvider } from "./contexts/ThemeContext";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deric Jojo - Portfolio",
  description: "A portfolio website built with Next.js, showcasing projects and skills with a contact form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}