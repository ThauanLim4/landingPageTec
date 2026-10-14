"use client";

import Image from "next/image";
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
    purchase,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col gap-[50px] bg-black transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex h-[75px] w-full items-center justify-center border-b border-black2">
        <button
          type="button"
          onClick={closeCart}
          aria-label="Fechar carrinho"
          className="absolute left-gutter text-[30px] text-green1 transition hover:text-white1"
        >
          <Icon name="xmark" size={26} />
        </button>
        <h2 className="p-gutter text-center text-[28px] font-bold text-white1">
          Carrinho
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="mt-[100px] flex flex-col items-center gap-gutter text-center text-white1">
          <h3 className="text-[2.5em] font-bold">Carrinho vazio...</h3>
          <p className="text-base">
            Que tal <span className="text-green1">adicionarmos</span> algo aqui?
          </p>
          <button
            type="button"
            onClick={closeCart}
            className="btn mt-gutter flex max-w-[500px] w-[75%] items-center justify-center gap-2 bg-green2 px-gutter py-3 text-sm hover:bg-white1 hover:text-green2"
          >
            Visualizar produtos <Icon name="arrowRight" size={15} />
          </button>
        </div>
      ) : (
        <>
          <ul className="mt-[100px] flex h-[70vh] w-full flex-col items-center gap-gutter overflow-y-auto p-gutter">
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

          <div className="flex w-full flex-col items-center gap-3 px-gutter pb-10">
            <p className="text-sm text-white1/70">
              {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
            </p>
            <button
              type="button"
              onClick={purchase}
              className="btn w-full max-w-[750px] bg-green2 px-gutter py-gutter text-center text-[24px] hover:bg-white1 hover:text-green1"
            >
              Comprar <Icon name="cart" size={22} className="inline" />
            </button>
          </div>
        </>
      )}
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
    <li className="glow-green grid w-[95%] max-w-[1000px] grid-cols-[auto_1fr] gap-gutter p-gutter text-white1">
      <Image
        src={item.img}
        alt={item.name}
        width={100}
        height={100}
        className="h-20 w-20 self-center object-contain sm:h-[100px] sm:w-[100px]"
      />
      <div className="flex min-w-0 flex-col gap-gutter">
        <h3 className="text-[15px] font-bold leading-tight sm:text-[16px]">
          {item.name}
        </h3>
        <div className="flex flex-wrap items-center gap-gutter">
          <span className="text-[25px] font-bold text-green1">
            {formatPrice(item.price)}
          </span>
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
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remover item"
            className="btn ml-auto bg-green2 px-[12px] py-[7px] hover:bg-red1"
          >
            <Icon name="trash" size={16} className="inline" />
          </button>
        </div>
      </div>
    </li>
  );
}