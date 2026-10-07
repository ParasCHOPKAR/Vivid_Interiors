import type { Metadata } from "next";
import { Inter, Playfair_Display, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import FloatingActions from "./FloatingActions";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const scriptFont = Nothing_You_Could_Do({ weight: "400", subsets: ["latin"], variable: "--font-script" });

export const metadata: Metadata = {
  title: "Vivid Interiors | Architecture & Design",
  description: "Interiors designed as one complete whole.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${scriptFont.variable}`}>
        <Header />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
