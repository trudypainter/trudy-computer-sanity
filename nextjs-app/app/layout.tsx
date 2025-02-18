import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import { BoidsProvider } from "./components/BoidsContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trudy Painter",
  description: "Design-oriented AI software engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white">
        <BoidsProvider>
          <main>{children}</main>
        </BoidsProvider>
        <Footer />
      </body>
    </html>
  );
}
