/* ============================================================
   cover.ts — gerador de capas procedurais do ZarasZine.
   hash(título) → RNG semeado → SVG determinístico na paleta.
   Roda em BUILD (zero JS no cliente). Mesma seed = mesma capa.
   ============================================================ */

// Paleta espelha tokens.css. Mantida aqui como constante porque o
// SVG é gerado em JS no build; se um token mudar, mude os dois (A2).
const PAL = {
  fundo: '#241811',
  bistre: '#3D2B1F',
  cafe: '#1A100B',
  ouro: '#D9A24B',
  fogo: '#FFB627',
  pt: '#E08D3C',
  moss: '#4A5D23',
  mossC: '#93A757',
  papel: '#FAD6A5',
} as const;

/** FNV-1a — string → uint32 estável. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — PRNG determinístico a partir de uma seed uint32. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 600;
const H = 750;

/**
 * Gera o SVG de uma capa a partir de uma seed (o título do post).
 * Determinístico: a mesma seed sempre produz o mesmo SVG.
 */
export function coverSvg(seed: string): { svg: string; papel: string; tintaTitulo: string } {
  const r = mulberry32(hash(seed));
  const pick = <T>(arr: readonly T[]): T => arr[Math.floor(r() * arr.length)];

  const papeis = [PAL.bistre, PAL.cafe, PAL.moss, PAL.papel];
  const papel = pick(papeis);
  const tintas = ([PAL.ouro, PAL.fogo, PAL.pt, PAL.mossC, PAL.papel] as const).filter(
    (c) => c !== papel,
  );

  const parts: string[] = [];

  // fundo
  parts.push(`<rect width="${W}" height="${H}" fill="${papel}"/>`);

  // 2–3 formas de tinta
  const nShapes = 2 + Math.floor(r() * 2);
  for (let i = 0; i < nShapes; i++) {
    const ink = pick(tintas);
    const kind = Math.floor(r() * 3);
    const op = (0.82 + r() * 0.15).toFixed(2);
    if (kind === 0) {
      // arco/círculo
      const cx = (r() * W).toFixed(1);
      const cy = (r() * H * 0.72).toFixed(1);
      const rad = (90 + r() * 170).toFixed(1);
      parts.push(`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${ink}" opacity="${op}"/>`);
    } else if (kind === 1) {
      // barra rotacionada
      const cy = (r() * H).toFixed(1);
      const hgt = (50 + r() * 90).toFixed(1);
      const rot = ((r() - 0.5) * 44).toFixed(1);
      parts.push(
        `<g transform="translate(${W / 2} ${cy}) rotate(${rot})"><rect x="${-W}" y="${(-Number(hgt) / 2).toFixed(1)}" width="${W * 2}" height="${hgt}" fill="${ink}" opacity="${op}"/></g>`,
      );
    } else {
      // triângulo (recorte)
      const x0 = r() * W;
      const y0 = r() * H * 0.8;
      const p = (dx: number, dy: number) => `${(x0 + dx).toFixed(1)},${(y0 + dy).toFixed(1)}`;
      parts.push(
        `<polygon points="${p(0, 0)} ${p((r() - 0.5) * 520, (r() - 0.5) * 520)} ${p((r() - 0.5) * 520, (r() - 0.5) * 520)}" fill="${ink}" opacity="${op}"/>`,
      );
    }
  }

  // meio-tom (grade de pontos que crescem)
  const dotInk = pick(tintas);
  const hx = r() * W * 0.55;
  const hy = r() * H * 0.55;
  const dots: string[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 12; col++) {
      const rr = ((row % 3) + 1) * 1.5;
      dots.push(`<circle cx="${(hx + col * 15).toFixed(1)}" cy="${(hy + row * 15).toFixed(1)}" r="${rr}"/>`);
    }
  }
  parts.push(`<g fill="${dotInk}" opacity="0.9">${dots.join('')}</g>`);

  // fita rasgada
  const fx = (r() * W).toFixed(1);
  const fy = (r() * H).toFixed(1);
  const frot = ((r() - 0.5) * 28).toFixed(1);
  parts.push(
    `<g transform="translate(${fx} ${fy}) rotate(${frot})" opacity="0.7"><rect x="-72" y="-16" width="144" height="32" fill="${PAL.papel}"/></g>`,
  );

  // grão + moldura
  const grainSeed = hash(seed) % 100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="presentation">
<defs><filter id="g${grainSeed}"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${grainSeed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>
${parts.join('\n')}
<rect width="${W}" height="${H}" filter="url(#g${grainSeed})" opacity="0.09"/>
<rect x="5" y="5" width="${W - 10}" height="${H - 10}" fill="none" stroke="${PAL.cafe}" stroke-opacity="0.5" stroke-width="10"/>
</svg>`;

  // título legível: café sobre papel claro, papel sobre o resto
  const tintaTitulo = papel === PAL.papel ? PAL.cafe : PAL.papel;
  return { svg, papel, tintaTitulo };
}
