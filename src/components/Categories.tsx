import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/products";

export default function Categories() {
  return (
    <section
      id="categories"
      className="mx-auto flex w-full max-w-[1200px] flex-col items-center p-[15px]"
    >
      <h2 className="text-center text-[40px] font-bold text-white1 lg:text-[45px]">
        Encontre produtos por <span className="text-green1">categorias</span>:
      </h2>
      <p className="mx-auto my-[30px] text-white1">
        encontre os produtos que você deseja navegando pelas categorias!
      </p>

      <div className="mt-[30px] grid w-full grid-cols-[repeat(3,200px)] justify-center gap-[30px] lg:grid-cols-3 overflow-x-auto lg:overflow-visible">
        {CATEGORIES.map((category) => (
          <Link
            key={category.key}
            href={`/categoria/${category.key}`}
            className="glow-green flex h-[250px] w-[200px] min-w-[200px] flex-col items-center gap-[15px] bg-white p-[15px] text-center transition-transform hover:scale-105"
          >
            <Image
              src={category.img}
              alt={category.title}
              width={150}
              height={150}
              className="mx-auto h-[150px] w-[150px] rounded-b-[10px] object-contain"
            />
            <h3 className="flex text-[24px] font-bold text-center leading-tight text-green2">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}