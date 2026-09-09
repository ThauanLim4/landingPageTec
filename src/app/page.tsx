"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import { CATEGORIES, shuffle } from "@/lib/products";
import type { Product } from "@/lib/products";

interface Selectable {
  product: Product;
  categoryKey: string;
}

export default function HomePage() {
  const [selected, setSelected] = useState<Selectable | null>(null);

  const ordered = useMemo<Selectable[]>(
    () =>
      CATEGORIES.flatMap((category) =>
        category.products.map((product) => ({
          product,
          categoryKey: category.key,
        }))
      ),
    []
  );

  // embaralha apenas no cliente (como no script.js original), para não
  // quebrar a hidratação com ordens diferentes no servidor/cliente
  const [allProducts, setAllProducts] = useState<Selectable[]>(ordered);

  useEffect(() => {
    // embaralha apenas no cliente; o servidor renderiza a ordem inicial
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllProducts(shuffle([...ordered]));
  }, [ordered]);

  return (
    <main>
      <Hero />

      <Categories />

      <section
        id="sectionAllProducts"
        className="mx-auto flex max-w-[1200px] flex-col items-center gap-[30px] py-12 sm:py-[75px]"
      >
        <h2 className="my-[30px] text-center text-[26px] font-bold leading-tight text-white1 sm:text-[40px] lg:text-[45px]">
          Confira nossos produtos:
        </h2>

        <ProductGrid
          products={allProducts.map((i) => i.product)}
          onSelect={(product) => {
            const match = allProducts.find(
              (i) => i.product.id === product.id
            );
            setSelected({
              product,
              categoryKey: match?.categoryKey ?? CATEGORIES[0].key,
            });
          }}
        />
      </section>

      <ProductModal
        product={selected?.product ?? null}
        categoryKey={selected?.categoryKey ?? ""}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}