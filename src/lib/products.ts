import { CATEGORY_META, PRODUCTS } from "./products-data";

export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  characteristics: string;
  brand?: string;
}

export interface Category {
  key: string;
  title: string;
  titleLower: string;
  img: string;
  products: Product[];
}

// Categorias na ordem exibida no site original (0..8)
export const CATEGORIES: Category[] = PRODUCTS.map((products, index) => ({
  key: CATEGORY_META[index].key,
  title: CATEGORY_META[index].title,
  titleLower: CATEGORY_META[index].titleLower,
  img: CATEGORY_META[index].img,
  products,
}));

export function getAllProducts(): Product[] {
  return PRODUCTS.flat();
}

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}