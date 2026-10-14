"use client";

import Icon from "@/components/Icon";
import ProductGrid from "@/components/ProductGrid";
import { useProductViewer } from "@/components/ProductViewerProvider";
import { getCategoryByKey } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function CategoryView({
  categoryKey,
  titleLower,
}: {
  categoryKey: string;
  titleLower: string;
}) {
  const router = useRouter();
  const { openProduct } = useProductViewer();

  const category = getCategoryByKey(categoryKey);

  if (!category) return null;

  return (
    <>
      <h2 className="text-center text-[26px] font-bold leading-tight text-white1 sm:text-[40px] lg:text-[45px]">
        Encontre produtos pela categoria{" "}
        <span className="text-green1">{titleLower}</span>:
      </h2>
      <p className="mx-auto my-section text-center text-white1">
        encontre os produtos que você deseja navegando pelas categorias!
      </p>

      <ProductGrid
        products={category.products}
        onSelect={(product) => openProduct(product, category.key)}
      />

      <button
        type="button"
        onClick={() => router.push("/#categories")}
        className="btn my-10 flex items-center gap-2 self-center bg-green2 px-gutter py-[10px] text-[18px] hover:bg-white1 hover:text-green2"
      >
        <Icon name="arrowLeft" size={18} /> voltar as categorias
      </button>
    </>
  );
}