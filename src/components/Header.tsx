"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartProvider";

const NAV_LINKS = [
  { href: "#home", label: "Home", cls: "home" },
  { href: "#categories", label: "Categorias", cls: "categories" },
  { href: "#sectionAllProducts", label: "Produtos", cls: "recommendedProducts" },
  { href: "#footer", label: "Sobre", cls: "footer" },
];

export default function Header() {
  const { totalItems, openCart, openMenu } = useCart();

  return (
    <>
      {/* botão de carrinho fixo no canto inferior esquerdo (igual .menuCart) */}
      <button
        type="button"
        onClick={openCart}
        aria-label="Abrir carrinho"
        className="glow-green fixed bottom-4 left-4 z-10 flex h-14 w-14 items-center justify-center bg-green2 text-2xl text-white1 transition-all duration-300 hover:brightness-110"
      >
        <Icon name="cart" size={22} />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red1 px-1 text-[11px] font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>

      <header className="glow-green fixed left-0 right-0 top-0 z-[4] flex items-center justify-between bg-black">
        <Link href="#home" className="flex items-center gap-1 p-[15px]">
          <Icon name="bolt" size={20} className="text-green1" />
          <span className="text-xl font-extrabold tracking-tight text-green1">
            ByteStore
          </span>
        </Link>

        <ul className="hidden h-full w-[300px] list-none items-center justify-between p-[15px] lg:flex [text-shadow:0px_0px_15px_var(--color-green2)]">
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

        <button
          type="button"
          onClick={openMenu}
          aria-label="Abrir menu"
          className="cursor-pointer p-[15px] text-green1 transition hover:text-white1 lg:hidden"
        >
          <Icon name="bars" size={22} />
        </button>
      </header>
    </>
  );
}