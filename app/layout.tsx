import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import AppKitProvider from "@/providers/walletconnect/web3_modal_provider";
import StarAnimation from "@/components/home/background";

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
        <AppKitProvider>
          <div className="relative overflow-hidden min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />

            <StarAnimation />
          </div>
        </AppKitProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
