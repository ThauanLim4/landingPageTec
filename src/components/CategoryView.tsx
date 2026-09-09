"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import { getCategoryByKey } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function CategoryView({
  categoryKey,
  titleLower,
}: {
  categoryKey: string;
  titleLower: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<{
    product: Product;
    categoryKey: string;
  } | null>(null);

  const category = getCategoryByKey(categoryKey);

  if (!category) return null;

  return (
    <>
      <h2 className="text-center text-[26px] font-bold leading-tight text-white1 sm:text-[40px] lg:text-[45px]">
        Encontre produtos pela categoria{" "}
        <span className="text-green1">{titleLower}</span>:
      </h2>
      <p className="mx-auto my-[30px] text-center text-white1">
        encontre os produtos que você deseja navegando pelas categorias!
      </p>

      <ProductGrid
        products={category.products}
        onSelect={(product) =>
          setSelected({ product, categoryKey: category.key })
        }
      />

      <button
        type="button"
        onClick={() => router.push("/#categories")}
        className="my-10 flex cursor-pointer items-center gap-2 self-center bg-green2 px-[15px] py-[10px] text-[18px] font-bold text-white1 transition-all duration-300 hover:bg-white1 hover:text-green2"
      >
        <Icon name="arrowLeft" size={18} /> voltar as categorias
      </button>

      <ProductModal
        product={selected?.product ?? null}
        categoryKey={selected?.categoryKey ?? category.key}
        onClose={() => setSelected(null)}
      />
    </>
  );
}