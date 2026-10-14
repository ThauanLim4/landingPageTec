"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { groupSpecs } from "@/lib/specs";
import { getCategoryByKey, type Product } from "@/lib/products";

function ProductModalContent({
  product,
  categoryKey,
  onClose,
}: {
  product: Product;
  categoryKey: string;
  onClose: () => void;
}) {
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);

  const category = getCategoryByKey(categoryKey);
  const categoryTitle = category?.title || "";

  const specs = groupSpecs(product.characteristics || []);

  const installment = formatPrice(product.price / 10);

  const handleAddToCart = () => {
    addItem(product, categoryKey, qty);
    onClose();
    openCart();
  };

  return (
    <div
      className="glow-green relative overflow-hidden rounded-2xl border border-green1/20 bg-black4"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-white1/70 transition hover:bg-black3 hover:text-white1"
      >
        <Icon name="xmark" size={18} />
      </button>

      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-[5fr_6fr] sm:p-6">
        <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-black3 p-4 sm:min-h-[220px]">
          <Image
            src={product.img}
            alt={product.name}
            width={300}
            height={300}
            className="h-[180px] w-[180px] object-contain sm:h-[220px] sm:w-[220px]"
          />
        </div>

        <div className="flex flex-col gap-3">
          {categoryTitle && (
            <p className="text-[13px] text-white1/60">{categoryTitle}</p>
          )}
          <h2 className="pr-8 text-[18px] font-semibold leading-snug text-white1 sm:text-[20px]">
            {product.name}
          </h2>

          <div className="mt-1">
            <span className="text-[28px] font-bold text-green1">
              {formatPrice(product.price)}
            </span>
            <p className="mt-0.5 text-[13px] text-white1/60">
              ou 10x de {installment} sem juros
            </p>
          </div>

          <span className="inline-flex items-center gap-1 self-start rounded-full bg-green2/20 px-3 py-0.5 text-[12px] text-green1">
            <Icon name="check" size={14} />
            Em estoque
          </span>

          <div className="mt-2 flex gap-2.5">
            <div className="flex h-11 items-center rounded-lg border border-black2">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                className="flex h-10 w-9 items-center justify-center text-lg text-white1 transition hover:text-green1"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="min-w-[28px] text-center text-[14px] text-white1">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                className="flex h-10 w-9 items-center justify-center text-lg text-white1 transition hover:text-green1"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-green2 hover:bg-green3 hover:text-black"
            >
              <Icon name="cartPlus" size={18} />
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>

      {specs.length > 0 && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <h3 className="mb-2 text-[15px] font-semibold text-white1">
            Especificações
          </h3>
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-4 sm:grid-cols-2">
            {specs.map((group) => (
              <div key={group.title} className="break-inside-avoid">
                <h4 className="mb-1 text-[12px] font-medium text-white1/50">
                  {group.title}
                </h4>
                {group.rows.map((row, i) => (
                  <div
                    key={`${group.title}-${i}`}
                    className="flex justify-between gap-4 border-t border-black2 py-2.5 text-[14px]"
                  >
                    {row.label ? (
                      <>
                        <span className="text-white1/60">{row.label}</span>
                        <span className="text-right text-white1">
                          {row.value}
                        </span>
                      </>
                    ) : (
                      <span className="text-white1">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
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

  return (
    <div
      className="fixed inset-0 z-[7] flex overflow-y-auto bg-black/80 p-gutter sm:p-section"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="mx-auto my-auto w-full max-w-[720px]">
        <ProductModalContent
          key={`${categoryKey}:${product.id}`}
          product={product}
          categoryKey={categoryKey}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
