import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/products";

export default function Categories() {
  return (
    <section
      id="categories"
      className="mx-auto flex w-full max-w-page flex-col items-center p-gutter"
    >
      <h2 className="text-center text-[26px] font-bold text-white1 sm:text-[40px] lg:text-[45px]">
        Encontre produtos por <span className="text-green1">categorias</span>:
      </h2>
      <p className="mx-auto my-section text-center text-white1">
        encontre os produtos que você deseja navegando pelas categorias!
      </p>

      <div className="mt-section grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-section">
        {CATEGORIES.map((category) => (
          <Link
            key={category.key}
            href={`/categoria/${category.key}`}
            className="glow-green flex flex-col items-center gap-3 rounded-2xl bg-white px-3 py-6 text-center transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={category.img}
              alt={category.title}
              width={120}
              height={120}
              className="mx-auto h-24 w-24 object-contain rounded-b-[10px] sm:h-28 sm:w-28"
            />
            <h3 className="flex text-lg font-bold leading-tight text-green2 sm:text-2xl">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}