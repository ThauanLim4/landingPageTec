import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { SOCIALS } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="flex min-h-[30vh] flex-col items-center justify-center">
      <Image
        src="/imgs/wave.svg"
        alt=""
        width={1920}
        height={200}
        className="w-full"
      />

      <div className="flex w-full flex-col items-center justify-evenly gap-section p-section">
        <div className="flex gap-section">
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
          &copy; Thauan Lima {year}
        </span>
      </div>
    </footer>
  );
}