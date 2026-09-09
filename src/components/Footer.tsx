import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";

const SOCIALS = [
  { href: "https://www.instagram.com/thaau_lisouza/", label: "Instagram", icon: "instagram" as const },
  { href: "https://wa.me/5583998093699", label: "WhatsApp", icon: "whatsapp" as const },
  { href: "https://www.linkedin.com/in/thauan-lima-120bb6311/", label: "LinkedIn", icon: "linkedin" as const },
  { href: "https://github.com/ThauanLim4", label: "GitHub", icon: "github" as const },
];

export default function Footer() {
  return (
    <footer id="footer" className="flex min-h-[30vh] flex-col items-center justify-center">
      <Image
        src="/imgs/wave.svg"
        alt=""
        width={1920}
        height={200}
        className="w-full"
      />

      <div className="flex w-full flex-col items-center justify-evenly gap-[30px] p-[30px]">
        <div className="flex gap-[30px]">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-[25px] text-green1 transition-all duration-300 hover:text-white1"
            >
              <Icon name={social.icon} size={24} />
            </a>
          ))}
        </div>

        <div className="flex">
          <Link
            href="#home"
            className="ml-[5px] text-[15px] text-green1 transition-all duration-300 hover:text-white1 [&:first-child::after]:content-['_|_']"
          >
            Info
          </Link>
          <Link
            href="#home"
            className="ml-[5px] text-[15px] text-green1 transition-all duration-300 hover:text-white1"
          >
            Contato
          </Link>
        </div>

        <span className="text-[15px] text-white1">
          &copy; Thauan Lima 2024
        </span>
      </div>
    </footer>
  );
}