"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ProductModal from "@/components/ProductModal";
import type { Product } from "@/lib/products";

interface ProductViewerContextValue {
  openProduct: (product: Product, categoryKey: string) => void;
  closeProduct: () => void;
}

const ProductViewerContext = createContext<ProductViewerContextValue | null>(
  null
);

export function ProductViewerProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<{
    product: Product;
    categoryKey: string;
  } | null>(null);

  const openProduct = useCallback((product: Product, categoryKey: string) => {
    setSelected({ product, categoryKey });
  }, []);

  const closeProduct = useCallback(() => setSelected(null), []);

  const value = useMemo(
    () => ({ openProduct, closeProduct }),
    [openProduct, closeProduct]
  );

  return (
    <ProductViewerContext.Provider value={value}>
      {children}
      <ProductModal
        product={selected?.product ?? null}
        categoryKey={selected?.categoryKey ?? ""}
        onClose={closeProduct}
      />
    </ProductViewerContext.Provider>
  );
}

export function useProductViewer(): ProductViewerContextValue {
  const ctx = useContext(ProductViewerContext);
  if (!ctx)
    throw new Error("useProductViewer deve ser usado dentro de <ProductViewerProvider>");
  return ctx;
}