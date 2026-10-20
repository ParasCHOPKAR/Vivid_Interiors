import type { Metadata } from "next";
import { Inter, Playfair_Display, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const scriptFont = Nothing_You_Could_Do({ weight: "400", subsets: ["latin"], variable: "--font-script" });

export const metadata: Metadata = {
  title: "Vivid Interiors | Architecture, Design & Turnkey Execution",
  description: "Bespoke luxury interior architecture and turnkey execution for villas, penthouses, and commercial spaces.",
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
        <CustomCursor />
        <NoiseOverlay />
        <Header />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
