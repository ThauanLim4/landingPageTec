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
    <div className="glow-green flex w-[300px] flex-col justify-between p-[10px] text-center">
      <div className="flex h-[150px] items-center justify-center">
        <Image
          src={product.img}
          alt={product.name}
          width={150}
          height={150}
          className="mx-auto h-[150px] w-[150px] object-contain"
        />
      </div>

      <h3 className="flex h-[100px] items-center text-[15px] font-semibold text-green1 transition-all duration-300 hover:text-white1">
        {product.name}
      </h3>

      <span className="block py-1 text-[20px] font-bold text-green1">
        {formatPrice(product.price)}
      </span>

      <button
        type="button"
        onClick={() => onSelect(product)}
        className="cursor-pointer self-center bg-green2 px-[10px] py-[5px] font-bold text-white1 transition-all duration-300 hover:bg-white1 hover:text-green2"
      >
        Vizualizar
      </button>
    </div>
  );
}