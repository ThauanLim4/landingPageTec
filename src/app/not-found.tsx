import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-page flex-col items-center justify-center gap-gutter px-gutter text-center">
      <h1 className="text-[64px] font-extrabold leading-none text-green1">
        404
      </h1>
      <h2 className="text-[24px] font-bold text-white1">
        Página não encontrada
      </h2>
      <p className="text-white1/80">
        O conteúdo que você procura não está disponível.
      </p>
      <Link
        href="/"
        className="btn mt-gutter bg-green2 px-gutter py-[10px] hover:bg-white1 hover:text-green2"
      >
        Voltar para a loja
      </Link>
    </main>
  );
}
