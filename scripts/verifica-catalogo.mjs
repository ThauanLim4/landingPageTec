import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(root, "src", "lib", "products-data.ts");
const publicDir = path.join(root, "public");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));

const src = readFileSync(dataFile, "utf8");
const cleaned = src
  .replace(/export interface[\s\S]*?\n}\n/g, "")
  .replace(/export const/g, "const")
  .replace(/^const (\w+)\s*:\s*[^=]+=/m, "const $1 =")
  .concat("\nglobalThis.__out = { CATEGORY_META, PRODUCTS };");

const ctx = vm.createContext({});
vm.runInContext(cleaned, ctx);
const { CATEGORY_META, PRODUCTS } = ctx.__out;

function walk(dir, base = "") {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else out.push(rel.replaceAll("\\", "/"));
  }
  return out;
}

const imgProductsDir = path.join(publicDir, "imgProducts");
const actualFiles = new Set(walk(imgProductsDir, "imgProducts"));

function statusImg(rel) {
  if (actualFiles.has(rel)) return "OK";
  if ([...actualFiles].some((f) => f.toLowerCase() === rel.toLowerCase())) return "CASE";
  return "MISSING";
}

const results = [];
let passCount = 0;
let failCount = 0;
const warnings = [];

for (let i = 0; i < CATEGORY_META.length; i++) {
  const meta = CATEGORY_META[i];
  const products = PRODUCTS[i] ?? [];
  const seenIds = new Set();

  if (products.length === 0) {
    warnings.push(`Categoria "${meta.title}": nenhum produto cadastrado.`);
  }

  for (const p of products) {
    const problems = [];

    if (!p.name || !p.name.trim()) problems.push("nome vazio");
    if (typeof p.id !== "number") problems.push("id inválido");
    else if (seenIds.has(p.id)) problems.push(`id duplicado na categoria (${p.id})`);
    else seenIds.add(p.id);

    if (typeof p.price !== "number" || !Number.isFinite(p.price) || p.price <= 0)
      problems.push(`preço inválido (${p.price})`);

    if (!p.characteristics || p.characteristics.trim().length < 30)
      problems.push("características vazias/curtas");

    const rel = (p.img ?? "").replace(/^\//, "");
    const imgStatus = p.img ? statusImg(rel) : "MISSING";
    if (imgStatus === "MISSING") problems.push(`imagem não encontrada: ${p.img}`);
    if (imgStatus === "CASE") problems.push(`imagem com diferença de maiúsc/minúsc: ${p.img}`);
    if (!p.img) problems.push("campo img ausente");

    results.push({
      categoria: meta.title,
      id: p.id,
      nome: p.name,
      preco: p.price,
      img: p.img,
      imgStatus,
      charsLen: p.characteristics?.length ?? 0,
      problems,
    });
  }
}

if (CATEGORY_META.length !== PRODUCTS.length)
  warnings.push(`Categorias (${CATEGORY_META.length}) x arrays de produtos (${PRODUCTS.length}) divergem.`);

const flatIds = [];
for (const arr of PRODUCTS) for (const p of arr) flatIds.push(p.id);
const dupIds = [...new Set(flatIds.filter((id, idx) => flatIds.indexOf(id) !== idx))];
if (dupIds.length) warnings.push(`ids repetidos no catálogo plano (getAllProducts): ${[...new Set(dupIds)].join(", ")}`);

const referenced = new Set();
for (const r of results) if (r.img) referenced.add(r.img.replace(/^\//, ""));
const orphans = [...actualFiles].filter((f) => !referenced.has(f));
if (orphans.length) warnings.push(`imagens órfãs em public/imgProducts: ${orphans.join(", ")}`);

for (const r of results) {
  if (r.problems.length) failCount++;
  else passCount++;
}

let md = `# Relatório de Testes do Catálogo Local\n`;
md += `\nData: ${new Date().toISOString()}\n`;
md += `Fonte de dados: \`src/lib/products-data.ts\`\n`;
md += `Imagens esperadas em: \`public/imgProducts/\`\n\n`;
md += `## Resumo\n\n`;
md += `- Categorias verificadas: ${CATEGORY_META.length}\n`;
md += `- Produtos verificados: ${results.length}\n`;
md += `- **PASS: ${passCount}** | **FALHAS: ${failCount}**\n`;

md += `\n## Situação por produto\n\n`;
for (const cat of CATEGORY_META) {
  const deps = results.filter((r) => r.categoria === cat.title);
  md += `### ${cat.title}\n\n`;
  md += `| ID | Produto | Preço | Imagem | Caract. | Status |\n`;
  md += `|----|---------|-------|--------|---------|--------|\n`;
  for (const r of deps) {
    const status = r.problems.length ? `FALHOU: ${r.problems.join("; ")}` : "OK";
    const img = r.imgStatus === "OK" ? "OK" : r.imgStatus === "CASE" ? "OK*" : "FALTANDO";
    md += `| ${r.id} | ${r.nome.replaceAll("|", "/")} | R$ ${r.preco.toFixed(2).replace(".", ",")} | ${img} | ${r.charsLen} chars | ${status} |\n`;
  }
  md += `\n`;
}

if (warnings.length) {
  md += `## Avisos\n\n`;
  for (const w of warnings) md += `- ${w}\n`;
}
md += `\n*OK* = arquivo existe mas a referência difere apenas no uso de maiúsculas/minúsculas (pode quebrar em deploy Linux/Vercel).\n`;

writeFileSync(path.join(scriptDir, "relatorio-catalogo.md"), md, "utf8");

const counts = { OK: 0, CASE: 0, MISSING: 0 };
for (const r of results) counts[r.imgStatus]++;

console.log("=== FOlHA DE TESTES DO CATÁLOGO LOCAL ===\n");
console.log(`Categorias: ${CATEGORY_META.length} | Produtos: ${results.length}`);
console.log(`PASS: ${passCount} | FALHAS: ${failCount}`);
console.log(`Imagens: ${counts.OK} OK, ${counts.CASE} com case diferente, ${counts.MISSING} faltando\n`);
if (failCount) {
  console.log("Produtos com falha:");
  for (const r of results) if (r.problems.length) console.log(`  - [${r.categoria}] ${r.nome} -> ${r.problems.join("; ")}`);
}
if (warnings.length) {
  console.log("Avisos:");
  for (const w of warnings) console.log(`  ! ${w}`);
}
console.log(`\nRelatório completo salvo em: scripts/relatorio-catalogo.md`);