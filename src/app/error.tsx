"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-page flex-col items-center justify-center gap-gutter px-gutter text-center">
      <h1 className="text-[40px] font-extrabold text-red1">
        Algo deu errado
      </h1>
      <p className="text-white1/80">
        Ocorreu um erro inesperado ao carregar a página.
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn mt-gutter bg-green2 px-gutter py-[10px] hover:bg-white1 hover:text-green2"
      >
        Tentar novamente
      </button>
    </main>
  );
}
