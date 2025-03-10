import "./globals.css";
import type { Metadata } from "next";
import { customSans, customMono } from "./fonts";

export const metadata: Metadata = {
  title: "Trudy Painter",
  description: "Software engineer, making AI experiments",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Trudy Painter",
    description: "Software engineer, making AI experiments",
    images: ["/favicon.ico"], // Empty array to prevent any OG images
  },
  twitter: {
    card: "summary", // Use 'summary' instead of 'summary_large_image'
    title: "Trudy Painter",
    description: "Software engineer, making AI experiments",
    images: ["/favicon.ico"], // Empty array to prevent any Twitter images
  },
  other: {
    "apple-mobile-web-app-title": "Trudy Painter",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-status-bar-style": "default",
    // These control iMessage link previews
    "apple-itunes-app": "none",
    "apple-mobile-web-app-capable": "yes",
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
