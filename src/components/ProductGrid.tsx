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
    <div className="grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-3 sm:gap-[30px] lg:grid-cols-5">
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