import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Search from "./Components/Search";
import Footer from "./Components/Footer";

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
        <Header />
        <Search />
        {children}
        <Footer />
      </body>
    </html>
  );
}
