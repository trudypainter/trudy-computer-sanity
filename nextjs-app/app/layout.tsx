import "./globals.css";
import type { Metadata } from "next";
import { customSans, customMono } from "./fonts";

export const metadata: Metadata = {
  title: "Trudy Painter",
  description: "Trudy Painter's personal website",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Trudy Painter",
    description: "Trudy Painter's personal website",
    images: [], // Empty array to prevent any OG images
  },
  twitter: {
    card: "summary", // Use 'summary' instead of 'summary_large_image'
    title: "Trudy Painter",
    description: "Trudy Painter's personal website",
    images: [], // Empty array to prevent any Twitter images
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${customSans.variable} ${customMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
