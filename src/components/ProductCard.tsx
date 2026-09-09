import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) {
  return (
    <div className="glow-green group flex h-full w-[90%] flex-col rounded-2xl bg-black3 p-4 text-left transition-transform duration-300 hover:-translate-y-1 sm:w-full">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl bg-black4">
        <Image
          src={product.img}
          alt={product.name}
          width={160}
          height={160}
          className="h-36 w-36 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-white1">
        {product.name}
      </h3>

      <span className="mt-2 block text-lg font-extrabold text-green3">
        {formatPrice(product.price)}
      </span>

      <button
        type="button"
        onClick={() => onSelect(product)}
        className="mt-auto w-full cursor-pointer rounded-lg bg-green2 px-4 py-2.5 text-sm font-bold text-white1 transition-all duration-300 hover:bg-green3 hover:text-black"
      >
        Visualizar
      </button>
    </div>
  );
}