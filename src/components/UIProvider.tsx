"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface UIContextValue {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

// Estado de interface que não pertence ao carrinho (ex.: menu mobile).
export function UIProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const value = useMemo(
    () => ({ menuOpen, openMenu, closeMenu }),
    [menuOpen, openMenu, closeMenu]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI deve ser usado dentro de <UIProvider>");
  return ctx;
}
