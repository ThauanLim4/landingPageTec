"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export interface CartItem extends Product {
  qty: number;
  categoryKey: string;
  uniqueId: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, categoryKey: string, qty?: number) => void;
  removeItem: (uniqueId: string) => void;
  changeQty: (uniqueId: string, delta: number) => void;
  clearCart: () => void;
  purchase: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "bytestore_cart";

function makeUniqueId(categoryKey: string, productId: number): string {
  return `${categoryKey}__${productId}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, ready]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, categoryKey: string, qty = 1) => {
      const uniqueId = makeUniqueId(categoryKey, product.id);
      const amount = Math.max(1, Math.trunc(qty));
      setItems((prev) => {
        const existing = prev.find((i) => i.uniqueId === uniqueId);
        if (existing) {
          return prev.map((i) =>
            i.uniqueId === uniqueId ? { ...i, qty: i.qty + amount } : i
          );
        }
        return [{ ...product, categoryKey, uniqueId, qty: amount }, ...prev];
      });
    },
    []
  );

  const removeItem = useCallback((uniqueId: string) => {
    setItems((prev) => prev.filter((i) => i.uniqueId !== uniqueId));
  }, []);

  const changeQty = useCallback((uniqueId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.uniqueId === uniqueId
            ? { ...i, qty: Math.max(0, i.qty + delta) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const purchase = useCallback(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    setItems([]);
    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("bytestore:purchased", {
          detail: {
            message: `${count} produto(s) foram comprados com sucesso!`,
          },
        })
      );
    }, 0);
    setIsOpen(false);
  }, [items]);

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      changeQty,
      clearCart,
      purchase,
    }),
    [
      items,
      totalItems,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      changeQty,
      clearCart,
      purchase,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}