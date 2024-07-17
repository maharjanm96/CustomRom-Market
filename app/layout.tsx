// app/layout.tsx
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper";

const pop = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

export const metadata = {
  title: "CustomRom Market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={pop.className}>
          <Toaster />
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </SessionWrapper>
  );
}
