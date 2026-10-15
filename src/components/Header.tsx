"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProductCommandMenu from "@/components/ProductCommandMenu";
import { useCart } from "@/components/CartProvider";
import { useUI } from "@/components/UIProvider";
import { NAV_LINKS } from "@/lib/site-config";

export default function Header() {
  const { totalItems, openCart, closeCart } = useCart();
  const { openMenu, closeMenu } = useUI();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleCart = () => {
    closeMenu();
    openCart();
  };

  return (
    <>
      <ProductCommandMenu open={searchOpen} onOpenChange={setSearchOpen} />

      {/* botão de carrinho fixo no canto inferior direito (apenas mobile) */}
      <button
        type="button"
        onClick={handleCart}
        aria-label="Abrir carrinho"
        className="glow-green fixed bottom-4 right-4 z-10 flex h-14 w-14 items-center justify-center bg-green2 text-2xl text-white1 transition-all duration-300 hover:brightness-110 lg:hidden"
      >
        <Icon name="cart" size={22} />
        <CartBadge total={totalItems} />
      </button>

      {/* o fundo vai de ponta a ponta; os itens ficam no mesmo
          container centralizado do conteúdo do body */}
      <header className="glow-green fixed left-0 right-0 top-0 z-[4] bg-black">
        <div className="mx-auto flex h-[60px] w-full max-w-page items-center justify-between px-gutter">
          <Link href="#home" className="flex items-center gap-1">
            <Icon name="bolt" size={20} className="text-green1" />
            <span className="text-xl font-extrabold tracking-tight text-green1">
              ByteStore
            </span>
          </Link>

          <ul className="hidden list-none items-center gap-6 lg:flex [text-shadow:0px_0px_15px_var(--color-green2)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white1 transition hover:border-b hover:border-green3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar produtos"
              className="cursor-pointer rounded-lg p-2 text-green1 transition hover:text-white1"
            >
              <Icon name="search" size={24} />
            </button>

            {/* carrinho no header (apenas desktop) */}
            <button
              type="button"
              onClick={handleCart}
              aria-label="Abrir carrinho"
              className="relative hidden cursor-pointer rounded-lg p-2 text-green1 transition hover:text-white1 lg:flex"
            >
              <Icon name="cart" size={24} />
              <CartBadge total={totalItems} />
            </button>

            <button
              type="button"
              onClick={() => {
                closeCart();
                openMenu();
              }}
              aria-label="Abrir menu"
              className="cursor-pointer rounded-lg p-2 text-green1 transition hover:text-white1 lg:hidden"
            >
              <Icon name="bars" size={22} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function CartBadge({ total }: { total: number }) {
  if (total <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red1 px-1 text-[11px] font-bold text-white">
      {total}
    </span>
  );
}
