/* ===================== SECOND CHANCE v2 — cartoon art (all SVG, no image files) ===================== */
const PAL = {
  ink: "#1B1650", line: "#2A2470", violet: "#8B82E8", lav: "#C9C2FF", white: "#FFFFFF",
  sun: "#FFC83D", mars: "#F26B3A", mint: "#3DDBA4", sky: "#4FC3F7", pink: "#FF6FA5", red: "#FF5A5F",
  gold: "#F4B740", gold2: "#D9901F", panel: "#3D7BF2", panel2: "#2A5BD0", steel: "#DCE3F5", steel2: "#9AA6C8"
};
let _gid = 0;

/* ---------- Orbi, the assistant ---------- */
function orbiSVG(expr) {
  const id = "ob" + (++_gid);
  const eyeC = PAL.mint;
  let eyes = "", mouth = "", extra = "";
  switch (expr) {
    case "happy":
      eyes = `<path d="M38 62 q8 -10 16 0" stroke="${eyeC}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M66 62 q8 -10 16 0" stroke="${eyeC}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      mouth = `<path class="mouth" d="M50 71 q10 9 20 0" stroke="${eyeC}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      break;
    case "shocked":
      eyes = `<circle cx="46" cy="60" r="8" fill="none" stroke="${eyeC}" stroke-width="3.5"/><circle cx="46" cy="60" r="3" fill="${eyeC}"/><circle cx="74" cy="60" r="8" fill="none" stroke="${eyeC}" stroke-width="3.5"/><circle cx="74" cy="60" r="3" fill="${eyeC}"/>`;
      mouth = `<ellipse class="mouth" cx="60" cy="75" rx="5" ry="6" fill="${eyeC}"/>`;
      break;
    case "worried":
      eyes = `<circle cx="46" cy="61" r="5.5" fill="${eyeC}"/><circle cx="74" cy="61" r="5.5" fill="${eyeC}"/><path d="M38 52 l13 -4" stroke="${eyeC}" stroke-width="3" stroke-linecap="round"/><path d="M82 52 l-13 -4" stroke="${eyeC}" stroke-width="3" stroke-linecap="round"/>`;
      mouth = `<path class="mouth" d="M51 76 q9 -6 18 0" stroke="${eyeC}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      break;
    case "think":
      eyes = `<circle cx="46" cy="60" r="6" fill="${eyeC}"/><path d="M68 60 h12" stroke="${eyeC}" stroke-width="4" stroke-linecap="round"/>`;
      mouth = `<path class="mouth" d="M53 74 h14" stroke="${eyeC}" stroke-width="3.5" stroke-linecap="round"/>`;
      extra = `<circle cx="104" cy="22" r="4" fill="${PAL.lav}"/><circle cx="112" cy="12" r="6" fill="${PAL.lav}"/>`;
      break;
    case "party":
      eyes = `<path d="M38 62 q8 -10 16 0" stroke="${PAL.sun}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M66 62 q8 -10 16 0" stroke="${PAL.sun}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      mouth = `<path class="mouth" d="M48 70 q12 14 24 0 z" fill="${eyeC}"/>`;
      extra = `<path d="M10 20 l4 8 M22 8 l-2 9 M108 30 l-6 5 M98 8 l0 9" stroke="${PAL.sun}" stroke-width="3" stroke-linecap="round"/>`;
      break;
    default:
      eyes = `<circle cx="46" cy="60" r="6.5" fill="${eyeC}"/><circle cx="74" cy="60" r="6.5" fill="${eyeC}"/><circle cx="48" cy="57.5" r="2" fill="#fff"/><circle cx="76" cy="57.5" r="2" fill="#fff"/>`;
      mouth = `<path class="mouth" d="M51 72 q9 7 18 0" stroke="${eyeC}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 120 132" class="orbi-svg" aria-hidden="true">
  <defs><radialGradient id="${id}" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${PAL.lav}"/></radialGradient></defs>
  <g class="hover">${extra}
    <line x1="60" y1="24" x2="60" y2="10" stroke="${PAL.violet}" stroke-width="3.5" stroke-linecap="round"/>
    <circle class="tip" cx="60" cy="8" r="5.5" fill="${PAL.sun}"/>
    <path class="arm-l" d="M19 72 q-14 4 -12 20" stroke="${PAL.violet}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path class="arm-r" d="M101 72 q14 4 12 20" stroke="${PAL.violet}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="68" r="44" fill="url(#${id})" stroke="${PAL.violet}" stroke-width="3"/>
    <rect x="27" y="44" width="66" height="44" rx="20" fill="${PAL.ink}"/>
    ${eyes}${mouth}
    <circle cx="33" cy="84" r="4.5" fill="${PAL.pink}" opacity=".55"/><circle cx="87" cy="84" r="4.5" fill="${PAL.pink}" opacity=".55"/>
    <path class="flame" d="M51 111 q9 20 18 0 z" fill="${PAL.sun}"/>
  </g></svg>`;
}

/* ---------- icons for spacecraft parts (64×64) ---------- */
const SV = (inner, vb) => `<svg viewBox="${vb || "0 0 64 64"}" aria-hidden="true">${inner}</svg>`;
function panelRect(x, y, w, h) {
  let p = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${PAL.panel}" stroke="${PAL.ink}" stroke-width="2"/>`;
  const cols = Math.max(2, Math.round(w / 9)), rows = Math.max(2, Math.round(h / 9));
  for (let i = 1; i < cols; i++) p += `<line x1="${x + w * i / cols}" y1="${y}" x2="${x + w * i / cols}" y2="${y + h}" stroke="${PAL.sky}" stroke-width="1" opacity=".7"/>`;
  for (let j = 1; j < rows; j++) p += `<line x1="${x}" y1="${y + h * j / rows}" x2="${x + w}" y2="${y + h * j / rows}" stroke="${PAL.sky}" stroke-width="1" opacity=".7"/>`;
  return p + `<rect x="${x + 2}" y="${y + 2}" width="${w * 0.35}" height="3" rx="1.5" fill="#fff" opacity=".35"/>`;
}
const box = (x, y, w, h, fill, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r == null ? 6 : r}" fill="${fill}" stroke="${PAL.ink}" stroke-width="2.5"/>`;
const lens = (cx, cy, r, ring) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${ring || PAL.ink}" stroke="${PAL.ink}" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="${PAL.sky}"/><circle cx="${cx - r * 0.25}" cy="${cy - r * 0.25}" r="${r * 0.2}" fill="#fff"/>`;

const ICONS = {
  radiometer: () => SV(box(10, 18, 44, 32, PAL.steel) + lens(32, 34, 10, PAL.steel2) + `<path d="M14 14 h36" stroke="${PAL.ink}" stroke-width="3" stroke-linecap="round"/><path d="M48 24 q6 10 0 20" stroke="${PAL.red}" stroke-width="2.5" fill="none"/>`),
  camera: () => SV(box(10, 22, 44, 28, PAL.pink) + lens(32, 36, 10) + box(16, 16, 12, 8, PAL.pink, 3)),
  radio: () => SV(box(12, 26, 40, 26, PAL.mint) + `<line x1="22" y1="26" x2="16" y2="8" stroke="${PAL.ink}" stroke-width="3" stroke-linecap="round"/><circle cx="16" cy="8" r="3.5" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="2"/><path d="M40 14 q6 4 0 8 M45 10 q10 8 0 16" stroke="${PAL.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="24" cy="39" r="4" fill="${PAL.ink}"/><rect x="32" y="35" width="14" height="3" rx="1.5" fill="${PAL.ink}"/><rect x="32" y="41" width="10" height="3" rx="1.5" fill="${PAL.ink}"/>`),
  bigcam: () => SV(box(6, 20, 52, 34, PAL.steel) + lens(32, 37, 14) + box(14, 12, 14, 9, PAL.steel, 3)),
  spectro: () => SV(box(8, 18, 48, 30, PAL.steel) + `<path d="M18 40 l10 -16 l10 16 z" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/><path d="M38 30 l14 -6 M38 33 l14 0 M38 36 l14 6" stroke-width="3" stroke-linecap="round" stroke="${PAL.red}"/><path d="M38 33 l14 0" stroke="${PAL.mint}" stroke-width="3"/><path d="M38 36 l14 6" stroke="${PAL.sky}" stroke-width="3"/>`),
  spectro2: () => SV(box(12, 22, 40, 26, PAL.steel) + `<path d="M20 42 l9 -14 l9 14 z" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/><path d="M38 33 l12 -4 M38 37 l12 4" stroke="${PAL.red}" stroke-width="3" stroke-linecap="round"/>`),
  ccd: () => { let g = box(8, 8, 48, 48, PAL.ink, 6); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) g += `<rect x="${13 + i * 10}" y="${13 + j * 10}" width="8" height="8" rx="1.5" fill="${(i + j) % 2 ? PAL.sky : PAL.violet}"/>`; return SV(g); },
  ccdhalf: () => { let g = box(8, 8, 48, 48, PAL.ink, 6); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) g += `<rect x="${13 + i * 10}" y="${13 + j * 10}" width="8" height="8" rx="1.5" fill="${j < 2 ? ((i + j) % 2 ? PAL.sky : PAL.violet) : "#3A3478"}"/>`; return SV(g); },
  stopwatch: () => SV(`<circle cx="32" cy="36" r="20" fill="#fff" stroke="${PAL.ink}" stroke-width="3"/><rect x="27" y="8" width="10" height="7" rx="2" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="2"/><path d="M32 36 l0 -12 M32 36 l8 5" stroke="${PAL.ink}" stroke-width="3" stroke-linecap="round"/>`),
  multicam: () => SV(box(8, 20, 48, 32, PAL.steel) + lens(32, 36, 10) + `<rect x="12" y="14" width="8" height="6" fill="${PAL.red}"/><rect x="22" y="14" width="8" height="6" fill="${PAL.mint}"/><rect x="32" y="14" width="8" height="6" fill="${PAL.sky}"/><rect x="42" y="14" width="8" height="6" fill="${PAL.violet}"/>`),
  thermalcam: () => SV(box(8, 20, 48, 32, PAL.steel) + lens(32, 36, 10, PAL.mars) + `<path d="M50 14 q-6 4 -2 8 q-6 -1 -4 -8 q2 -4 6 0 z" fill="${PAL.mars}"/>`),
  hypercam: () => SV(box(8, 14, 48, 40, PAL.steel) + lens(32, 34, 11) + `<path d="M8 50 h48" stroke="url(#rb)" stroke-width="0"/><rect x="12" y="46" width="40" height="4" fill="${PAL.red}"/><rect x="12" y="46" width="30" height="4" fill="${PAL.sun}"/><rect x="12" y="46" width="20" height="4" fill="${PAL.mint}"/><rect x="12" y="46" width="10" height="4" fill="${PAL.sky}"/>`),
  widecam: () => SV(box(14, 24, 36, 24, PAL.pink) + `<ellipse cx="32" cy="36" rx="13" ry="9" fill="${PAL.ink}"/><ellipse cx="32" cy="36" rx="8" ry="5" fill="${PAL.sky}"/>`),
  wing1: () => SV(box(4, 26, 10, 12, PAL.gold) + `<line x1="14" y1="32" x2="20" y2="32" stroke="${PAL.ink}" stroke-width="3"/>` + panelRect(20, 18, 40, 28)),
  wing2: () => SV(panelRect(2, 20, 20, 24) + `<line x1="22" y1="32" x2="25" y2="32" stroke="${PAL.ink}" stroke-width="3"/>` + box(25, 25, 14, 14, PAL.gold) + `<line x1="39" y1="32" x2="42" y2="32" stroke="${PAL.ink}" stroke-width="3"/>` + panelRect(42, 20, 20, 24)),
  array: () => SV(panelRect(6, 12, 52, 40)),
  arraybig: () => SV(panelRect(2, 6, 60, 52)),
  cells: () => SV(box(16, 8, 32, 48, PAL.steel) + panelRect(20, 12, 24, 40)),
  deploy: () => SV(panelRect(2, 18, 18, 28) + box(22, 12, 20, 40, PAL.steel) + panelRect(44, 18, 18, 28)),
  battery: (n) => { n = n || 2; let g = box(14, 12, 36, 46, PAL.mint, 7) + `<rect x="26" y="6" width="12" height="7" rx="2" fill="${PAL.ink}"/>`; for (let i = 0; i < n; i++) g += `<rect x="20" y="${48 - i * 11}" width="24" height="8" rx="2" fill="${PAL.ink}"/>`; return SV(g); },
  chip: () => { let g = box(16, 16, 32, 32, PAL.ink, 5) + `<rect x="24" y="24" width="16" height="16" rx="3" fill="${PAL.violet}"/>`; for (let i = 0; i < 4; i++) g += `<rect x="${19 + i * 7}" y="9" width="3" height="7" fill="${PAL.steel2}"/><rect x="${19 + i * 7}" y="48" width="3" height="7" fill="${PAL.steel2}"/>`; return SV(g); },
  chip2: () => { let g = box(6, 18, 26, 26, PAL.ink, 4) + box(32, 18, 26, 26, PAL.ink, 4) + `<rect x="13" y="25" width="12" height="12" rx="2" fill="${PAL.violet}"/><rect x="39" y="25" width="12" height="12" rx="2" fill="${PAL.mint}"/>`; return SV(g); },
  chipshield: () => SV(`<path d="M32 6 l20 8 v14 c0 14 -9 24 -20 30 c-11 -6 -20 -16 -20 -30 v-14 z" fill="${PAL.mint}" stroke="${PAL.ink}" stroke-width="2.5"/>` + `<rect x="22" y="22" width="20" height="20" rx="3" fill="${PAL.ink}"/><rect x="27" y="27" width="10" height="10" rx="2" fill="${PAL.violet}"/>`),
  tank: (big) => SV(`<rect x="${big ? 12 : 16}" y="8" width="${big ? 40 : 32}" height="38" rx="${big ? 20 : 16}" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M24 46 l-4 12 h24 l-4 -12 z" fill="${PAL.steel2}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M26 58 q6 8 12 0" fill="${PAL.sun}"/>`),
  wheels: (n) => { let g = ""; const pos = n === 6 ? [[16, 20], [32, 20], [48, 20], [16, 44], [32, 44], [48, 44]] : [[20, 20], [44, 20], [20, 44], [44, 44]]; pos.forEach(p => { g += `<circle cx="${p[0]}" cy="${p[1]}" r="${n === 6 ? 7 : 10}" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2.5"/><circle cx="${p[0]}" cy="${p[1]}" r="2.5" fill="${PAL.ink}"/>`; }); return SV(g); },
  wheelsplus: () => SV(ICONS.wheels(4).replace(/<\/?svg[^>]*>/g, "") + `<circle cx="52" cy="10" r="8" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="2"/><path d="M48 10 h8 M52 6 v8" stroke="${PAL.ink}" stroke-width="2.5"/>`),
  magnet: () => SV(`<path d="M14 12 v20 a18 18 0 0 0 36 0 v-20 h-10 v20 a8 8 0 0 1 -16 0 v-20 z" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2.5"/><rect x="14" y="8" width="10" height="8" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2"/><rect x="40" y="8" width="10" height="8" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2"/>`),
  dish: (sz) => { const r = sz === 2 ? 26 : sz === 1 ? 20 : 13; return SV(`<path d="M${32 - r} ${30 - r * 0.2} q${r} ${r * 1.3} ${2 * r} 0 z" fill="#fff" stroke="${PAL.ink}" stroke-width="2.5"/><line x1="32" y1="${30 + r * 0.45}" x2="32" y2="58" stroke="${PAL.ink}" stroke-width="3"/><line x1="32" y1="${30 + r * 0.4}" x2="32" y2="12" stroke="${PAL.ink}" stroke-width="2"/><circle cx="32" cy="11" r="3" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="2"/>`); },
  antenna: () => SV(box(18, 34, 28, 22, PAL.mint) + `<line x1="32" y1="34" x2="32" y2="8" stroke="${PAL.ink}" stroke-width="3"/><path d="M22 14 q10 -8 20 0 M18 8 q14 -10 28 0" stroke="${PAL.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  cube: (u) => { const cols = u === 12 ? 2 : u === 6 ? 2 : 1, rows = u === 12 ? 3 : 3, w = cols * 14, h = rows * 14, x = 32 - w / 2 - 4, y = 32 - h / 2 + 4; let g = `<path d="M${x} ${y} l8 -8 h${w} l-8 8 z" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2"/><path d="M${x + w} ${y} l8 -8 v${h} l-8 8 z" fill="${PAL.steel2}" stroke="${PAL.ink}" stroke-width="2"/>` + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${PAL.panel}" stroke="${PAL.ink}" stroke-width="2"/>`; for (let i = 1; i < cols; i++) g += `<line x1="${x + i * 14}" y1="${y}" x2="${x + i * 14}" y2="${y + h}" stroke="${PAL.ink}" stroke-width="1.5"/>`; for (let j = 1; j < rows; j++) g += `<line x1="${x}" y1="${y + j * 14}" x2="${x + w}" y2="${y + j * 14}" stroke="${PAL.ink}" stroke-width="1.5"/>`; if (u === 12) g += `<text x="56" y="60" font-size="10" font-weight="700" fill="${PAL.ink}">×2</text>`; return SV(g); },
  /* tests & processes */
  tvac: () => SV(`<rect x="10" y="10" width="44" height="44" rx="10" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2.5"/><rect x="26" y="16" width="8" height="26" rx="4" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/><circle cx="30" cy="44" r="7" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2"/><rect x="28" y="26" width="4" height="16" fill="${PAL.red}"/><path d="M46 18 v14 M40 22 l12 6 M52 22 l-12 6" stroke="${PAL.sky}" stroke-width="2.5" stroke-linecap="round"/>`),
  vib: () => SV(box(20, 18, 24, 30, PAL.gold) + `<path d="M10 22 q-4 10 0 20 M6 18 q-6 14 0 28 M54 22 q4 10 0 20 M58 18 q6 14 0 28" stroke="${PAL.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="14" y="50" width="36" height="6" rx="3" fill="${PAL.ink}"/>`),
  iface: () => SV(`<rect x="4" y="22" width="22" height="20" rx="5" fill="${PAL.pink}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M26 27 h8 M26 37 h8" stroke="${PAL.ink}" stroke-width="3" stroke-linecap="round"/><rect x="38" y="22" width="22" height="20" rx="5" fill="${PAL.sky}" stroke="${PAL.ink}" stroke-width="2.5"/><text x="9" y="36" font-size="9" font-weight="800" fill="${PAL.ink}">lbf</text><text x="44" y="36" font-size="10" font-weight="800" fill="${PAL.ink}">N</text>`),
  cal: () => SV(`<circle cx="32" cy="32" r="24" fill="#fff" stroke="${PAL.ink}" stroke-width="2.5"/><circle cx="32" cy="32" r="16" fill="${PAL.red}"/><circle cx="32" cy="32" r="9" fill="#fff"/><circle cx="32" cy="32" r="4" fill="${PAL.red}"/>`),
  fault: () => SV(`<path d="M32 6 l22 8 v14 c0 15 -10 25 -22 31 c-12 -6 -22 -16 -22 -31 v-14 z" fill="${PAL.violet}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M34 16 l-10 18 h9 l-3 14 l12 -20 h-9 z" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="1.5"/>`),
  audit: () => SV(`<rect x="6" y="36" width="34" height="12" rx="3" fill="${PAL.steel2}" stroke="${PAL.ink}" stroke-width="2.5"/><circle cx="38" cy="24" r="13" fill="#fff" fill-opacity=".6" stroke="${PAL.ink}" stroke-width="3"/><path d="M47 33 l10 10" stroke="${PAL.ink}" stroke-width="5" stroke-linecap="round"/><path d="M33 22 l4 4 l7 -8" stroke="${PAL.red}" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  wheeltest: () => SV(`<circle cx="26" cy="34" r="18" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2.5"/><circle cx="26" cy="34" r="5" fill="${PAL.ink}"/><path d="M26 16 v8 M26 44 v8 M8 34 h8 M36 34 h8" stroke="${PAL.ink}" stroke-width="2.5"/><circle cx="48" cy="18" r="11" fill="#fff" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M48 18 v-6 M48 18 h5" stroke="${PAL.ink}" stroke-width="2.5" stroke-linecap="round"/>`),
  ditl: () => SV(`<circle cx="32" cy="32" r="22" fill="${PAL.ink}"/><path d="M32 10 a22 22 0 0 1 0 44 z" fill="${PAL.sun}"/><circle cx="24" cy="26" r="5" fill="#fff"/><path d="M32 32 l0 -14 M32 32 l10 6" stroke="${PAL.mint}" stroke-width="3" stroke-linecap="round"/>`),
  gstest: () => SV(ICONS.dish(1).replace(/<\/?svg[^>]*>/g, "") + `<circle cx="50" cy="48" r="10" fill="${PAL.mint}" stroke="${PAL.ink}" stroke-width="2"/><path d="M45 48 l4 4 l7 -8" stroke="${PAL.ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  email: () => SV(`<rect x="8" y="16" width="48" height="34" rx="5" fill="#fff" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M8 18 l24 18 l24 -18" stroke="${PAL.ink}" stroke-width="2.5" fill="none"/>`),
  clipboard: () => SV(`<rect x="12" y="10" width="40" height="48" rx="5" fill="#fff" stroke="${PAL.ink}" stroke-width="2.5"/><rect x="22" y="6" width="20" height="8" rx="3" fill="${PAL.violet}" stroke="${PAL.ink}" stroke-width="2"/><path d="M20 26 l4 4 l7 -7 M20 40 l4 4 l7 -7" stroke="${PAL.mint}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M36 28 h10 M36 42 h10" stroke="${PAL.ink}" stroke-width="2.5" stroke-linecap="round"/>`),
  dishone: () => ICONS.dish(1),
  dishtwo: () => SV(`<g transform="translate(-10 4) scale(.7)">${ICONS.dish(1).replace(/<\/?svg[^>]*>/g, "")}</g><g transform="translate(22 4) scale(.7)">${ICONS.dish(1).replace(/<\/?svg[^>]*>/g, "")}</g><circle cx="50" cy="12" r="8" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/><circle cx="50" cy="12" r="3" fill="${PAL.ink}"/>`),
  globe: () => SV(`<circle cx="32" cy="34" r="22" fill="${PAL.sky}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M18 26 q8 -4 12 4 q4 10 -6 14 M36 16 q10 4 8 14 q-2 8 8 10" fill="${PAL.mint}" stroke="${PAL.ink}" stroke-width="1.5"/><circle cx="14" cy="14" r="4" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="1.5"/><circle cx="52" cy="14" r="4" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="1.5"/><circle cx="32" cy="58" r="4" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="1.5"/>`)
};
function icon(name, arg) { const f = ICONS[name]; return f ? f(arg) : ICONS.clipboard(); }

/* ---------- rockets ---------- */
function rocketSVG(kind, scale) {
  const h = 40 + 70 * (scale || 0.5);
  const w = kind === "atlas" ? 26 : kind === "taurus" ? 14 : 18;
  const x = 40 - w / 2, top = 120 - h;
  const body = kind === "taurus" ? PAL.steel : kind === "atlas" ? "#F7F7FF" : "#EAF2FF";
  let g = `<path d="M${x} ${top + 18} q${w / 2} -26 ${w} 0 z" fill="${kind === "taurus" ? PAL.red : PAL.sky}" stroke="${PAL.ink}" stroke-width="2.5"/>`;
  g += `<rect x="${x}" y="${top + 18}" width="${w}" height="${h - 18}" fill="${body}" stroke="${PAL.ink}" stroke-width="2.5"/>`;
  g += `<rect x="${x}" y="${top + 36}" width="${w}" height="6" fill="${PAL.violet}"/>`;
  if (kind === "delta" || kind === "delta9") { const n = kind === "delta9" ? 3 : 2; for (let i = 0; i < n; i++) { g += `<rect x="${x - 8 - i * 7}" y="${120 - 34}" width="7" height="30" rx="3" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/><rect x="${x + w + 1 + i * 7}" y="${120 - 34}" width="7" height="30" rx="3" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/>`; } }
  g += `<path d="M${x} 120 l-8 8 v-14 z M${x + w} 120 l8 8 v-14 z" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2"/>`;
  g += `<path d="M${x + 3} 122 q${w / 2 - 3} 18 ${w - 6} 0" fill="${PAL.sun}"/>`;
  if (kind === "ride") g += `<rect x="${x + 2}" y="${top + 50}" width="5" height="5" fill="${PAL.mint}"/><rect x="${x + 9}" y="${top + 56}" width="5" height="5" fill="${PAL.pink}"/><rect x="${x + 3}" y="${top + 62}" width="5" height="5" fill="${PAL.sun}"/>`;
  return `<svg viewBox="0 0 80 142" aria-hidden="true">${g}</svg>`;
}
function issSVG() {
  return `<svg viewBox="0 0 80 142" aria-hidden="true">${panelRect(4, 50, 22, 14)}${panelRect(54, 50, 22, 14)}${panelRect(4, 72, 22, 14)}${panelRect(54, 72, 22, 14)}<rect x="24" y="64" width="32" height="10" rx="3" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2"/><rect x="34" y="56" width="12" height="28" rx="3" fill="#fff" stroke="${PAL.ink}" stroke-width="2"/><rect x="38" y="90" width="6" height="6" fill="${PAL.mint}" stroke="${PAL.ink}" stroke-width="1.5"/><path d="M41 98 v14" stroke="${PAL.mint}" stroke-width="2" stroke-dasharray="3 3"/></svg>`;
}

/* ---------- orbit pictures ---------- */
function orbitSVG(kind) {
  const P = (cx, cy, r, f, extra) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${PAL.ink}" stroke-width="2.5"/>${extra || ""}`;
  const sat = (x, y) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${PAL.gold}" stroke="${PAL.ink}" stroke-width="1.5"/><rect x="${x - 11}" y="${y - 2}" width="6" height="4" fill="${PAL.panel}"/><rect x="${x + 5}" y="${y - 2}" width="6" height="4" fill="${PAL.panel}"/>`;
  let g = "";
  const mars = (alt) => { const rr = 24 + alt; g = P(60, 52, 24, PAL.mars, `<circle cx="52" cy="46" r="4" fill="#C9502A"/><circle cx="66" cy="60" r="3" fill="#C9502A"/>`) + `<circle cx="60" cy="52" r="34" fill="none" stroke="${PAL.red}" stroke-width="1.5" stroke-dasharray="3 3"/>` + `<ellipse cx="60" cy="52" rx="${rr + 14}" ry="${rr}" fill="none" stroke="#fff" stroke-width="2"/>` + sat(60, 52 - rr); };
  switch (kind) {
    case "moi226": mars(12); break;
    case "moi300": mars(20); break;
    case "moi400": mars(30); break;
    case "atrain": case "sso600": case "sso550":
      g = P(60, 54, 26, PAL.sky, `<path d="M44 46 q8 -6 14 2 q4 8 -6 12 M64 36 q10 4 6 14" fill="${PAL.mint}"/>`) + `<ellipse cx="60" cy="54" rx="12" ry="42" fill="none" stroke="#fff" stroke-width="2"/>` + sat(60, 12) + (kind === "atrain" ? `<circle cx="66" cy="14" r="3" fill="${PAL.lav}"/><circle cx="71" cy="18" r="3" fill="${PAL.lav}"/><circle cx="74" cy="23" r="3" fill="${PAL.lav}"/>` : ""); break;
    case "iss400":
      g = P(60, 54, 26, PAL.sky, `<path d="M44 46 q8 -6 14 2 q4 8 -6 12 M64 36 q10 4 6 14" fill="${PAL.mint}"/>`) + `<ellipse cx="60" cy="54" rx="42" ry="16" transform="rotate(-30 60 54)" fill="none" stroke="#fff" stroke-width="2"/>` + sat(92, 36); break;
    case "trail":
      g = P(60, 54, 12, PAL.sun) + `<circle cx="60" cy="54" r="40" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 4"/>` + P(100, 54, 6, PAL.sky) + sat(96, 78); break;
    case "l2":
      g = P(24, 54, 12, PAL.sun) + P(76, 54, 7, PAL.sky) + `<circle cx="100" cy="54" r="9" fill="none" stroke="#fff" stroke-width="2"/>` + sat(100, 45) + `<text x="96" y="80" font-size="10" fill="#fff" font-weight="700">L2</text>`; break;
    case "leo":
      g = P(60, 54, 26, PAL.sky) + `<circle cx="60" cy="54" r="34" fill="none" stroke="#fff" stroke-width="2"/>` + sat(94, 54) + `<path d="M96 40 l14 -14" stroke="${PAL.sun}" stroke-width="2" stroke-dasharray="3 3"/>`; break;
    default: g = P(60, 54, 24, PAL.sky);
  }
  return `<svg viewBox="0 0 120 108" aria-hidden="true">${g}</svg>`;
}

/* ---------- case-file illustrations ---------- */
function caseArt(id) {
  let g = "";
  if (id === "mco") g = `<circle cx="150" cy="70" r="46" fill="${PAL.mars}" stroke="${PAL.ink}" stroke-width="3"/><circle cx="136" cy="58" r="9" fill="#C9502A"/><circle cx="166" cy="86" r="6" fill="#C9502A"/><path d="M20 110 Q70 10 112 46" stroke="#fff" stroke-width="2" stroke-dasharray="5 6" fill="none"/>${craftMini(108, 44, 0.9, 1)}<text x="118" y="24" font-size="15" fill="${PAL.sun}" font-weight="800">?</text>`;
  if (id === "oco") g = `<circle cx="110" cy="150" r="90" fill="${PAL.sky}" stroke="${PAL.ink}" stroke-width="3"/><path d="M60 92 q20 -12 36 0 q12 10 30 -4" fill="${PAL.mint}" stroke="${PAL.ink}" stroke-width="2"/><g transform="translate(160 20) rotate(28)">${rocketBody()}</g><path d="M150 40 q-20 30 -10 52" stroke="${PAL.sun}" stroke-width="2" stroke-dasharray="4 5" fill="none"/>`;
  if (id === "kepler") { g = `<circle cx="40" cy="40" r="16" fill="${PAL.sun}" stroke="${PAL.ink}" stroke-width="3"/>`; for (let i = 0; i < 14; i++) g += `<circle cx="${(i * 53) % 200 + 10}" cy="${(i * 37) % 120 + 8}" r="1.6" fill="#fff"/>`; g += `<g transform="translate(110 22) rotate(18)"><rect x="0" y="0" width="34" height="78" rx="6" fill="#fff" stroke="${PAL.ink}" stroke-width="3"/><path d="M0 0 l40 -14 v14" fill="none" stroke="${PAL.ink}" stroke-width="3"/>${panelRect(-36, 20, 30, 44)}<circle cx="10" cy="88" r="5" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2"/><circle cx="24" cy="88" r="5" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2"/></g>`; }
  if (id === "nile") g = `<path d="M0 120 h200 v-30 q-40 -10 -100 0 q-60 10 -100 0 z" fill="#E8C78A"/><path d="M96 120 q-10 -40 6 -60 q12 -20 -2 -60" stroke="${PAL.sky}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M80 120 q-6 -30 8 -50 M118 120 q8 -30 -4 -52" stroke="${PAL.mint}" stroke-width="8" fill="none" opacity=".8"/><polygon points="150,100 172,64 194,100" fill="#E0B76C" stroke="${PAL.ink}" stroke-width="2.5"/><polygon points="132,104 146,82 160,104" fill="#E0B76C" stroke="${PAL.ink}" stroke-width="2.5"/>${cubeMini(40, 24)}`;
  if (id === "vanguard") g = `<rect x="0" y="100" width="200" height="20" fill="#2A5BD0"/><path d="M60 100 v-80 M60 30 l20 -6 M60 50 l20 -6 M60 70 l20 -6" stroke="#9AA6C8" stroke-width="3"/><g transform="translate(96 26)">${rocketBody()}</g><circle cx="104" cy="96" r="22" fill="#FFC83D" opacity=".85"/><circle cx="104" cy="96" r="12" fill="#FF5A5F"/><circle cx="160" cy="104" r="6" fill="#DCE3F5" stroke="${PAL.ink}" stroke-width="2"/><text x="146" y="92" font-size="10" fill="#FFC83D" font-weight="700">beep</text>`;
  if (id === "swift") g = `<circle cx="100" cy="190" r="110" fill="${PAL.sky}" stroke="${PAL.ink}" stroke-width="3"/><g transform="translate(118 30) rotate(70)"><rect x="0" y="0" width="22" height="50" rx="5" fill="#fff" stroke="${PAL.ink}" stroke-width="2.5"/>${panelRect(-26, 12, 22, 26)}</g>${craftMini(52, 48, 0.9, 2)}<path d="M40 40 a14 14 0 1 1 6 22" stroke="${PAL.red}" stroke-width="3" fill="none"/><path d="M150 70 q10 10 4 24" stroke="${PAL.mars}" stroke-width="3" fill="none" stroke-dasharray="3 4"/>`;
  if (id === "sprout") g = `<rect x="0" y="0" width="200" height="120" fill="#1B1650"/><circle cx="168" cy="24" r="12" fill="${PAL.sky}" stroke="${PAL.ink}" stroke-width="2"/><path d="M0 96 q60 -12 110 0 q50 10 90 -4 v28 h-200 z" fill="#B9BED3"/><path d="M80 92 l-14 18 M120 92 l14 18" stroke="${PAL.ink}" stroke-width="4"/><rect x="76" y="70" width="48" height="24" fill="${PAL.gold}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M84 70 a16 16 0 0 1 32 0 z" fill="rgba(200,230,255,.85)" stroke="${PAL.ink}" stroke-width="2"/><path d="M100 70 v-9 M100 64 q-6 -4 -9 0 M100 62 q6 -4 9 0" stroke="#8FB4C9" stroke-width="2.5" fill="none"/><text x="134" y="66" font-size="16">❄️</text>`;
  if (id === "ruby") g = `<rect x="0" y="0" width="200" height="120" fill="#E58A5C"/><path d="M0 84 q50 -14 100 0 q50 12 100 -2 v38 h-200 z" fill="#C9653A"/><circle cx="74" cy="96" r="8" fill="#4A4A6A" stroke="${PAL.ink}" stroke-width="2"/><circle cx="100" cy="96" r="8" fill="#4A4A6A" stroke="${PAL.ink}" stroke-width="2"/><circle cx="126" cy="96" r="8" fill="#4A4A6A" stroke="${PAL.ink}" stroke-width="2"/><rect x="64" y="72" width="72" height="18" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="2"/><rect x="56" y="64" width="88" height="7" fill="#C9653A" stroke="${PAL.ink}" stroke-width="2"/><rect x="124" y="40" width="5" height="24" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="1.5"/><rect x="118" y="32" width="18" height="10" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="1.5"/><text x="144" y="34" font-size="14" fill="#fff" font-weight="800">z Z</text><path d="M10 30 h40 M20 44 h50 M0 56 h30" stroke="rgba(255,220,180,.7)" stroke-width="3"/>`;
  return `<svg viewBox="0 0 200 120" aria-hidden="true">${g}</svg>`;
}
function craftMini(x, y, s, wings) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-8" y="-8" width="16" height="16" fill="${PAL.gold}" stroke="${PAL.ink}" stroke-width="2"/>${panelRect(8, -5, 18, 10)}${wings > 1 ? panelRect(-26, -5, 18, 10) : ""}</g>`;
}
function cubeMini(x, y) { return `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="16" height="30" fill="${PAL.panel}" stroke="${PAL.ink}" stroke-width="2"/>${panelRect(-20, 4, 18, 22)}${panelRect(18, 4, 18, 22)}</g>`; }
function rocketBody() { return `<path d="M0 18 q8 -26 16 0 z" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2.5"/><rect x="0" y="18" width="16" height="56" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2.5"/><path d="M0 74 l-7 8 v-14 z M16 74 l7 8 v-14 z" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2"/><path d="M3 76 q5 16 10 0" fill="${PAL.sun}"/>`; }

/* ---------- badges ---------- */
function badgeSVG(color, glyph) {
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 6 l14 10 h17 l5 16 l14 10 l-5 17 l5 16 l-14 10 l-5 16 h-17 l-14 10 l-14 -10 h-17 l-5 -16 l-14 -10 l5 -16 l-5 -17 l14 -10 l5 -16 h17 z" fill="${color}" stroke="${PAL.ink}" stroke-width="3"/><circle cx="60" cy="60" r="34" fill="#fff" stroke="${PAL.ink}" stroke-width="3"/><text x="60" y="74" text-anchor="middle" font-size="38">${glyph}</text></svg>`;
}
function starSVG(on) { return `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4 l6 13 l14 1.5 l-10.5 9.5 l3 14 l-12.5 -7 l-12.5 7 l3 -14 l-10.5 -9.5 l14 -1.5 z" fill="${on ? PAL.sun : "rgba(120,110,200,.25)"}" stroke="${PAL.ink}" stroke-width="2.5" stroke-linejoin="round"/></svg>`; }
