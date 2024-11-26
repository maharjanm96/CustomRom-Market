import "./globals.css";
// import { Parkinsans } from "next/font/googleapis.com";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { AuthWrapper } from "@/lib/AuthWrapper";
import "@smastrom/react-rating/style.css";

// const pop = Parkinsans({ subsets: ["latin"], weight: ["300", "500"] });

export const metadata = {
  title: "CustomRom Market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Toaster />
          <AuthWrapper>
            <main>{children}</main>
          </AuthWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
