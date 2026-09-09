import Link from "next/link";
import CategoryView from "@/components/CategoryView";
import { getCategoryByKey } from "@/lib/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const category = getCategoryByKey(key);

  if (!category) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[1200px] flex-col items-center gap-4 px-[15px] pt-[70px] text-center">
        <h1 className="text-[40px] font-bold text-white1">
          Categoria não encontrada
        </h1>
        <Link
          href="/#sectionAllProducts"
          className="cursor-pointer bg-green2 px-[15px] py-[10px] font-bold text-white1 transition-all duration-300 hover:bg-white1 hover:text-green2"
        >
          Ver todos os produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center p-[15px] pt-[70px]">
      <CategoryView
        categoryKey={category.key}
        titleLower={category.titleLower}
      />
    </main>
  );
}