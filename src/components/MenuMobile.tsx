"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useUI } from "@/components/UIProvider";
import { NAV_LINKS } from "@/lib/site-config";

export default function MenuMobile() {
  const { menuOpen, closeMenu } = useUI();

  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/70" onClick={closeMenu} />
      <nav className="relative z-10 h-full w-[100vw] translate-x-0 transform bg-black transition-all duration-300">
        <div className="flex h-[50px] items-center justify-center border-b-2 border-black2">
          <h2 className="w-[90%] text-center text-[25px] font-bold text-white1">
            Menu
          </h2>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="absolute right-gutter text-green1 transition hover:text-white1"
          >
            <Icon name="xmark" size={26} />
          </button>
        </div>

        <ul className="flex list-none flex-col items-center gap-section py-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="text-[25px] font-medium text-white1 transition hover:text-green1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}