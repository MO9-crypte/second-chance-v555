/* ===================== SECOND CHANCE v2 — the spacecraft you build (live SVG) ===================== */
function nest(svg, x, y, w, h) {
  return svg.replace("<svg ", `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);
}
function socket(x, y, w, h, label, slotId) {
  return `<g class="sock" data-sock="${slotId}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="rgba(255,255,255,.06)" stroke="#C9C2FF" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="${x + w / 2}" y="${y + h / 2 - 2}" text-anchor="middle" font-size="22" fill="#C9C2FF" font-weight="800">+</text>
    <text x="${x + w / 2}" y="${y + h / 2 + 16}" text-anchor="middle" font-size="11.5" fill="#C9C2FF" font-weight="700">${esc(label)}</text></g>`;
}
function foil(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${PAL.gold}" stroke="${PAL.ink}" stroke-width="3"/>
    <path d="M${x + 10} ${y + 18} q${w * 0.2} -8 ${w * 0.4} 4 q${w * 0.2} 10 ${w * 0.45} -2 M${x + 8} ${y + h - 20} q${w * 0.3} 8 ${w * 0.5} -4 q${w * 0.2} -6 ${w * 0.4} 4" stroke="${PAL.gold2}" stroke-width="2" fill="none"/>
    <rect x="${x + 6}" y="${y + 5}" width="${w * 0.3}" height="5" rx="2.5" fill="#fff" opacity=".35"/>`;
}
function wingPanel(x, y, w, h, side) {
  const arm = side === "left" ? `<rect x="${x + w}" y="${y + h / 2 - 3}" width="14" height="6" fill="${PAL.steel2}" stroke="${PAL.ink}" stroke-width="2"/>` : `<rect x="${x - 14}" y="${y + h / 2 - 3}" width="14" height="6" fill="${PAL.steel2}" stroke="${PAL.ink}" stroke-width="2"/>`;
  return arm + panelRect(x, y, w, h);
}

function stageSVG(M, D, c) {
  const pick = id => D.picks[id];
  const o = id => optOf(M, D, id);
  const lbl = id => { const s = slot(M, id); return s ? L(s.short || s.label) : ""; };
  const has = id => !!slot(M, id);
  let g = "";
  // background twinkles
  for (let i = 0; i < 26; i++) g += `<circle cx="${(i * 97) % 420}" cy="${(i * 61) % 320}" r="${i % 3 ? 1.2 : 2}" fill="#fff" opacity="${0.25 + (i % 4) * 0.12}"/>`;
  const iconOf = op => icon(op.ic, op.icp);
  const hatch = (id, x, y, s) => {
    if (!has(id)) return "";
    const v = o(id);
    if (!v) return socket(x, y, s, s, lbl(id), id);
    return `<g class="part" data-part="${id}"><rect x="${x}" y="${y}" width="${s}" height="${s}" rx="10" fill="rgba(27,22,80,.55)" stroke="${PAL.ink}" stroke-width="2"/>${nest(iconOf(v), x + 4, y + 4, s - 8, s - 8)}</g>`;
  };
  const instrRow = (x0, y, size, max) => {
    const list = o("instr") || [];
    let h = "";
    list.slice(0, max).forEach((op, i) => { h += `<g class="part" data-part="instr">${nest(iconOf(op), x0 + i * (size + 8), y, size, size)}</g>`; });
    if (list.length < max) h += socket(x0 + list.length * (size + 8), y, size, size, lbl("instr"), "instr");
    return h;
  };

  if (M.craft === "rocket") {
    // Vanguard: three-stage rocket with the tiny satellite in the nose
    const cx = 200;
    g += `<rect x="${cx - 26}" y="70" width="52" height="210" rx="8" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="3"/>
      <path d="M${cx - 26} 70 q26 -56 52 0 z" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="3"/>
      <rect x="${cx - 26}" y="150" width="52" height="6" fill="${PAL.violet}"/><rect x="${cx - 26}" y="200" width="52" height="6" fill="${PAL.violet}"/>
      <path d="M${cx - 26} 270 l-18 22 v-30 z M${cx + 26} 270 l18 22 v-30 z" fill="${PAL.red}" stroke="${PAL.ink}" stroke-width="2.5"/>
      <circle cx="${cx}" cy="58" r="11" fill="${PAL.steel}" stroke="${PAL.ink}" stroke-width="2.5"/>`;
    const rk = (id, x, y, s) => { const v = o(id); if (!has(id)) return ""; return v ? `<g class="part" data-part="${id}"><rect x="${x}" y="${y}" width="${s}" height="${s}" rx="10" fill="rgba(27,22,80,.55)" stroke="${PAL.ink}" stroke-width="2"/>${nest(iconOf(v), x + 4, y + 4, s - 8, s - 8)}<line x1="${x < cx ? x + s : x}" y1="${y + s / 2}" x2="${x < cx ? cx - 26 : cx + 26}" y2="${y + s / 2}" stroke="#C9C2FF" stroke-width="2" stroke-dasharray="4 4"/></g>` : socket(x, y, s, s, lbl(id), id); };
    const list = o("instr") || [];
    list.forEach((op, i) => { g += `<g class="part" data-part="instr">${nest(iconOf(op), 250 + i * 54, 20, 48, 48)}</g>`; });
    if (list.length < 3) g += socket(250 + list.length * 54, 20, 50, 56, lbl("instr"), "instr");
    g += rk("power", 96, 20, 64) + rk("tank", 96, 120, 74) + rk("fitting", 300, 130, 70) + rk("start", 96, 220, 74);
    return `<svg class="stage-svg" viewBox="0 0 420 320" role="img" aria-label="${esc(T("Your rocket", "صاروخك"))}">${g}</svg>`;
  }
  if (M.craft === "lander") {
    // Lunar Sprout: lander on legs with a greenhouse dome
    g += `<path d="M150 230 L104 290 M270 230 L316 290" stroke="${PAL.ink}" stroke-width="6" stroke-linecap="round"/><ellipse cx="104" cy="292" rx="18" ry="5" fill="${PAL.steel}"/><ellipse cx="316" cy="292" rx="18" ry="5" fill="${PAL.steel}"/>`;
    const th = o("thermal");
    g += `<rect x="140" y="120" width="140" height="112" rx="10" fill="${th && th.flags && th.flags.thick ? "#E9C86A" : PAL.gold}" stroke="${PAL.ink}" stroke-width="${th && th.flags && th.flags.thick ? 6 : 3}"/>`;
    g += `<path d="M160 120 a50 50 0 0 1 100 0 z" fill="rgba(160,240,220,.45)" stroke="${PAL.ink}" stroke-width="3"/>`;
    const list = o("instr") || [];
    list.slice(0, 2).forEach((op, i) => { g += `<g class="part" data-part="instr">${nest(iconOf(op), 176 + i * 36, 78, 32, 32)}</g>`; });
    list.slice(2, 4).forEach((op, i) => { g += `<g class="part" data-part="instr">${nest(iconOf(op), 20, 150 + i * 48, 42, 42)}</g>`; });
    if (list.length < 2) g += socket(176 + list.length * 36, 74, 40, 40, lbl("instr"), "instr");
    const pw = o("power");
    if (pw) g += wingPanel(296, 70, pw.flags && pw.flags.big ? 110 : 84, 60, "right"); else g += socket(300, 66, 100, 70, lbl("power"), "power");
    g += hatch("battery", 148, 128, 40) + hatch("heater", 190, 128, 40) + hatch("thermal", 232, 128, 40) + hatch("comms", 190, 178, 46);
    return `<svg class="stage-svg" viewBox="0 0 420 320" role="img" aria-label="${esc(T("Your lander", "مركبة الهبوط"))}">${g}</svg>`;
  }
  if (M.craft === "rover") {
    // Rover Ruby: body on wheels, deck of solar panels, mast camera
    const wh = o("adcs"), n = wh && wh.flags && wh.flags.six ? 3 : 2;
    const xs = n === 3 ? [130, 210, 290] : [140, 280];
    if (wh) xs.forEach(cx => { g += `<g class="part" data-part="adcs"><circle cx="${cx}" cy="262" r="28" fill="#4A4A6A" stroke="${PAL.ink}" stroke-width="3"/><circle cx="${cx}" cy="262" r="8" fill="${PAL.steel}"/></g>`; });
    else g += socket(150, 240, 120, 60, lbl("adcs"), "adcs");
    g += `<rect x="110" y="170" width="200" height="66" rx="10" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="3"/>`;
    const pw = o("power");
    if (pw) { if (pw.flags && pw.flags.rtg) g += `<g class="part" data-part="power"><rect x="40" y="186" width="66" height="44" rx="8" fill="${PAL.steel2}" stroke="${PAL.ink}" stroke-width="3"/>${nest(iconOf(pw), 50, 188, 40, 40)}</g>`;
      else { const big = pw.flags && pw.flags.big; g += `<g class="part" data-part="power">${panelRect(big ? 70 : 96, 140, big ? 280 : 228, 26)}${pw.flags && pw.flags.tilt ? `<path d="M96 140 l-14 -16 M324 140 l14 -16" stroke="${PAL.ink}" stroke-width="3"/>` : ""}</g>`; } }
    else g += socket(110, 120, 200, 46, lbl("power"), "power");
    g += `<rect x="286" y="60" width="10" height="110" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="2.5"/>`;
    const list = o("instr") || [];
    list.slice(0, 1).forEach(op => { g += `<g class="part" data-part="instr">${nest(iconOf(op), 266, 20, 50, 46)}</g>`; });
    list.slice(1, 4).forEach((op, i) => { g += `<g class="part" data-part="instr">${nest(iconOf(op), 20 + i * 0, 30 + i * 46, 42, 42)}</g>`; });
    if (list.length < 1) g += socket(262, 16, 58, 52, lbl("instr"), "instr"); else if (list.length < 4) g += socket(20, 30 + (list.length - 1) * 46, 46, 42, lbl("instr"), "instr");
    g += hatch("battery", 120, 178, 48) + hatch("cpu", 174, 178, 48);
    const cm = o("comms");
    if (cm) g += `<g class="part" data-part="comms">${nest(iconOf(cm), 230, 176, 52, 52)}</g>`; else g += socket(228, 176, 56, 54, lbl("comms"), "comms");
    return `<svg class="stage-svg" viewBox="0 0 420 320" role="img" aria-label="${esc(T("Your rover", "مركبتك الجوّالة"))}">${g}</svg>`;
  }
  if (M.craft === "telescope") {
    const pw = o("power");
    if (pw) g += wingPanel(pw.flags && pw.flags.big ? 34 : 50, 70, pw.flags && pw.flags.big ? 132 : 116, 120, "left");
    else g += socket(50, 80, 116, 100, lbl("power"), "power");
    g += `<rect x="180" y="44" width="76" height="170" rx="14" fill="#F4F6FF" stroke="${PAL.ink}" stroke-width="3"/>
      <path d="M180 58 L262 26 L262 60" fill="#E1E6FA" stroke="${PAL.ink}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="218" cy="58" rx="38" ry="9" fill="#2A2470" stroke="${PAL.ink}" stroke-width="2.5"/>`;
    const list = o("instr") || [];
    if (list[0]) g += `<g class="part" data-part="instr">${nest(iconOf(list[0]), 190, 120, 56, 56)}</g>`; else g += socket(188, 116, 60, 64, lbl("instr"), "instr");
    if (list[1]) g += `<g class="part" data-part="instr">${nest(iconOf(list[1]), 290, 70, 54, 54)}</g>`;
    g += `<rect x="160" y="216" width="118" height="92" rx="12" fill="${PAL.gold}" stroke="${PAL.ink}" stroke-width="3"/>`;
    g += hatch("battery", 166, 222, 50) + hatch("cpu", 222, 222, 50) + hatch("prop", 194, 274, 32);
    g += hatch("adcs", 288, 222, 64);
    const cm = o("comms");
    if (cm) g += `<g class="part" data-part="comms">${nest(iconOf(cm), 296, 132, 64, 64)}</g>`; else g += socket(292, 134, 70, 70, lbl("comms"), "comms");
  } else if (M.craft === "cubesat") {
    const bus = o("bus");
    if (!bus) g += socket(160, 70, 100, 180, lbl("bus"), "bus");
    else {
      const U = bus.flags.U, cols = U === 12 ? 2 : (U === 6 ? 2 : 1), rows = U === 12 ? 6 : 3;
      const cw = 52, ch = U === 12 ? 36 : 56, w = cols * cw, h = rows * ch, x0 = 210 - w / 2, y0 = 160 - h / 2;
      const pw = o("power");
      if (pw && pw.flags.wings === 2) g += wingPanel(x0 - 112, y0 + 20, 96, h - 40, "left") + wingPanel(x0 + w + 16, y0 + 20, 96, h - 40, "right");
      else if (!pw) g += socket(x0 + w + 16, y0 + 20, 90, Math.max(70, h - 40), lbl("power"), "power");
      g += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="6" fill="${pw && pw.flags.wings === 0 ? PAL.panel : PAL.steel}" stroke="${PAL.ink}" stroke-width="3"/>`;
      if (pw && pw.flags.wings === 0) g += panelRect(x0 + 4, y0 + 4, w - 8, h - 8);
      for (let i = 1; i < cols; i++) g += `<line x1="${x0 + i * cw}" y1="${y0}" x2="${x0 + i * cw}" y2="${y0 + h}" stroke="${PAL.ink}" stroke-width="2"/>`;
      for (let j = 1; j < rows; j++) g += `<line x1="${x0}" y1="${y0 + j * ch}" x2="${x0 + w}" y2="${y0 + j * ch}" stroke="${PAL.ink}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      // parts inside, cell by cell
      const inside = [];
      (o("instr") || []).forEach(op => inside.push(["instr", op]));
      ["battery", "cpu", "adcs", "comms"].forEach(id => { const v = o(id); if (v) inside.push([id, v]); });
      const cells = cols * rows, s = Math.min(cw, ch) - 8;
      inside.slice(0, cells).forEach((p, k) => { const cx = x0 + (k % cols) * cw + (cw - s) / 2, cy = y0 + Math.floor(k / cols) * ch + (ch - s) / 2; g += `<g class="part" data-part="${p[0]}">${nest(iconOf(p[1]), cx, cy, s, s)}</g>`; });
      const missing = ["instr", "battery", "cpu", "adcs", "comms"].filter(id => has(id) && !(id === "instr" ? (o("instr") || []).length : o(id)));
      missing.slice(0, 3).forEach((id, k) => { g += socket(18, 20 + k * 96, 78, 84, lbl(id), id); });
    }
  } else {
    // orbiter / earth satellite
    const pw = o("power");
    const wings = pw ? (pw.flags.wings || 1) : 0, big = pw && (pw.flags.big || (pw.gen || 0) > 1100);
    const ww = big ? 124 : 108;
    if (pw) { g += wingPanel(286, 120, ww - 4, 72, "right"); if (wings > 1) g += wingPanel(134 - ww, 120, ww - 4, 72, "left"); }
    else { g += socket(290, 116, 104, 80, lbl("power"), "power"); g += socket(26, 116, 104, 80, lbl("power"), "power"); }
    g += foil(150, 96, 120, 120);
    g += hatch("battery", 160, 106, 48) + hatch("cpu", 212, 106, 48) + hatch("prop", 160, 158, 48) + hatch("adcs", 212, 158, 48);
    const cm = o("comms");
    if (cm) g += `<g class="part" data-part="comms">${nest(iconOf(cm), 172, 16, 76, 80)}</g>`; else g += socket(174, 18, 72, 70, lbl("comms"), "comms");
    g += instrRow(210 - 2 * 52 + 4, 228, 48, 4);
  }
  return `<svg class="stage-svg" viewBox="0 0 420 320" role="img" aria-label="${esc(T("Your spacecraft", "مركبتك"))}">${g}</svg>`;
}
