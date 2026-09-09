import Link from "next/link";
import Image from "next/image";

import Icon from "@/components/Icon";

const SOCIALS = [
  { href: "https://www.instagram.com/thaau_lisouza/", label: "Instagram", icon: "instagram" as const },
  { href: "https://wa.me/5583998093699", label: "WhatsApp", icon: "whatsapp" as const },
  { href: "https://www.linkedin.com/in/thauan-lima-120bb6311/", label: "LinkedIn", icon: "linkedin" as const },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto mt-[70px] flex w-full max-w-[1200px] flex-col-reverse items-center p-[15px] lg:h-screen lg:flex-row"
    >
      <div id="cta" className="flex w-full flex-col gap-[15px] lg:w-[55%]">
        <h1 className="text-[50px] font-extrabold leading-none lg:text-[55px]">
          Dê uma <span className="text-green3">turbinada</span> no seu setup
        </h1>

        <p className="text-[18px] text-white1/90">
          Buscamos trazer as opções que mais combina com o seu gosto e atenda
          sua necessidades de forma prática e rápida!
        </p>

        <div className="py-[30px]">
          <Link
            href="#sectionAllProducts"
            className="cursor-pointer bg-green2 px-[15px] py-[10px] font-bold text-white1 transition-all duration-300 hover:bg-white1 hover:text-green1"
          >
            Vizualizar Produtos <Icon name="arrowRight" size={15} className="inline" />
          </Link>
        </div>

        <div className="flex gap-[15px]">
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
          src="/imgs/pngwing.com(3).png"
          alt="Setup"
          width={500}
          height={500}
          priority
          className="h-[250px] w-[250px] object-contain lg:h-[500px] lg:w-[500px]"
        />
      </div>
    </section>
  );
}