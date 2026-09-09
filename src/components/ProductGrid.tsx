import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ProductGrid({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (product: Product) => void;
}) {
  return (
    <div className="grid w-full grid-cols-[repeat(3,300px)] justify-center gap-[30px] overflow-x-auto [scrollbar-width:none]">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}