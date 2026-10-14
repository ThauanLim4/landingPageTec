import Link from "next/link";
import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { getCategoryByKey } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const category = getCategoryByKey(key);

  if (!category) {
    return { title: "Categoria não encontrada | ByteStore" };
  }

  return {
    title: `${category.title} | ByteStore`,
    description: `Encontre as melhores opções em ${category.titleLower} na ByteStore.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const category = getCategoryByKey(key);

  if (!category) {
    return (
      <main className="mx-auto flex min-h-screen max-w-page flex-col items-center gap-4 px-gutter pt-[70px] text-center">
        <h1 className="text-[40px] font-bold text-white1">
          Categoria não encontrada
        </h1>
        <Link
          href="/#sectionAllProducts"
          className="btn bg-green2 px-gutter py-[10px] hover:bg-white1 hover:text-green2"
        >
          Ver todos os produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-page flex-col items-center p-gutter pt-[70px]">
      <CategoryView
        categoryKey={category.key}
        titleLower={category.titleLower}
      />
    </main>
  );
}
