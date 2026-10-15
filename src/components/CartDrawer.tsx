"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/components/CartProvider";

export default function CartDrawer() {
  const {
    items,
    totalItems,
    isOpen,
    closeCart,
    changeQty,
    removeItem,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-y-auto bg-black/80 p-gutter sm:p-section"
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho"
      onClick={closeCart}
    >
      <div
        className="mx-auto my-auto w-full max-w-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glow-green relative overflow-hidden rounded-2xl border border-green1/20 bg-black4">
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-white1/70 transition hover:bg-black3 hover:text-white1"
          >
            <Icon name="xmark" size={18} />
          </button>

          <div className="flex flex-col gap-4 p-5 sm:p-6">
            <h2 className="pr-8 text-[18px] font-semibold text-white1 sm:text-[20px]">
              Carrinho
            </h2>

            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center text-white1">
                <h3 className="text-[24px] font-bold">Carrinho vazio...</h3>
                <p className="text-sm">
                  Que tal{" "}
                  <span className="text-green1">adicionarmos</span> algo aqui?
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="btn mt-2 flex w-full max-w-[320px] items-center justify-center gap-2 rounded-lg bg-green2 px-4 py-3 text-sm hover:bg-white1 hover:text-green2"
                >
                  Visualizar produtos <Icon name="arrowRight" size={15} />
                </button>
              </div>
            ) : (
              <>
                <ul className="flex max-h-[50vh] flex-col overflow-y-auto">
                  {items.map((item) => (
                    <CartRow
                      key={item.uniqueId}
                      item={item}
                      onMinus={() => changeQty(item.uniqueId, -1)}
                      onPlus={() => changeQty(item.uniqueId, 1)}
                      onRemove={() => removeItem(item.uniqueId)}
                    />
                  ))}
                </ul>

                <div className="flex flex-col gap-3 border-t border-black2 pt-4">
                  <p className="text-sm text-white1/70">
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "itens"} no carrinho
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      router.push("/checkout");
                    }}
                    className="btn flex h-11 items-center justify-center gap-2 rounded-lg bg-green2 hover:bg-green3 hover:text-black"
                  >
                    Comprar <Icon name="cart" size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartRow({
  item,
  onMinus,
  onPlus,
  onRemove,
}: {
  item: CartItem;
  onMinus: () => void;
  onPlus: () => void;
  onRemove: () => void;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-3 border-t border-black2 py-4 text-white1 first:border-t-0 first:pt-0 sm:gap-4">
      <Image
        src={item.img}
        alt={item.name}
        width={100}
        height={100}
        className="h-16 w-16 self-center object-contain sm:h-[100px] sm:w-[100px]"
      />
      <div className="flex min-w-0 flex-col gap-2 sm:gap-3">
        <h3 className="text-[15px] font-bold leading-tight sm:text-[16px]">
          {item.name}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[20px] font-bold text-green1 sm:text-[25px]">
            {formatPrice(item.price)}
          </span>
          <div className="flex flex-none items-center gap-1">
            <button
              type="button"
              onClick={onMinus}
              aria-label="Diminuir quantidade"
              className="cursor-pointer text-green1"
            >
              <Icon name="chevronLeft" size={18} />
            </button>
            <span className="min-w-4 text-center text-base font-semibold">
              {item.qty}
            </span>
            <button
              type="button"
              onClick={onPlus}
              aria-label="Aumentar quantidade"
              className="cursor-pointer text-green1"
            >
              <Icon name="chevronRight" size={18} />
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remover item"
            className="btn ml-auto rounded-lg bg-green2 px-3 py-[7px] hover:bg-red1"
          >
            <Icon name="trash" size={16} className="inline" />
          </button>
        </div>
      </div>
    </li>
  );
}
