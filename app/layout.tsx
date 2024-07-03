import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/app/Components/Footer";
import { Toaster } from "@/components/ui/sonner";
// import dynamic from "next/dynamic";
import Header from "./Components/Header";

//TO solve hydration error --Error: Hydration failed because the initial UI does not match what was rendered on the server.
// const DynamicHeaderComponent = dynamic(
//   () => import("@/app/Components/Header"),
//   {
//     ssr: false,
//   }
// );

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
        {/* <DynamicHeaderComponent /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
