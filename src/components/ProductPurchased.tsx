"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

export default function ProductPurchased() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  // exibe a confirmação quando o evento "productPurchased" é disparado
  useEffect(() => {
    const onPurchased = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string }>).detail;
      setMessage(detail?.message ?? "");
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };
    window.addEventListener("bytestore:purchased", onPurchased);
    return () => window.removeEventListener("bytestore:purchased", onPurchased);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[20] flex flex-col items-center justify-center gap-gutter bg-black p-gutter text-center text-white1">
      <Icon name="check" size={64} className="text-green1" />
      <h2 className="text-[3em] font-bold text-green1">Sucesso!</h2>
      <h3 className="max-w-md text-lg text-white1">
        {message || "Compra realizada com sucesso!"}
      </h3>
    </div>
  );
}