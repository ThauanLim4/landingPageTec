import type { IconName } from "@/components/Icon";

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: IconName;
}

// Links de navegação principais, compartilhados entre Header (desktop) e MenuMobile.
export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#categories", label: "Categorias" },
  { href: "#sectionAllProducts", label: "Produtos" },
  { href: "#footer", label: "Sobre" },
];

// Redes sociais exibidas no Hero e no Footer.
export const SOCIALS: SocialLink[] = [
  { href: "https://www.instagram.com/thaau_lisouza/", label: "Instagram", icon: "instagram" },
  { href: "https://wa.me/5583998093699", label: "WhatsApp", icon: "whatsapp" },
  { href: "https://www.linkedin.com/in/thauan-lima-120bb6311/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://github.com/ThauanLim4", label: "GitHub", icon: "github" },
];
