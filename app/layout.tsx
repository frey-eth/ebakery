import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "eBakery",
  description: "Launch your favorite meme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <Header />
          {children}
          <Footer />
        </ThirdwebProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
