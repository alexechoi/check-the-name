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
  title: "Check The Name - Brand Name Analysis Tool",
  description: "Analyze the cultural significance, connotations, and potential implications of your brand name before committing to it. Get comprehensive insights and domain availability.",
  keywords: ["brand name analysis", "name checker", "brand naming tool", "business name analysis", "brand name validation"],
  authors: [{ name: "Check The Name" }],
  openGraph: {
    title: "Check The Name - Brand Name Analysis Tool",
    description: "Analyze your brand name's cultural significance and potential implications",
    url: "https://checkthename.com",
    siteName: "Check The Name",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Check The Name - Brand Name Analysis Tool"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check The Name - Brand Name Analysis Tool",
    description: "Analyze your brand name's cultural significance and potential implications",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
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
