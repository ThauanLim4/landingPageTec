import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(root, "src", "lib", "products-data.ts");
const dbDir = process.env.OPENDB_DIR || path.join(root, "..", "..", "..", "AppData", "Local", "Temp", "opencode", "buildcores-open-db", "open-db");

const src = readFileSync(dataFile, "utf8");
const cleaned = src
  .replace(/export interface[\s\S]*?\n}\n/g, "")
  .replace(/export const/g, "const")
  .replace(/^const (\w+)\s*:\s*[^=]+=/m, "const $1 =")
  .concat("\nglobalThis.__out = { CATEGORY_META, PRODUCTS };");

const ctx = vm.createContext({});
vm.runInContext(cleaned, ctx);
const { CATEGORY_META, PRODUCTS } = ctx.__out;

const dbExists = existsSync(dbDir);
if (!dbExists) {
  console.error("Pasta do BuildCores OpenDB não encontrada:", dbDir);
  process.exit(1);
}

function loadDb(category) {
  const catPath = path.join(dbDir, category);
  if (!existsSync(catPath)) return [];
  const out = [];
  for (const f of readdirSync(catPath)) {
    if (!f.endsWith(".json")) continue;
    try {
      const j = JSON.parse(readFileSync(path.join(catPath, f), "utf8"));
      out.push({
        id: j.opendb_id,
        metadata: j.metadata ?? {},
        data: j,
      });
    } catch {
      /* ignora arquivo inválido */
    }
  }
  return out;
}

