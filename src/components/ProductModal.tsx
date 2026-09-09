"use client";

import { useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

function splitCharacteristics(html: string): string[] {
  return html
    .split(/<br\s*\/?>/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ProductModal({
  product,
  categoryKey,
  onClose,
}: {
  product: Product | null;
  categoryKey: string;
  onClose: () => void;
}) {
  const { addItem, openCart } = useCart();

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const characteristics = splitCharacteristics(product.characteristics);

  const handleBuy = () => {
    addItem(product, categoryKey);
    onClose();
    openCart();
  };

  return (
    <div
      className="fixed inset-0 z-[7] flex overflow-y-auto bg-black"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="mx-auto my-auto w-full max-w-[1200px] p-[15px] sm:p-[30px]">
        <div
          className="glow-green flex flex-col gap-5 bg-black4 p-4 sm:gap-[30px] sm:p-[30px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 items-center gap-[30px] sm:grid-cols-[0.2fr_0.8fr]">
            <div className="flex items-center justify-center">
              <Image
                src={product.img}
                alt={product.name}
                width={300}
                height={300}
                className="h-[180px] w-[180px] object-contain sm:h-[200px] sm:w-[200px]"
              />
            </div>

            <div className="flex flex-col justify-between gap-[15px]">
              <h2 className="w-full text-[18px] font-bold leading-snug text-white1 sm:text-[20px]">
                {product.name}
              </h2>
              <span className="text-[28px] font-bold text-green1 sm:text-[35px]">
                {formatPrice(product.price)}
              </span>
              <button
                type="button"
                onClick={handleBuy}
                className="w-full max-w-[750px] cursor-pointer bg-green2 px-[15px] py-[10px] text-[22px] font-bold text-white1 transition-all duration-300 hover:bg-white1 hover:text-green2"
              >
                Comprar <Icon name="cart" size={20} className="inline" />
              </button>
            </div>
          </div>

          <div className="glow-green bg-black4 text-center">
            <h3 className="my-4 text-[24px] font-bold text-white1 sm:text-[40px]">
              Principais Características
            </h3>
            <ul className="flex flex-col gap-2 pb-[30px] text-start text-[14px] leading-[24px] text-white1/90 sm:gap-[10px] sm:text-[16px] sm:leading-[28px]">
              {characteristics.map((char, i) => (
                <li key={i} className="px-[15px] sm:px-[30px]">
                  {char}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 z-[8] flex flex-col gap-[15px] p-[15px] sm:flex-row">
        <button
          type="button"
          onClick={() => {
            addItem(product, categoryKey);
            onClose();
          }}
          aria-label="Adicionar ao carrinho"
          className="cursor-pointer bg-green2 px-[15px] py-[10px] font-bold text-white1 transition-all duration-300 hover:bg-white1 hover:text-green2 sm:px-[18px]"
        >
          <Icon name="cartPlus" size={22} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="cursor-pointer bg-red1 px-[15px] py-[10px] font-bold text-white1 transition-all duration-300 sm:px-[18px]"
        >
          <Icon name="xmark" size={22} />
        </button>
      </div>
    </div>
  );
}