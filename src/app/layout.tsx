import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { UIProvider } from "@/components/UIProvider";
import { ProductViewerProvider } from "@/components/ProductViewerProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MenuMobile from "@/components/MenuMobile";
import ProductPurchased from "@/components/ProductPurchased";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ByteStore",
  description:
    "Dê uma turbinada no seu setup! ByteStore — encontre as melhores opções em placas de vídeo, processadores, monitores, periféricos e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${interTight.className} antialiased`}>
        <UIProvider>
          <CartProvider>
            <ProductViewerProvider>
              <Header />
              {children}
              <Footer />
              <CartDrawer />
              <MenuMobile />
              <ProductPurchased />
            </ProductViewerProvider>
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}