import type { Metadata } from "next";
import "./globals.css";
import AppKitProvider from "@/providers/walletconnect/web3_modal_provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
          <Header />
          {children}
          <Footer />
        </AppKitProvider>
      </body>
    </html>
  );
}
