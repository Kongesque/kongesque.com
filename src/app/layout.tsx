import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kongesque.com"),
  title: {
    default: "kongesque",
    template: "%s | kongesque",
  },
  description: "Developer, cardist and maker of things.",
  openGraph: {
    title: "kongesque",
    description: "Developer, cardist and maker of things.",
    url: "https://www.kongesque.com",
    siteName: "kongesque",
    locale: "en_US",
    type: "website",
    images: ["https://www.kongesque.com/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "kongesque",
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
      <body className={`${jetbrainsMono.variable} antialiased min-h-screen font-mono`} >
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Navbar />
          <main>
            {children}
          </main>
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
