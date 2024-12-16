import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kongesque.com"),
  title: {
    default: "Kongesque",
    template: "%s | Kongesque",
  },
  description: "Developer, cardist and maker of things.",
  openGraph: {
    title: "Kongesque",
    description: "Developer, cardist and maker of things.",
    url: "https://www.kongesque.com",
    siteName: "Kongesque",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Kongesque",
    card: "summary_large_image",
    creator: "@kongesque",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased min-h-screen font-mono`} >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
