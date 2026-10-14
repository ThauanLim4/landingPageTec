"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import { useProductViewer } from "@/components/ProductViewerProvider";
import { CATEGORIES, shuffle } from "@/lib/products";
import type { Product } from "@/lib/products";

interface Selectable {
  product: Product;
  categoryKey: string;
}

export default function HomePage() {
  const { openProduct } = useProductViewer();

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
        className="mx-auto flex max-w-page flex-col items-center gap-section py-12 sm:py-[75px]"
      >
        <h2 className="my-section text-center text-[26px] font-bold leading-tight text-white1 sm:text-[40px] lg:text-[45px]">
          Confira nossos produtos:
        </h2>

        <ProductGrid
          products={allProducts.map((i) => i.product)}
          onSelect={(product) => {
            const match = allProducts.find(
              (i) => i.product.id === product.id
            );
            openProduct(product, match?.categoryKey ?? CATEGORIES[0].key);
          }}
        />
      </section>
    </main>
  );
}