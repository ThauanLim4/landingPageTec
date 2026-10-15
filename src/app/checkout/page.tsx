"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

type Method = "pix" | "card" | "boleto";
type CouponCode = "BYTE10" | "FRETEGRATIS";

const FRETE = 24.9;
const PIX_CODE = "00020126580014br.gov.bcb.pix0136bytestore";

const METHODS: { key: Method; label: string; sub: string; icon: IconName }[] = [
  { key: "pix", label: "Pix", sub: "5% off", icon: "qrcode" },
  { key: "card", label: "Cartão", sub: "até 10x", icon: "creditCard" },
  { key: "boleto", label: "Boleto", sub: "3 dias úteis", icon: "barcode" },
];

export default function CheckoutPage() {
  const { items, totalItems, changeQty, removeItem } = useCart();

  const [coupon, setCoupon] = useState<CouponCode | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{
    kind: "default" | "ok" | "err";
    text: string;
  }>({ kind: "default", text: "Teste: BYTE10 (10% off) ou FRETEGRATIS." });

  const [method, setMethod] = useState<Method>("pix");

  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("1");

  const [done, setDone] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  // QR de exemplo com PRNG determinístico (igual ao layout original)
  const qrCells = useMemo(() => {
    let s = 7;
    const cells: boolean[] = [];
    for (let i = 0; i < 169; i++) {
      s = (s * 9301 + 49297) % 233280;
      const r = Math.floor(i / 13);
      const c = i % 13;
      const finder = (r < 4 && c < 4) || (r < 4 && c > 8) || (r > 8 && c < 4);
      cells.push(finder || s / 233280 > 0.5);
    }
    return cells;
  }, []);

  const totals = useMemo(() => {
    const sub = items.reduce((acc, i) => acc + i.price * i.qty, 0);
    const dc = coupon === "BYTE10" ? sub * 0.1 : 0;
    const px = method === "pix" ? (sub - dc) * 0.05 : 0;
    const fr = items.length === 0 || coupon === "FRETEGRATIS" ? 0 : FRETE;
    return { sub, dc, px, fr, tot: sub - dc - px + fr };
  }, [items, coupon, method]);

  const inputCls =
    "h-11 w-full rounded-lg border border-black2 bg-black3 px-3 text-sm text-white1 outline-none transition placeholder:text-white1/40 focus:border-green1";
  const labelCls = "mb-1 block text-[12px] text-white1/60";

  const applyCoupon = () => {
    const v = couponInput.trim().toUpperCase();
    if (!v) {
      setCoupon(null);
      setDone(null);
      setCouponMsg({ kind: "err", text: "Digite o código do cupom." });
      return;
    }
    if (v === "BYTE10" || v === "FRETEGRATIS") {
      setCoupon(v);
      setDone(null);
      setCouponMsg({
        kind: "ok",
        text:
          v === "BYTE10"
            ? "Cupom BYTE10 aplicado: 10% de desconto."
            : "Cupom FRETEGRATIS aplicado: frete grátis.",
      });
    } else {
      setCoupon(null);
      setDone(null);
      setCouponMsg({
        kind: "err",
        text: "Esse cupom não existe ou expirou. Confira o código.",
      });
    }
  };

  const finalize = () => {
    setDone(null);
    if (!items.length) {
      setDone({ kind: "err", text: "Adicione um produto ao carrinho." });
      return;
    }
    if (method === "card") {
      let err = "";
      if (cardNum.replace(/\s/g, "").length < 16)
        err = "Confira o número do cartão.";
      else if (!cardName.trim())
        err = "Informe o nome impresso no cartão.";
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExp))
        err = "Use a validade no formato MM/AA.";
      else if (cardCvv.length < 3) err = "Informe o CVV do cartão.";
      if (err) {
        setDone({ kind: "err", text: err });
        return;
      }
    }
    setDone({
      kind: "ok",
      text:
        method === "pix"
          ? `Pix gerado. Pague ${formatPrice(totals.tot)} em até 30 minutos.`
          : method === "boleto"
            ? "Boleto gerado. Vence em 3 dias."
            : "Pagamento enviado para análise.",
    });
  };

  const ctaLabel =
    method === "pix"
      ? "Gerar Pix"
      : method === "boleto"
        ? "Gerar boleto"
        : "Pagar com cartão";

  const parcelNote =
    method === "card"
      ? "em até 10x sem juros"
      : method === "pix"
        ? "à vista no Pix"
        : "à vista no boleto";

  return (
    <main className="mx-auto mt-[80px] w-full max-w-page px-gutter pb-section">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm text-white1/60 transition hover:text-green1"
      >
        <Icon name="arrowLeft" size={15} /> Continuar comprando
      </Link>
      <h1 className="mt-2 text-[26px] font-bold text-white1 sm:text-[32px]">
        Finalizar compra
      </h1>

      <div className="mt-section grid grid-cols-1 items-start gap-section lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* coluna principal */}
        <div>
          {/* carrinho */}
          <section className="glow-green rounded-2xl bg-black4 p-5 sm:p-6">
            <h2 className="text-[16px] font-semibold text-white1">
              Seu carrinho{" "}
              {items.length > 0 && (
                <span className="text-[13px] font-normal text-white1/60">
                  ({totalItems} {totalItems === 1 ? "item" : "itens"})
                </span>
              )}
            </h2>

            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <p className="text-sm text-white1/60">
                  Seu carrinho está vazio.
                </p>
                <Link
                  href="/"
                  className="btn flex items-center gap-2 rounded-lg bg-green2 px-4 py-2.5 text-sm hover:bg-green3 hover:text-black"
                >
                  Visualizar produtos{" "}
                  <Icon name="arrowRight" size={15} />
                </Link>
              </div>
            ) : (
              <ul className="mt-2">
                {items.map((item) => (
                  <li
                    key={item.uniqueId}
                    className="flex items-center gap-3 border-t border-black2 py-3 first:border-t-0 first:pt-0"
                  >
                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-black3 p-1.5">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white1">
                        {item.name}
                      </p>
                      <p className="text-[13px] text-white1/60">
                        {formatPrice(item.price)} cada
                      </p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <div className="flex h-8 items-center rounded-lg border border-black2">
                          <button
                            type="button"
                            aria-label="Diminuir quantidade"
                            disabled={item.qty <= 1}
                            onClick={() => {
                              setDone(null);
                              changeQty(item.uniqueId, -1);
                            }}
                            className="flex h-7 w-7 items-center justify-center text-white1 transition hover:text-green1 disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="min-w-[24px] text-center text-[13px] text-white1">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Aumentar quantidade"
                            onClick={() => {
                              setDone(null);
                              changeQty(item.uniqueId, 1);
                            }}
                            className="flex h-7 w-7 items-center justify-center text-white1 transition hover:text-green1"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setDone(null);
                            removeItem(item.uniqueId);
                          }}
                          className="text-[12px] text-white1/60 transition hover:text-red1"
                        >
                          Remover
                        </button>
                      </div>
                    </div>

                    <p className="flex-none text-sm font-semibold text-white1">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* cupom */}
          <section className="glow-green mt-section rounded-2xl bg-black4 p-5 sm:p-6">
            <h2 className="text-[16px] font-semibold text-white1">
              Cupom de desconto
            </h2>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setCouponInput(v);
                  if (!v) {
                    setCoupon(null);
                    setDone(null);
                    setCouponMsg({
                      kind: "default",
                      text: "Teste: BYTE10 (10% off) ou FRETEGRATIS.",
                    });
                  }
                }}
                placeholder="BYTE10"
                aria-label="Código do cupom"
                className={inputCls}
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="btn flex-none rounded-lg bg-green2 px-5 text-sm hover:bg-green3 hover:text-black"
              >
                Aplicar
              </button>
            </div>
            <p
              className={`mt-2 text-[13px] ${
                couponMsg.kind === "ok"
                  ? "text-green1"
                  : couponMsg.kind === "err"
                    ? "text-red1"
                    : "text-white1/60"
              }`}
            >
              {couponMsg.text}
            </p>
          </section>

          {/* pagamento */}
          <section className="glow-green mt-section rounded-2xl bg-black4 p-5 sm:p-6">
            <h2 className="text-[16px] font-semibold text-white1">
              Forma de pagamento
            </h2>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {METHODS.map((m) => {
                const on = m.key === method;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      setMethod(m.key);
                      setDone(null);
                    }}
                    aria-pressed={on}
                    className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-[13px] font-medium transition ${
                      on
                        ? "border-green1 bg-green2/15 text-green1"
                        : "border-black2 text-white1/70 hover:border-white1/30"
                    }`}
                  >
                    <Icon name={m.icon} size={20} />
                    <span>{m.label}</span>
                    <span className="text-[11px] font-normal text-white1/50">
                      {m.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* pix */}
            {method === "pix" && (
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div
                  className="grid h-[130px] w-[130px] flex-none grid-cols-13 gap-px rounded-lg bg-white p-2"
                  role="img"
                  aria-label="QR Code de exemplo"
                >
                  {qrCells.map((on, i) => (
                    <span key={i} className={on ? "bg-[#111]" : "bg-white"} />
                  ))}
                </div>
                <div className="min-w-[180px] flex-1">
                  <p className="text-[13px] leading-relaxed text-white1/70">
                    Abra o app do seu banco, escolha Pix e leia o QR Code ou
                    use o código copia e cola. A aprovação é imediata.
                  </p>
                  <div className="mt-2 flex gap-1.5">
                    <input
                      type="text"
                      value={PIX_CODE}
                      readOnly
                      aria-label="Código Pix"
                      className={`${inputCls} h-9 text-[12px]`}
                    />
                    <button
                      type="button"
                      aria-label="Copiar código Pix"
                      onClick={() => {
                        navigator.clipboard?.writeText(PIX_CODE);
                        setCopied(true);
                        setDone(null);
                      }}
                      className="btn flex h-9 w-10 flex-none items-center justify-center rounded-lg bg-green2 hover:bg-green3 hover:text-black"
                    >
                      <Icon name="copy" size={15} />
                    </button>
                  </div>
                  <p className="mt-1.5 text-[13px] text-white1/60">
                    {copied ? (
                      <span className="text-green1">Código Pix copiado.</span>
                    ) : (
                      <>
                        <Icon name="clock" size={13} className="inline" />{" "}
                        Código válido por 30 minutos
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* cartão */}
            {method === "card" && (
              <div className="mt-4">
                <label htmlFor="cn" className={labelCls}>
                  Número do cartão
                </label>
                <input
                  id="cn"
                  type="text"
                  inputMode="numeric"
                  maxLength={19}
                  placeholder="0000 0000 0000 0000"
                  value={cardNum}
                  onChange={(e) =>
                    setCardNum(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16)
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                    )
                  }
                  className={inputCls}
                />
                <label htmlFor="cname" className={labelCls}>
                  Nome impresso no cartão
                </label>
                <input
                  id="cname"
                  type="text"
                  placeholder="Como está no cartão"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className={inputCls}
                />
                <div className="flex gap-2.5">
                  <div className="flex-1">
                    <label htmlFor="cv" className={labelCls}>
                      Validade
                    </label>
                    <input
                      id="cv"
                      type="text"
                      placeholder="MM/AA"
                      value={cardExp}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setCardExp(
                          d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
                        );
                      }}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cc" className={labelCls}>
                      CVV
                    </label>
                    <input
                      id="cc"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(
                          e.target.value.replace(/\D/g, "").slice(0, 4)
                        )
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
                <label htmlFor="ci" className={labelCls}>
                  Parcelas
                </label>
                <select
                  id="ci"
                  value={installments}
                  onChange={(e) => setInstallments(e.target.value)}
                  className={inputCls}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                    <option key={i} value={String(i)}>
                      {i}x de {formatPrice(totals.tot / i)} sem juros
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* boleto */}
            {method === "boleto" && (
              <div className="mt-4">
                <p className="text-[13px] leading-relaxed text-white1/70">
                  Ao finalizar, geramos o boleto para você pagar no app do
                  banco, lotérica ou internet banking. O pedido é liberado após
                  a compensação, em até 3 dias úteis.
                </p>
                <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-red1/30 bg-red1/10 px-3 py-2.5 text-[13px] text-red1">
                  <Icon name="alert" size={15} className="flex-none" />
                  Boleto não tem desconto e vence em 3 dias.
                </div>
              </div>
            )}
          </section>
        </div>

        {/* resumo */}
        <aside className="glow-green rounded-2xl bg-black4 p-5 sm:p-6 lg:sticky lg:top-[90px]">
          <h2 className="text-[16px] font-semibold text-white1">
            Resumo do pedido
          </h2>

          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <SummaryRow label="Subtotal" value={formatPrice(totals.sub)} />
            {coupon === "BYTE10" && (
              <SummaryRow
                label="Cupom BYTE10"
                value={`− ${formatPrice(totals.dc)}`}
                accent
              />
            )}
            {coupon === "FRETEGRATIS" && (
              <SummaryRow label="Cupom FRETEGRATIS" value="Frete grátis" accent />
            )}
            {method === "pix" && (
              <SummaryRow
                label="Desconto Pix (5%)"
                value={`− ${formatPrice(totals.px)}`}
                accent
              />
            )}
            <SummaryRow
              label="Frete"
              value={
                totals.fr === 0 && items.length ? "Grátis" : formatPrice(totals.fr)
              }
            />
          </div>

          <div className="mt-3 flex items-baseline justify-between border-t border-black2 pt-3">
            <span className="text-sm text-white1">Total</span>
            <span className="text-[28px] font-bold text-green1">
              {formatPrice(totals.tot)}
            </span>
          </div>
          <p className="mt-1 text-right text-[13px] text-white1/60">
            {parcelNote}
          </p>

          <button
            type="button"
            onClick={finalize}
            className="btn mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-green2 hover:bg-green3 hover:text-black"
          >
            <Icon name="lock" size={16} /> {ctaLabel}
          </button>

          {done && (
            <p
              className={`mt-2 text-[13px] ${
                done.kind === "ok" ? "text-green1" : "text-red1"
              }`}
            >
              {done.text}
            </p>
          )}

          <p className="mt-3 flex items-center gap-1.5 text-[13px] text-white1/60">
            <Icon name="shieldCheck" size={15} className="flex-none" />
            Compra protegida e dados criptografados
          </p>
        </aside>
      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white1/70">{label}</span>
      <span className={accent ? "text-green1" : "text-white1"}>{value}</span>
    </div>
  );
}
