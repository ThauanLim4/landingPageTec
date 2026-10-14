export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

// Agrupamento heurístico das características por palavras-chave do rótulo.
// O que não casar cai em "Geral".
const GROUP_KEYWORDS: { title: string; re: RegExp }[] = [
  {
    title: "Desempenho",
    re: /(clock|mhz|ghz|tdp|pot[êe]ncia|potencia|n[úu]cleo|nucleo|thread|cache|velocidade|taxa|resolu|resposta|capacidade|leitura|escrita|frequ|imped|sensibil|dpi|\bhz\b|watt|desempenho|rotaç)/i,
  },
  {
    title: "Físico",
    re: /(peso|dimens|altura|largura|profundidade|comprimento|\bcor\b|material|formato|tamanho|forma\b|espessura|cabo)/i,
  },
];

const GROUP_ORDER = ["Desempenho", "Físico", "Geral"];

function classify(label: string): string {
  for (const group of GROUP_KEYWORDS) {
    if (group.re.test(label)) return group.title;
  }
  return "Geral";
}

export function parseSpec(raw: string): SpecRow | null {
  const text = raw.trim();
  if (!text) return null;

  const idx = text.indexOf(":");
  if (idx === -1) return { label: "", value: text };

  const label = text.slice(0, idx).trim();
  const value = text.slice(idx + 1).trim();
  return { label, value };
}

export function groupSpecs(characteristics: string[]): SpecGroup[] {
  const buckets = new Map<string, SpecRow[]>();
  for (const title of GROUP_ORDER) buckets.set(title, []);

  for (const raw of characteristics) {
    const row = parseSpec(raw);
    if (!row) continue;
    const group = classify(row.label || row.value);
    buckets.get(group)!.push(row);
  }

  return GROUP_ORDER.map((title) => ({ title, rows: buckets.get(title)! })).filter(
    (group) => group.rows.length > 0
  );
}