function normalize(s) {
  return (s ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function scoreEntry(entry, terms) {
  const name = normalize(entry.metadata.name);
  const mfr = normalize(entry.metadata.manufacturer);
  const series = normalize(entry.metadata.series);
  const variant = normalize(entry.metadata.variant);
  const parts = (entry.metadata.part_numbers ?? []).map(normalize);
  let score = 0;
  for (const t of terms) {
    const tok = normalize(t);
    if (parts.some((p) => p === tok || p.includes(tok))) score += 3;
    if (name.includes(tok)) score += 2;
    if (series.includes(tok)) score += 1;
    if (variant.includes(tok)) score += 1;
    if (mfr.includes(tok)) score += 0.5;
  }
  return score;
}

function bestMatch(db, terms, excluir = []) {
  let best = null;
  for (const e of db) {
    if (excluir.length) {
      const hay = normalize(
        [e.metadata.name, e.metadata.series, e.metadata.variant, ...(e.metadata.part_numbers ?? [])].join(" ")
      );
      if (excluir.some((x) => hay.includes(normalize(x)))) continue;
    }
    const s = scoreEntry(e, terms);
    if (s > 0 && (!best || s > best.score)) best = { ...e, score: s };
  }
  return best;
}

const LIST = (v) => {
  if (v == null) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "object") return [Object.entries(v).map(([k, val]) => `${k}: ${val}`).join(", ")];
  return String(v).split(",");
};
const STR = (v) => LIST(v).join(" | ");
const IS_NONE = (v) => v == null || v === "" || v === 0 || v === "0" || /^(none|null|n\/a)$/i.test(String(v).trim());
const NUM = (v) => (typeof v === "number" && v > 0 ? v : null);
const NAMES = {
  pcie_6_pin: "PCIe 6 pin",
  pcie_8_pin: "PCIe 8 pin",
  pcie_12VHPWR: "12VHPWR",
  pcie_12V_2x6: "12V 2x6",
  atx_24_pin: "ATX 24 pin",
  eps_8_pin: "EPS 8 pin",
  pcie_6_plus_2_pin: "PCIe 6+2 pin",
  sata: "SATA",
  molex_4_pin: "Molex 4 pin",
  floppy_4_pin: "Floppy 4 pin",
  hdmi_2_1: "HDMI 2.1",
  hdmi_2_0: "HDMI 2.0",
  displayport_2_1: "DisplayPort 2.1",
  displayport_1_4a: "DisplayPort 1.4a",
  displayport_1_4: "DisplayPort 1.4",
  displayport_2_1a: "DisplayPort 2.1a",
  dvi_d: "DVI-D",
  dvi_i: "DVI-I",
  vga: "VGA",
  audio_jack: "Áudio Jack",
  usb_c: "USB-C",
};
function countsToComponents(obj) {
  return Object.entries(obj)
    .filter(([k, v]) => Number(v) > 0)
    .map(([k, v]) => `${v}x ${NAMES[k] ?? k.replace(/_/g, " ")}`);
}
function skipIfPresent(local, label) {
  return local.some((line) => normalize(line).includes(normalize(label)));
}

const FORMATTERS = {
  GPU(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Fabricante do chipset", d.chipset_manufacturer);
    if (LIST(d.video_outputs_hdmi).length || d.video_outputs) {
      const c = countsToComponents(d.video_outputs ?? {});
      if (c.length) add("Saídas de vídeo", c.join(" | "));
    }
    if (d.power_connectors) {
      const c = countsToComponents(d.power_connectors);
      if (c.length) add("Conectores de energia", c.join(" | "));
    }
    add("Memória de vídeo", NUM(d.memory) != null ? `${d.memory} GB` : null);
    add("Tipo de memória", d.memory_type);
    add("Clock base da GPU", NUM(d.core_base_clock) != null ? `${d.core_base_clock} MHz` : null);
    add("Clock boost da GPU", NUM(d.core_boost_clock) != null ? `${d.core_boost_clock} MHz` : null);
    add("Clock da memória", NUM(d.effective_memory_clock) != null ? `${d.effective_memory_clock} MHz` : null);
    add("Bus de memória", NUM(d.memory_bus) != null ? `${d.memory_bus} bits` : null);
    add("TDP", NUM(d.tdp) != null ? `${d.tdp} W` : null);
    add("Interface", d.interface);
    return out;
  },
  CPU(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Soquete", d.socket);
    add("Núcleos", NUM(d.cores?.total) != null ? String(d.cores.total) : null);
    add("Threads", NUM(d.cores?.threads) != null ? String(d.cores.threads) : null);
    add("Clock base", NUM(d.clocks?.performance?.base) != null ? `${d.clocks.performance.base} GHz` : null);
    add("Clock boost", NUM(d.clocks?.performance?.boost) != null ? `${d.clocks.performance.boost} GHz` : null);
    add("Cache L2", NUM(d.cache?.l2) != null ? `${d.cache.l2} MB` : null);
    add("Cache L3", NUM(d.cache?.l3) != null ? `${d.cache.l3} MB` : null);
    add("TDP", NUM(d.specifications?.tdp) != null ? `${d.specifications.tdp} W` : null);
    if (d.specifications?.memory?.types?.length) add("Memórias suportadas", d.specifications.memory.types.join(", "));
    add("Canais de memória", NUM(d.specifications?.memory?.channels) != null ? String(d.specifications.memory.channels) : null);
    const ig = d.specifications?.integratedGraphics?.model;
    if (ig && ig !== "None") add("Vídeo integrado", String(ig));
    add("Litografia", d.specifications?.lithography);
    add("Embalagem", d.specifications?.packaging);
    return out;
  },
  Motherboard(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Soquete", d.socket);
    add("Formato", d.form_factor);
    add("Chipset", d.chipset);
    add("Memória máxima", NUM(d.memory?.max) != null ? `${d.memory.max} GB` : null);
    add("Slots de memória", NUM(d.memory?.slots) != null ? String(d.memory.slots) : null);
    if (d.m2_slots?.length) add("Slots M.2", `${d.m2_slots.length} (${d.m2_slots.map((m) => `${m.interface ?? ""} ${m.size ?? ""}`.trim()).join("; ")})`);
    if (d.onboard_ethernet) {
      const e = d.onboard_ethernet;
      const txt = [e.speed, e.controller].filter((x) => !IS_NONE(x)).join(" ");
      add("Ethernet", txt || null);
    }
    add("Rede sem fio", d.wireless_networking);
    if (d.audio) {
      const a = d.audio;
      const txt = [a.chipset, a.channels].filter((x) => !IS_NONE(x)).join(" ");
      add("Áudio", txt || null);
    }
    if (d.back_panel_ports?.length) add("Portas traseiras", d.back_panel_ports.join(" | "));
    return out;
  },
  Storage(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Capacidade", NUM(d.capacity) != null ? `${d.capacity} GB` : null);
    add("Tipo", d.storage_type);
    add("Formato", d.form_factor);
    add("Interface", d.interface);
    add("NVMe", d.nvme != null ? (d.nvme ? "Sim" : "Não") : null);
    return out;
  },
  PSU(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Potência", NUM(d.wattage) != null ? `${d.wattage} W` : null);
    add("Formato", d.form_factor);
    add("Eficiência", d.efficiency_rating);
    add("Modular", d.modular);
    if (d.connectors) {
      const c = countsToComponents(d.connectors);
      if (c.length) add("Conectores", c.join(" | "));
    }
    return out;
  },
  Monitor(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Tamanho da tela", NUM(d.screen_size) != null ? `${d.screen_size} polegadas` : null);
    if (d.resolution?.horizontalRes && d.resolution?.verticalRes) add("Resolução", `${d.resolution.horizontalRes} x ${d.resolution.verticalRes}`);
    add("Taxa de atualização", NUM(d.refresh_rate) != null ? `${d.refresh_rate} Hz` : null);
    add("Painel", d.panel_type);
    add("Tempo de resposta", NUM(d.response_time) != null ? `${d.response_time} ms` : null);
    add("Proporção", d.aspect_ratio);
    add("Conectores", d.connectors);
    add("Brilho", NUM(d.max_brightness) != null ? `${d.max_brightness} cd/m²` : null);
    add("HDR", d.hdr);
    add("Adaptive Sync", d.adaptive_sync);
    add("Ângulo de visão", d.viewing_angle);
    return out;
  },
  PCCase(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Formato", d.form_factor);
    add("Placa-mãe compatível", LIST(d.supported_motherboard_form_factors).length ? d.supported_motherboard_form_factors.join(", ") : null);
    add("Lateral de vidro", d.has_transparent_side_panel != null ? (d.has_transparent_side_panel ? "Sim" : "Não") : null);
    add("VGA máxima", NUM(d.max_video_card_length) != null ? `${d.max_video_card_length} mm` : null);
    add("Cooler máximo", NUM(d.max_cpu_cooler_height) != null ? `${d.max_cpu_cooler_height} mm` : null);
    add("Baias 3,5\"", NUM(d.internal_3_5_bays) != null ? String(d.internal_3_5_bays) : null);
    add("Baias 2,5\"", NUM(d.internal_2_5_bays) != null ? String(d.internal_2_5_bays) : null);
    add("Slots de expansão", NUM(d.expansion_slots) != null ? String(d.expansion_slots) : null);
    if (d.dimensions_mm) add("Dimensões (LxPxA)", `${d.dimensions_mm.width} x ${d.dimensions_mm.depth} x ${d.dimensions_mm.height} mm`);
    add("Peso", NUM(d.weight) != null ? `${d.weight} g` : null);
    return out;
  },
  Keyboard(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Switch", d.switch);
    add("Tipo de switch", d.switch_type);
    add("Tamanho", d.size);
    add("Iluminação", d.backlighting);
    add("Conectividade", LIST(d.connectivity).length ? d.connectivity.join(", ") : null);
    return out;
  },
  Mouse(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Conectividade", LIST(d.connectivity).length ? d.connectivity.join(", ") : null);
    add("Tipos de pegada", LIST(d.grip_types).length ? d.grip_types.join(", ") : null);
    return out;
  },
  Headphones(entry, localLines) {
    const d = entry.data;
    const out = [];
    const add = (label, value) => {
      if (IS_NONE(value)) return;
      if (skipIfPresent(localLines, label)) return;
      out.push(`${label}: ${value}`);
    };
    add("Conectividade", LIST(d.connection_types).length ? d.connection_types.join(", ") : null);
    add("Casos de uso", LIST(d.use_cases).length ? d.use_cases.join(", ") : null);
    add("Plataformas", LIST(d.platforms).length ? d.platforms.join(", ") : null);
    return out;
  },
  Speaker() {
    return [];
  },
};

const BUSCAS = [
  /* GPU */
  { cat: 0, id: 1, dir: "GPU", termos: ["5500 XT", "RX 5500", "5500XT"] },
  { cat: 0, id: 2, dir: "GPU", termos: ["GTX 1650"] },
  { cat: 0, id: 3, dir: "GPU", termos: ["1660 6GB", "GTX 1660"], excluir: ["1660 ti"] },
  /* CPU */
  { cat: 1, id: 1, dir: "CPU", termos: ["12400F"] },
  { cat: 1, id: 2, dir: "CPU", termos: ["5600G"] },
  { cat: 1, id: 3, dir: "CPU", termos: ["5700X"], excluir: ["5700x3d", "x3d"] },
  /* Placa mãe */
  { cat: 2, id: 1, dir: "Motherboard", termos: ["A520M S2H", "A520M"] },
  { cat: 2, id: 2, dir: "Motherboard", termos: ["B450M DS3H", "DS3H V2"], excluir: ["atx"] },
  { cat: 2, id: 3, dir: "Motherboard", termos: ["B550M AORUS ELITE", "AORUS ELITE"], excluir: [" ax", "-ax", "ax "] },
  /* Armazenamento */
  { cat: 3, id: 1, dir: "Storage", termos: ["BarraCuda 1TB", "BarraCuda Compute 1TB", "7200RPM", "7200"], excluir: ["ssd", "nvme", "nvm", "m.2", "pcie", "2tb", "3tb", "4tb", "5tb", "6tb", "8tb", "10tb", "5400rpm", "nv7200"] },
  { cat: 3, id: 2, dir: "Storage", termos: ["Kingston NV2", "NV2 500", "NV2"], excluir: ["netac", "nv2000"] },
  { cat: 3, id: 3, dir: "Storage", termos: ["SA400S37", "A400 480", "480GB"], excluir: ["960"] },
  /* Gabinete */
  { cat: 4, id: 1, dir: "PCCase", termos: ["HX300M", "HX300"] },
  { cat: 4, id: 2, dir: "PCCase", termos: ["F02"] },
  { cat: 4, id: 3, dir: "PCCase", termos: ["Wideload"] },
  /* Fonte */
  { cat: 5, id: 1, dir: "PSU", termos: ["CV750"] },
  { cat: 5, id: 2, dir: "PSU", termos: ["RGPS", "Redragon RGPS"] },
  { cat: 5, id: 3, dir: "PSU", termos: ["CV650"] },
  /* Monitor */
  { cat: 6, id: 1, dir: "Monitor", termos: ["24B1XHM", "24B1X"] },
  { cat: 6, id: 2, dir: "Monitor", termos: ["27G2"] },
  { cat: 6, id: 3, dir: "Monitor", termos: ["T350"] },
  /* Som */
  { cat: 7, id: 1, dir: "Speaker", termos: ["GS560", "Anvil"] },
  { cat: 7, id: 2, dir: "Speaker", termos: ["GS560", "Adiemus"] },
  { cat: 7, id: 3, dir: "Speaker", termos: ["SP-301"] },
  /* Periféricos */
  { cat: 8, id: 1, dir: "Keyboard", termos: ["K617", "FIZZ"], excluir: ["he ", "-he", "magnetic", "hall effect"] },
  { cat: 8, id: 2, dir: "Mouse", termos: ["G203"] },
  { cat: 8, id: 3, dir: "Headphones", termos: ["H2002", "H2002D"] },
];

const cache = new Map();
function getDb(dir) {
  if (!cache.has(dir)) {
    if (dir) cache.set(dir, loadDb(dir));
    else cache.set(dir, []);
  }
  return cache.get(dir);
}

const resultados = [];
let matched = 0;
let noMatch = 0;

for (const b of BUSCAS) {
  const product = PRODUCTS[b.cat]?.find((p) => p.id === b.id);
  if (!product) continue;
  const db = getDb(b.dir);
  const hit = bestMatch(db, b.termos, b.excluir);
  let novas = [];
  let name = null;
  let dbId = null;
  if (hit) {
    const fmt = FORMATTERS[b.dir] ?? (() => []);
    const localChars = (
      Array.isArray(product.characteristics)
        ? product.characteristics
        : [String(product.characteristics ?? "")]
    )
      .flatMap((s) => String(s).split("<br>"))
      .map((s) => s.replace(/<[^>]+>/g, "").trim())
      .filter(Boolean);
    novas = fmt(hit, localChars);
    matched++;
    name = hit.metadata.name;
    dbId = hit.id;
  } else {
    noMatch++;
  }
  resultados.push({
    categoria: CATEGORY_META[b.cat].title,
    produto: product.name,
    dirBusca: b.dir,
    termos: b.termos,
    match: name,
    matchId: dbId,
    novasChars: novas,
  });
}

const flat = [];
for (let i = 0; i < CATEGORY_META.length; i++)
  for (const p of PRODUCTS[i] ?? []) flat.push({ categoria: CATEGORY_META[i].title, ...p });

let md = `# Enriquecimento de Specs via BuildCores OpenDB\n\n`;
md += `Data: ${new Date().toISOString()}\n`;
md += `Fonte: \`github.com/buildcores/buildcores-open-db\` (clone local em \`${dbDir}\`)\n\n`;
md += `## Resumo\n\n- Produtos processados: ${resultados.length}\n- Com correspondência no BuildCores: **${matched}**\n- Sem correspondência (mantidos specs locais): **${noMatch}**\n\n`;

for (const r of resultados) {
  md += `### ${r.categoria} — ${r.produto}\n\n`;
  if (!r.match) {
    md += `> **Sem correspondência** (buscou: ${r.termos.map((t) => `\`${t}\``).join(", ")}). Manter specs atuais.\n\n`;
    continue;
  }
  md += `Correspondência: \`${r.match}\` (id \`${r.matchId}\`)\n\n`;
  if (!r.novasChars.length) {
    md += `Nenhuma nova linha (dados já cobertos pelas características locais).\n\n`;
    continue;
  }
  md += `Linhas sugeridas para adicionar:\n\n`;
  for (const l of r.novasChars) md += `- ${l}\n`;
  md += `\n`;
}

writeFileSync(path.join(scriptDir, "relatorio-specs.md"), md, "utf8");
writeFileSync(path.join(scriptDir, "specs-encontrados.json"), JSON.stringify(resultados, null, 2), "utf8");

console.log("=== ENRIQUECIMENTO DE SPECS (BuildCores OpenDB) ===\n");
console.log(`Produtos: ${resultados.length} | com match: ${matched} | sem match: ${noMatch}\n`);
for (const r of resultados) {
  console.log(`${r.categoria} | ${r.produto.slice(0, 55)} → ${r.match ? "MATCH: " + r.match.slice(0, 60) + (r.novasChars.length ? ` (${r.novasChars.length} novas)` : " (sem novas)") : "sem correspondência"}`);
}
console.log(`\nRelatório: scripts/relatorio-specs.md`);
console.log(`JSON:      scripts/specs-encontrados.json`);