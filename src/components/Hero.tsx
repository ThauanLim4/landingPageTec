import Link from "next/link";
import Image from "next/image";

import Icon from "@/components/Icon";
import { SOCIALS } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto mt-[70px] flex w-full max-w-page flex-col-reverse items-center p-gutter lg:h-screen lg:flex-row"
    >
      <div id="cta" className="flex w-full flex-col gap-gutter lg:w-[55%]">
        <h1 className="text-[30px] font-extrabold leading-tight sm:text-[50px] lg:text-[55px] lg:leading-none">
          Dê uma <span className="text-green3">turbinada</span> no seu setup
        </h1>

        <p className="text-base text-white1/90 sm:text-[18px]">
          Buscamos trazer as opções que mais combina com o seu gosto e atenda
          sua necessidades de forma prática e rápida!
        </p>

        <div className="py-section">
          <Link
            href="#sectionAllProducts"
            className="btn bg-green2 px-gutter py-[10px] hover:bg-white1 hover:text-green1"
          >
            Visualizar Produtos <Icon name="arrowRight" size={15} className="inline" />
          </Link>
        </div>

        <div className="flex gap-gutter">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-[28px] text-green3 transition-all duration-300 hover:text-white1"
            >
              <Icon name={social.icon} size={26} />
            </a>
          ))}
        </div>
      </div>

      <div className="glow-green-strong flex items-start justify-end rounded-[100%_5%] bg-green3 lg:w-[45%]">
        <Image
          src="/imgs/hero-setup.png"
          alt="Setup"
          width={500}
          height={500}
          priority
          className="h-[200px] w-[200px] object-contain sm:h-[260px] sm:w-[260px] lg:h-[500px] lg:w-[500px]"
        />
      </div>
    </section>
  );
}