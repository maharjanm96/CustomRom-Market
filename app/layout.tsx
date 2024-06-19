import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./Components/Header";
import Search from "./Components/Search";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <header>
          <Header />
        </header>
        <Search />
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
