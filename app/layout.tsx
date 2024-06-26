import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster } from "@/components/ui/sonner";

const pop = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

export const metadata: Metadata = {
  title: "CustomRom Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pop.className}>
        <Toaster />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
