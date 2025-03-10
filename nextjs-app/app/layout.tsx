import "./globals.css";
import type { Metadata } from "next";
import { customSans, customMono } from "./fonts";

export const metadata: Metadata = {
  title: "Trudy Painter",
  description: "Trudy Painter's personal website",
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
