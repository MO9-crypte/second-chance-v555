/* ===================== SECOND CHANCE v2 — cartoon canvas scenes ===================== */
const CV = {
  bg(g, w, h, stars, time) {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#0C0A2E"); gr.addColorStop(1, "#231C66");
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    stars.forEach(s => { g.globalAlpha = 0.35 + 0.35 * Math.sin(time * 2 + s[3]); g.fillStyle = "#fff"; g.beginPath(); g.arc(s[0] * w, s[1] * h, s[2], 0, 7); g.fill(); });
    g.globalAlpha = 1;
  },
  planet(g, x, y, r, base, shade, kind) {
    g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = base; g.fill(); g.clip();
    if (kind === "mars") { g.fillStyle = "#C9502A"; [[-0.3, -0.2, 0.18], [0.25, 0.3, 0.12], [0.4, -0.35, 0.08], [-0.1, 0.45, 0.1]].forEach(c => { g.beginPath(); g.arc(x + c[0] * r, y + c[1] * r, c[2] * r, 0, 7); g.fill(); }); }
    if (kind === "earth") { g.fillStyle = "#3DDBA4"; g.beginPath(); g.ellipse(x - r * 0.25, y - r * 0.2, r * 0.35, r * 0.22, 0.4, 0, 7); g.fill(); g.beginPath(); g.ellipse(x + r * 0.35, y + r * 0.2, r * 0.28, r * 0.35, -0.3, 0, 7); g.fill();
      g.fillStyle = "rgba(255,255,255,.75)"; g.beginPath(); g.ellipse(x + r * 0.05, y - r * 0.55, r * 0.4, r * 0.08, 0, 0, 7); g.fill(); }
    g.fillStyle = shade; g.beginPath(); g.arc(x + r * 0.45, y + r * 0.35, r * 1.05, 0, 7); g.fill();
    g.restore();
    g.lineWidth = Math.max(3, r * 0.06); g.strokeStyle = "#1B1650"; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
  },
  sun(g, x, y, r, time) {
    g.save(); const gl = g.createRadialGradient(x, y, r * 0.5, x, y, r * 2.4); gl.addColorStop(0, "rgba(255,200,61,.55)"); gl.addColorStop(1, "rgba(255,200,61,0)"); g.fillStyle = gl; g.beginPath(); g.arc(x, y, r * 2.4, 0, 7); g.fill();
    g.fillStyle = "#FFC83D"; g.beginPath(); g.arc(x, y, r * (1 + 0.03 * Math.sin(time * 3)), 0, 7); g.fill(); g.lineWidth = 4; g.strokeStyle = "#1B1650"; g.stroke(); g.restore();
  },
  craft(g, x, y, s, ang, wings, tint) {
    g.save(); g.translate(x, y); g.rotate(ang || 0); g.scale(s, s);
    g.lineWidth = 3; g.strokeStyle = "#1B1650";
    const pan = (px) => { g.fillStyle = "#3D7BF2"; g.fillRect(px, -9, 30, 18); g.strokeRect(px, -9, 30, 18); g.strokeStyle = "#4FC3F7"; g.lineWidth = 1.2; for (let i = 1; i < 3; i++) { g.beginPath(); g.moveTo(px + i * 10, -9); g.lineTo(px + i * 10, 9); g.stroke(); } g.strokeStyle = "#1B1650"; g.lineWidth = 3; };
    pan(14); if (wings !== 1) pan(-44);
    g.fillStyle = tint || "#F4B740"; g.beginPath(); g.roundRect ? g.roundRect(-14, -14, 28, 28, 5) : g.rect(-14, -14, 28, 28); g.fill(); g.stroke();
    g.fillStyle = "#fff"; g.beginPath(); g.arc(0, -20, 7, Math.PI, 0); g.fill(); g.stroke();
    g.restore();
  },
  telescope(g, x, y, s, ang) {
    g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); g.lineWidth = 3; g.strokeStyle = "#1B1650";
    g.fillStyle = "#3D7BF2"; g.fillRect(-46, -14, 26, 34); g.strokeRect(-46, -14, 26, 34);
    g.fillStyle = "#F4F6FF"; g.fillRect(-16, -30, 32, 62); g.strokeRect(-16, -30, 32, 62);
    g.beginPath(); g.moveTo(-16, -30); g.lineTo(20, -42); g.lineTo(20, -30); g.stroke();
    g.fillStyle = "#F4B740"; g.fillRect(-18, 32, 36, 14); g.strokeRect(-18, 32, 36, 14);
    g.restore();
  },
  rocket(g, x, y, s, ang, fairingOn, flame) {
    g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); g.lineWidth = 3; g.strokeStyle = "#1B1650";
    if (flame) { g.fillStyle = "#FFC83D"; g.beginPath(); g.moveTo(-8, 34); g.quadraticCurveTo(0, 34 + 26 + Math.random() * 10, 8, 34); g.fill(); g.fillStyle = "#FF6FA5"; g.beginPath(); g.moveTo(-4, 34); g.quadraticCurveTo(0, 48, 4, 34); g.fill(); }
    g.fillStyle = "#EEF2FF"; g.fillRect(-10, -18, 20, 52); g.strokeRect(-10, -18, 20, 52);
    g.fillStyle = "#FF5A5F"; g.beginPath(); g.moveTo(-10, 30); g.lineTo(-18, 40); g.lineTo(-10, 40); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.moveTo(10, 30); g.lineTo(18, 40); g.lineTo(10, 40); g.closePath(); g.fill(); g.stroke();
    if (fairingOn) { g.fillStyle = "#FF5A5F"; g.beginPath(); g.moveTo(-10, -18); g.quadraticCurveTo(0, -46, 10, -18); g.closePath(); g.fill(); g.stroke(); }
    else { g.fillStyle = "#F4B740"; g.fillRect(-7, -30, 14, 12); g.strokeRect(-7, -30, 14, 12); }
    g.restore();
  },
  boom(g, x, y, k) {
    if (k <= 0 || k >= 1) return;
    const cols = ["#FFC83D", "#FF8A3D", "#FF5A5F"];
    for (let i = 0; i < 3; i++) { g.globalAlpha = Math.max(0, 1 - k) * (1 - i * 0.2); g.fillStyle = cols[i]; g.beginPath(); g.arc(x, y, (14 + i * 14) + k * 70 * (1 - i * 0.2), 0, 7); g.fill(); }
    g.globalAlpha = 1;
    for (let i = 0; i < 8; i++) { const a = i * 0.8; g.fillStyle = "#9AA6C8"; g.fillRect(x + Math.cos(a) * k * 120, y + Math.sin(a) * k * 120, 6, 6); }
  },
  banner(g, w, h, text, color) {
    g.font = "800 46px 'Baloo Bhaijaan 2', 'Segoe UI', sans-serif"; g.textAlign = "center";
    const tw = g.measureText(text).width + 60;
    g.fillStyle = color || "#FF5A5F"; g.strokeStyle = "#1B1650"; g.lineWidth = 5;
    g.beginPath(); g.roundRect ? g.roundRect(w / 2 - tw / 2, h * 0.1, tw, 72, 18) : g.rect(w / 2 - tw / 2, h * 0.1, tw, 72); g.fill(); g.stroke();
    g.fillStyle = "#fff"; g.fillText(text, w / 2, h * 0.1 + 52); g.textAlign = "start";
  },
  splash(g, x, y, k) { g.strokeStyle = "#fff"; g.lineWidth = 4; for (let i = 0; i < 3; i++) { g.globalAlpha = Math.max(0, 1 - k); g.beginPath(); g.ellipse(x, y, 20 + k * 80 + i * 18, 6 + k * 14 + i * 4, 0, 0, 7); g.stroke(); } g.globalAlpha = 1; }
};
const qpt = (a, c, b, t) => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];

/* The intro cinematic that replays the real failure (chapter 1). */
function drawCrash(g, w, h, M, p, stars, time) {
  if (drawCrashExtra(g, w, h, M, p, stars, time)) return;
  CV.bg(g, w, h, stars, time);
  if (M.scene === "mars") {
    const E = [w * 0.14, h * 0.78], Mx = [w * 0.74, h * 0.46], ctl = [w * 0.4, h * 0.02], end = [Mx[0] - 150, Mx[1] - 70];
    CV.planet(g, E[0], E[1], 46, "#4FC3F7", "rgba(27,22,80,.25)", "earth");
    CV.planet(g, Mx[0], Mx[1], 120, "#F26B3A", "rgba(27,22,80,.28)", "mars");
    g.setLineDash([8, 10]); g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 3; g.beginPath(); g.moveTo(E[0], E[1]); g.quadraticCurveTo(ctl[0], ctl[1], end[0], end[1]); g.stroke(); g.setLineDash([]);
    if (p < 0.55) { const pt = qpt(E, ctl, end, p / 0.55); CV.craft(g, pt[0], pt[1], 1.4, 0.3, 1); }
    else { const k = clamp((p - 0.55) / 0.25, 0, 1); const a = -2.6 + k * 1.3, r = 175 - k * 55; const x = Mx[0] + Math.cos(a) * r, y = Mx[1] + Math.sin(a) * r;
      if (k < 1) CV.craft(g, x, y, 1.3, a + 1.6, 1, k > 0.6 ? "#FF8A3D" : null);
      CV.boom(g, Mx[0] + Math.cos(-1.3) * 120, Mx[1] + Math.sin(-1.3) * 120, (p - 0.78) / 0.2); }
    if (p > 0.82) CV.banner(g, w, h, T("SIGNAL LOST", "انقطعت الإشارة"));
  } else if (M.scene === "earth") {
    const C = [w * 0.5, h * 1.25], R = h * 0.62;
    CV.planet(g, C[0], C[1], R, "#4FC3F7", "rgba(27,22,80,.2)", "earth");
    let x, y, ang;
    if (p < 0.4) { const k = p / 0.4; x = w * 0.42 + k * w * 0.12; y = h * 0.66 - k * h * 0.5; ang = 0.15 + k * 0.4; CV.rocket(g, x, y, 1.6, ang, true, true); }
    else if (p < 0.5) { x = w * 0.54; y = h * 0.16; CV.rocket(g, x, y, 1.6, 0.6, true, true); g.fillStyle = "#FFC83D"; g.font = "800 40px sans-serif"; g.fillText("?!", x + 40, y - 30); }
    else { const k = clamp((p - 0.5) / 0.32, 0, 1); x = w * 0.54 + k * w * 0.22; y = h * 0.16 + k * k * h * 0.62; CV.rocket(g, x, y, 1.6, 0.6 + k * 1.6, true, k < 0.3); if (p > 0.82) CV.splash(g, w * 0.76, h * 0.8, (p - 0.82) / 0.18); }
    if (p > 0.84) CV.banner(g, w, h, T("NO ORBIT", "لم يصل للمدار"));
  } else {
    CV.sun(g, w * 0.16, h * 0.22, 46, time);
    const ang = p < 0.66 ? Math.sin(time * 1.5) * 0.02 : (p - 0.66) * 6 + Math.sin(time * 3) * 0.1;
    CV.telescope(g, w * 0.55, h * 0.52, 2.4, ang);
    for (let i = 0; i < 4; i++) { const broken = (i === 1 && p > 0.33) || (i === 3 && p > 0.66); const x = w * 0.78 + (i % 2) * 70, y = h * 0.2 + Math.floor(i / 2) * 70;
      g.fillStyle = broken ? "#FF5A5F" : "#DCE3F5"; g.strokeStyle = "#1B1650"; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 26, 0, 7); g.fill(); g.stroke();
      if (!broken) { g.save(); g.translate(x, y); g.rotate(time * 6); g.beginPath(); g.moveTo(-18, 0); g.lineTo(18, 0); g.moveTo(0, -18); g.lineTo(0, 18); g.stroke(); g.restore(); }
      else { g.beginPath(); g.moveTo(x - 12, y - 12); g.lineTo(x + 12, y + 12); g.moveTo(x + 12, y - 12); g.lineTo(x - 12, y + 12); g.stroke(); } }
    if (p > 0.8) CV.banner(g, w, h, T("POINTING LOST", "فُقد التوجيه"), "#F26B3A");
  }
}

/* The mission you designed, flying (chapter 4). */
function drawFlight(g, w, h, R, time) {
  const s = R.sim, p = s.p, M = R.M;
  if (drawFlightExtra(g, w, h, R, time)) { drawEndBanner(g, w, h, R, R.sim.outcome === "lost"); return; }
  CV.bg(g, w, h, R.stars, time);
  const lost = s.outcome === "lost" && s.lostAt != null && p >= s.lostAt - 0.03;
  if (M.scene === "mars") {
    const E = [w * 0.14, h * 0.78], Mx = [w * 0.74, h * 0.46], ctl = [w * 0.4, h * 0.02], end = [Mx[0] - 150, Mx[1] - 70];
    CV.planet(g, E[0], E[1], 46, "#4FC3F7", "rgba(27,22,80,.25)", "earth");
    CV.planet(g, Mx[0], Mx[1], 120, "#F26B3A", "rgba(27,22,80,.28)", "mars");
    g.setLineDash([8, 10]); g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 3; g.beginPath(); g.moveTo(E[0], E[1]); g.quadraticCurveTo(ctl[0], ctl[1], end[0], end[1]); g.stroke(); g.setLineDash([]);
    const wings = R.x.pick("power") === "wing1" ? 1 : 2;
    if (p < 0.8) { const pt = qpt(E, ctl, end, p / 0.8); CV.craft(g, pt[0], pt[1], 1.3, 0.3, wings); }
    else if (lost) { const k = clamp((p - (s.lostAt - 0.03)) / 0.08, 0, 1); const a = -2.6 + k * 1.3, r = 175 - k * 55; if (k < 1) CV.craft(g, Mx[0] + Math.cos(a) * r, Mx[1] + Math.sin(a) * r, 1.2, a + 1.6, wings, "#FF8A3D"); CV.boom(g, Mx[0] + Math.cos(-1.3) * 120, Mx[1] + Math.sin(-1.3) * 120, k * 1.4 - 0.4); if (k > 0.6) CV.banner(g, w, h, T("SIGNAL LOST", "انقطعت الإشارة")); }
    else { const peri = s.extra.peri || 226, rr = 120 + clamp(peri / 5, 20, 90); g.strokeStyle = "rgba(255,255,255,.45)"; g.lineWidth = 3; g.beginPath(); g.ellipse(Mx[0], Mx[1], rr * 1.35, rr, 0, 0, 7); g.stroke(); const a = (p - 0.8) * 30; CV.craft(g, Mx[0] + Math.cos(a) * rr * 1.35, Mx[1] + Math.sin(a) * rr, 1.1, a + 1.6, wings); }
  } else if (M.scene === "earth") {
    const C = [w * 0.5, h * 1.25], R0 = h * 0.62;
    if (p < 0.07) { CV.planet(g, C[0], C[1], R0, "#4FC3F7", "rgba(27,22,80,.2)", "earth"); const k = p / 0.07; CV.rocket(g, w * 0.42 + k * w * 0.12, h * 0.66 - k * h * 0.5, 1.5, 0.15 + k * 0.4, true, true); }
    else if (lost) { CV.planet(g, C[0], C[1], R0, "#4FC3F7", "rgba(27,22,80,.2)", "earth"); const k = clamp((p - 0.06) / 0.09, 0, 1); CV.rocket(g, w * 0.54 + k * w * 0.22, h * 0.16 + k * k * h * 0.62, 1.5, 0.6 + k * 1.6, true, k < 0.3); if (k > 0.85) CV.splash(g, w * 0.76, h * 0.8, (k - 0.85) / 0.15); if (k > 0.5) CV.banner(g, w, h, T("NO ORBIT", "لم يصل للمدار")); }
    else { const C2 = [w * 0.5, h * 0.56]; CV.planet(g, C2[0], C2[1], h * 0.3, "#4FC3F7", "rgba(27,22,80,.22)", "earth");
      const orb = R.x.pick("orbit"); const tilt = orb === "iss400" ? -0.45 : 0; const rx = orb === "iss400" ? h * 0.42 : h * 0.12, ry = orb === "iss400" ? h * 0.16 : h * 0.42;
      g.save(); g.translate(C2[0], C2[1]); g.rotate(tilt); g.strokeStyle = "rgba(255,255,255,.4)"; g.lineWidth = 3; g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, 7); g.stroke();
      const a = p * 50; const sx = Math.cos(a) * rx, sy = Math.sin(a) * ry; g.restore();
      const X = C2[0] + sx * Math.cos(tilt) - sy * Math.sin(tilt), Y = C2[1] + sx * Math.sin(tilt) + sy * Math.cos(tilt);
      if (orb === "atrain") for (let i = 1; i < 4; i++) { const b = a - i * 0.18; const bx = Math.cos(b) * rx, by = Math.sin(b) * ry; g.fillStyle = "#C9C2FF"; g.beginPath(); g.arc(C2[0] + bx, C2[1] + by, 6, 0, 7); g.fill(); }
      CV.craft(g, X, Y, 0.9, a, 2); }
  } else if (M.scene === "helio") {
    const C = [w * 0.5, h * 0.52], rO = h * 0.36; CV.sun(g, C[0], C[1], 34, time);
    g.strokeStyle = "rgba(255,255,255,.25)"; g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath(); g.arc(C[0], C[1], rO, 0, 7); g.stroke(); g.setLineDash([]);
    const aE = -Math.PI / 2 + p * Math.PI * 2 * 2.2; CV.planet(g, C[0] + Math.cos(aE) * rO, C[1] + Math.sin(aE) * rO, 16, "#4FC3F7", "rgba(27,22,80,.25)", "earth");
    const leo = R.x.pick("orbit") === "leo", lag = leo ? 0 : 0.08 + p * 0.55, aK = aE - lag;
    const K = leo ? [C[0] + Math.cos(aE) * rO + 30, C[1] + Math.sin(aE) * rO] : [C[0] + Math.cos(aK) * rO, C[1] + Math.sin(aK) * rO];
    const k2 = !!s.extra.k2, drifting = s.outcome === "partial" && !k2 && p > 0.56;
    const ang = k2 ? aK + Math.PI : drifting ? time : -0.6;
    g.strokeStyle = k2 ? "rgba(255,200,61,.7)" : "rgba(255,255,255,.5)"; g.lineWidth = 3; g.beginPath(); g.moveTo(K[0], K[1]); g.lineTo(K[0] + Math.cos(ang - Math.PI / 2) * 150, K[1] + Math.sin(ang - Math.PI / 2) * 150); g.stroke();
    CV.telescope(g, K[0], K[1], 0.9, ang);
    if (k2) { g.fillStyle = "#FFC83D"; g.font = "700 26px 'Baloo Bhaijaan 2', sans-serif"; g.fillText(T("K2: balanced on sunlight ☀️", "K2: متوازن على ضوء الشمس ☀️"), 30, h - 30); }
  } else {
    const C = [w * 0.5, h * 0.55], rE = h * 0.3;
    CV.planet(g, C[0], C[1], rE, "#4FC3F7", "rgba(27,22,80,.22)", "earth");
    const gs = [C[0] + Math.cos(-0.75) * rE * 0.86, C[1] + Math.sin(-0.75) * rE * 0.86];
    g.fillStyle = "#E8C78A"; g.beginPath(); g.ellipse(gs[0] - 6, gs[1] + 18, 40, 30, 0.3, 0, 7); g.fill();
    g.strokeStyle = "#1E88E5"; g.lineWidth = 5; g.beginPath(); g.moveTo(gs[0] - 2, gs[1] + 46); g.quadraticCurveTo(gs[0] - 10, gs[1] + 20, gs[0], gs[1]); g.stroke();
    g.fillStyle = "#FFC83D"; g.strokeStyle = "#1B1650"; g.lineWidth = 3; g.beginPath(); g.arc(gs[0], gs[1], 8, 0, 7); g.fill(); g.stroke();
    const low = R.x.pick("orbit") === "iss400"; let rr = rE + (low ? 50 : 85); if (low && p > 0.85) rr -= (p - 0.85) / 0.15 * 50;
    g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 3; g.beginPath(); g.ellipse(C[0], C[1], rr, rr * 0.92, 0, 0, 7); g.stroke();
    const a = (p * 30) % 1 * Math.PI * 2, sat = [C[0] + Math.cos(a) * rr, C[1] + Math.sin(a) * rr * 0.92];
    if (Math.hypot(sat[0] - gs[0], sat[1] - gs[1]) < 150) { g.strokeStyle = "#3DDBA4"; g.setLineDash([6, 6]); g.lineWidth = 3; g.beginPath(); g.moveTo(gs[0], gs[1]); g.lineTo(sat[0], sat[1]); g.stroke(); g.setLineDash([]); }
    g.save(); g.translate(sat[0], sat[1]); g.rotate(a); g.fillStyle = "#3D7BF2"; g.strokeStyle = "#1B1650"; g.lineWidth = 3; g.fillRect(-8, -14, 16, 28); g.strokeRect(-8, -14, 16, 28); if (R.x.pick("power") === "deploy") { g.fillRect(-34, -8, 22, 16); g.strokeRect(-34, -8, 22, 16); g.fillRect(12, -8, 22, 16); g.strokeRect(12, -8, 22, 16); } g.restore();
  }
  drawEndBanner(g, w, h, R, lost);
}
function drawEndBanner(g, w, h, R, lost) {
  const s = R.sim, M = R.M;
  if (s.done) { const res = R.D.result ? R.D.result.outcome : s.outcome; const map = { success: [T("MISSION SUCCESS!", "نجحت المهمة!"), "#3DDBA4"], rescued: [T("MISSION RESCUED!", "أُنقذت المهمة!"), "#FFC83D"], partial: [T("PARTIAL SUCCESS", "نجاح جزئي"), "#F26B3A"], lost: [T("MISSION LOST", "فُقدت المهمة"), "#FF5A5F"] }[res];
    if (!(lost && M.scene !== "helio")) CV.banner(g, w, h, map[0], map[1]); }
}

/* ---------- Engineer-level scenes: launch pad (Vanguard) and rescue (Swift) ---------- */
function drawPad(g, w, h, k, stars, time, okFlight) {
  CV.bg(g, w, h, stars, time);
  g.fillStyle = "#2A5BD0"; g.fillRect(0, h * 0.82, w, h * 0.18);
  g.fillStyle = "#3DDBA4"; g.fillRect(0, h * 0.82, w, 10);
  const x0 = w * 0.5, base = h * 0.82;
  g.strokeStyle = "#9AA6C8"; g.lineWidth = 6; g.beginPath(); g.moveTo(x0 - 110, base); g.lineTo(x0 - 110, base - 330); g.stroke();
  for (let i = 0; i < 7; i++) { g.lineWidth = 3; g.beginPath(); g.moveTo(x0 - 110, base - 40 - i * 44); g.lineTo(x0 - 60, base - 60 - i * 44); g.stroke(); }
  let lift = 0, fall = 0, boomK = -1;
  if (okFlight) lift = k * k * 900;
  else { if (k < 0.3) lift = (k / 0.3) * 14; else if (k < 0.45) lift = 14 - ((k - 0.3) / 0.15) * 24; else { lift = -10; boomK = (k - 0.45) / 0.45; } }
  if (boomK < 0.2) CV.rocket(g, x0, base - 120 - lift, 2.6, fall, true, k > 0.02 && (okFlight || k < 0.35));
  if (boomK >= 0) { CV.boom(g, x0, base - 80, boomK); if (boomK > 0.15) { const sx = x0 + 60 + boomK * 220, sy = base - 10; g.fillStyle = "#DCE3F5"; g.strokeStyle = "#1B1650"; g.lineWidth = 3; g.beginPath(); g.arc(sx, sy, 12, 0, 7); g.fill(); g.stroke(); g.fillStyle = "#FFC83D"; g.font = "700 22px sans-serif"; if (Math.sin(time * 8) > 0) g.fillText("beep!", sx + 16, sy - 16); } }
  g.fillStyle = "#fff"; g.font = "700 24px 'Baloo Bhaijaan 2', sans-serif"; g.fillText(T("Cape Canaveral, 6 Dec 1957", "كيب كانافيرال، 6 ديسمبر 1957"), 24, 40);
  if (!okFlight && k > 0.55) CV.banner(g, w, h, T("LAUNCH FAILED", "فشل الإطلاق"));
}
function drawRescue(g, w, h, st, stars, time) {
  // st: {p, swiftAlt (0..1), linkPos (0..1), spin, captured, demo, lost, reentry}
  CV.bg(g, w, h, stars, time);
  CV.planet(g, w * 0.5, h * 1.78, h * 1.0, "#4FC3F7", "rgba(27,22,80,.2)", "earth");
  g.strokeStyle = "rgba(255,255,255,.25)"; g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath(); g.arc(w * 0.5, h * 1.78, h * 1.0 + 210, Math.PI * 1.25, Math.PI * 1.75); g.stroke(); g.setLineDash([]);
  const sy = h * 0.72 - st.swiftAlt * 300, sx = w * 0.62;
  if (st.reentry) { g.fillStyle = "rgba(255,138,61,.6)"; g.beginPath(); g.arc(sx, sy, 40 + Math.sin(time * 10) * 6, 0, 7); g.fill(); }
  if (!st.lost) CV.telescope(g, sx, sy, 1.2, Math.sin(time) * 0.03);
  const lx = st.captured ? sx - 70 : w * 0.08 + st.linkPos * (sx - 150 - w * 0.08), ly = st.captured ? sy : sy + (1 - st.linkPos) * 40;
  if (!st.lost) CV.craft(g, lx, ly, 1.1, st.spin ? time * 5 : 0, 2, "#C9C2FF");
  if (st.captured) { g.strokeStyle = "#FFC83D"; g.lineWidth = 4; g.beginPath(); g.moveTo(lx + 16, ly - 10); g.lineTo(sx - 30, sy - 20); g.moveTo(lx + 16, ly + 10); g.lineTo(sx - 30, sy + 20); g.stroke(); }
  if (st.lost) CV.boom(g, sx - 40, sy, (time % 1.5) / 1.5);
  g.fillStyle = "#fff"; g.font = "700 22px 'Baloo Bhaijaan 2', sans-serif";
  g.fillText(T(`Swift height ≈ ${Math.round(380 + st.swiftAlt * 220)} km`, `ارتفاع سويفت ≈ ${Math.round(380 + st.swiftAlt * 220)} كم`), 24, 40);
  if (st.spin) { g.fillStyle = "#FF5A5F"; g.fillText(T("LINK spinning ~9°/s!", "«لينك» تدور ~9°/ث!"), 24, 72); }
}
function drawCrashExtra(g, w, h, M, p, stars, time) {
  if (M.scene === "pad") { drawPad(g, w, h, p, stars, time, false); return true; }
  if (M.scene === "rescue") {
    drawRescue(g, w, h, { swiftAlt: 0.6 - p * 0.6, linkPos: Math.min(1, p * 1.2) * 0.75, spin: p > 0.35, captured: false, reentry: p > 0.8 }, stars, time);
    if (p > 0.85) CV.banner(g, w, h, T("RESCUE FAILED", "فشل الإنقاذ"));
    return true;
  }
  return false;
}
function drawFlightExtra(g, w, h, R, time) {
  const s = R.sim, p = s.p, M = R.M;
  if (M.scene === "pad") {
    if (s.outcome === "lost") { drawPad(g, w, h, clamp(p / 0.09, 0, 1), R.stars, time, false); return true; }
    if (p < 0.08) { drawPad(g, w, h, p / 0.08, R.stars, time, true); return true; }
    CV.bg(g, w, h, R.stars, time); const C = [w * 0.5, h * 0.56]; CV.planet(g, C[0], C[1], h * 0.28, "#4FC3F7", "rgba(27,22,80,.22)", "earth");
    const low = R.x.pick("orbit") === "low", rx = low ? h * 0.36 : h * 0.62, ry = low ? h * 0.34 : h * 0.4;
    g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 2.5; g.beginPath(); g.ellipse(C[0] + (low ? 0 : h * 0.2), C[1], rx, ry, 0, 0, 7); g.stroke();
    const a = p * 40, X = C[0] + (low ? 0 : h * 0.2) + Math.cos(a) * rx, Y = C[1] + Math.sin(a) * ry;
    g.fillStyle = "#DCE3F5"; g.strokeStyle = "#1B1650"; g.lineWidth = 3; g.beginPath(); g.arc(X, Y, 9, 0, 7); g.fill(); g.stroke();
    g.strokeStyle = "#DCE3F5"; g.lineWidth = 2; for (let i = 0; i < 4; i++) { const b = i * 1.57 + 0.6; g.beginPath(); g.moveTo(X, Y); g.lineTo(X + Math.cos(b) * 22, Y + Math.sin(b) * 22); g.stroke(); }
    return true;
  }
  if (M.scene === "rescue") {
    const spinPath = !!R.x.flag("acsNew") && !R.x.has("hil");
    const demo = !!s.extra.demo, lost = s.outcome === "lost" && p >= (s.lostAt || 1) - 0.01;
    const capT = 0.45, boostT = 0.55;
    let alt = 0.45 - p * 0.3, link = Math.min(1, p / capT), captured = !spinPath && p >= capT;
    if (captured && p >= boostT) alt = Math.min(1, 0.45 - boostT * 0.3 + (p - boostT) * 2.2);
    if (spinPath) { link = Math.min(0.6, p / 0.4); alt = 0.45 - p * 0.45; }
    drawRescue(g, w, h, { swiftAlt: clamp(alt, 0, 1), linkPos: link, spin: spinPath && p > 0.08 && p < (demo ? 0.3 : 1), captured, reentry: spinPath && p > 0.85, lost }, R.stars, time);
    return true;
  }
  return false;
}

/* ---------- Cadet scenes: the Moon (Lunar Sprout) and the Mars ground (Rover Ruby) ---------- */
function drawMoon(g, w, h, st, stars, time) {
  g.save(); try { g.direction = "ltr"; g.textAlign = "left"; } catch (e) {}
  // st: {light 0..1, descend 0..1 (1 = landed), sprout 0..1, frozen, tilt}
  CV.bg(g, w, h, stars, time);
  const L = clamp(st.light, 0, 1);
  // Earth in the sky and the Sun (sinks at night)
  CV.planet(g, w * 0.82, h * 0.2, h * 0.08, "#4FC3F7", "rgba(27,22,80,.25)", "earth");
  const sunY = h * (0.12 + (1 - L) * 0.7);
  if (L > 0.05) { g.fillStyle = "#FFC83D"; g.strokeStyle = "#1B1650"; g.lineWidth = 3; g.beginPath(); g.arc(w * 0.16, sunY, 30, 0, 7); g.fill(); g.stroke(); }
  // ground with craters
  g.fillStyle = "#B9BED3"; g.beginPath(); g.moveTo(0, h * 0.74); g.quadraticCurveTo(w * 0.3, h * 0.7, w * 0.55, h * 0.75); g.quadraticCurveTo(w * 0.8, h * 0.79, w, h * 0.72); g.lineTo(w, h); g.lineTo(0, h); g.fill();
  g.fillStyle = "#9CA2BC"; [[0.2, 0.86, 40], [0.7, 0.9, 56], [0.9, 0.82, 22]].forEach(c => { g.beginPath(); g.ellipse(w * c[0], h * c[1], c[2], c[2] * 0.3, 0, 0, 7); g.fill(); });
  // lander
  const lx = w * 0.48, gy = h * 0.76, ly = gy - (1 - clamp(st.descend, 0, 1)) * h * 0.6;
  g.save(); g.translate(lx, ly); g.rotate(st.tilt || 0);
  g.strokeStyle = "#1B1650"; g.lineWidth = 4; g.beginPath(); g.moveTo(-30, -20); g.lineTo(-52, 0); g.moveTo(30, -20); g.lineTo(52, 0); g.stroke();
  g.fillStyle = "#DCE3F5"; g.beginPath(); g.ellipse(-52, 0, 10, 3, 0, 0, 7); g.ellipse(52, 0, 10, 3, 0, 0, 7); g.fill();
  g.fillStyle = "#F2B33D"; g.strokeStyle = "#1B1650"; g.lineWidth = 3; g.fillRect(-34, -62, 68, 44); g.strokeRect(-34, -62, 68, 44);
  // solar panel
  g.fillStyle = "#3C59D6"; g.fillRect(36, -88, 54, 26); g.strokeRect(36, -88, 54, 26); g.beginPath(); g.moveTo(34, -60); g.lineTo(44, -62); g.stroke();
  // greenhouse dome
  g.fillStyle = st.frozen ? "rgba(200,230,255,.85)" : "rgba(160,240,220,.55)"; g.beginPath(); g.arc(0, -62, 26, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
  const s = clamp(st.sprout, 0, 1);
  if (s > 0) { const col = st.frozen ? "#8FB4C9" : "#3DDBA4"; g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -62); g.lineTo(0, -62 - 18 * s); g.stroke(); g.fillStyle = col; g.beginPath(); g.ellipse(-7 * s, -62 - 14 * s, 7 * s, 3.5 * s, -0.5, 0, 7); g.ellipse(7 * s, -62 - 18 * s, 7 * s, 3.5 * s, 0.5, 0, 7); g.fill(); }
  if (st.frozen) { g.strokeStyle = "#E8F6FF"; g.lineWidth = 2; for (let i = 0; i < 5; i++) { const a = Math.PI + 0.3 + i * 0.6; g.beginPath(); g.moveTo(Math.cos(a) * 26, -62 + Math.sin(a) * 26); g.lineTo(Math.cos(a) * 16, -62 + Math.sin(a) * 16); g.stroke(); } }
  g.restore();
  if (st.descend < 1) { g.fillStyle = "rgba(255,200,61,.8)"; g.beginPath(); g.moveTo(lx - 10, ly - 18); g.lineTo(lx + 10, ly - 18); g.lineTo(lx, ly + 14 + Math.sin(time * 30) * 5); g.fill(); }
  // night shade
  if (L < 1) { g.fillStyle = `rgba(8,6,40,${(1 - L) * 0.62})`; g.fillRect(0, 0, w, h); }
  if (st.frozen) { g.fillStyle = "#E8F6FF"; for (let i = 0; i < 30; i++) { const x = (i * 131 + time * 20) % w, y = (i * 71 + time * 35) % h; g.fillRect(x, y, 2, 2); } }
  g.fillStyle = "#fff"; g.font = "700 22px 'Baloo Bhaijaan 2', sans-serif";
  g.fillText(L > 0.5 ? T("Moon day: ≈ +120°C", "نهار القمر: ≈ +120 درجة") : T("Moon night: ≈ −130°C", "ليل القمر: ≈ −130 درجة"), 24, 40);
  g.restore();
}
function drawMarsGround(g, w, h, st, stars, time) {
  g.save(); try { g.direction = "ltr"; g.textAlign = "left"; } catch (e) {}
  // st: {descend, rx 0..1, storm 0..1, dusty 0..1, asleep, shake}
  const S = clamp(st.storm, 0, 1);
  const sky = g.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, "#F2B48A"); sky.addColorStop(1, "#E58A5C"); g.fillStyle = sky; g.fillRect(0, 0, w, h);
  g.fillStyle = "#FFE3B0"; g.beginPath(); g.arc(w * 0.78, h * 0.18, 22, 0, 7); g.fill();
  g.fillStyle = "#C9653A"; g.beginPath(); g.moveTo(0, h * 0.6); g.quadraticCurveTo(w * 0.2, h * 0.5, w * 0.4, h * 0.6); g.quadraticCurveTo(w * 0.7, h * 0.52, w, h * 0.62); g.lineTo(w, h); g.lineTo(0, h); g.fill();
  g.fillStyle = "#D9774A"; g.fillRect(0, h * 0.72, w, h * 0.28);
  g.fillStyle = "#8E3F22"; [[0.15, 0.8, 16], [0.62, 0.86, 22], [0.85, 0.76, 12], [0.4, 0.92, 10]].forEach(r => { g.beginPath(); g.ellipse(w * r[0], h * r[1], r[2] * 1.4, r[2], 0, Math.PI, 0); g.fill(); });
  const gy = h * 0.82, x = w * (0.15 + clamp(st.rx, 0, 1) * 0.6) + (st.shake ? Math.sin(time * 40) * 3 : 0);
  const y = gy - (1 - clamp(st.descend, 0, 1)) * h * 0.7;
  if (st.descend < 1) { g.strokeStyle = "#fff"; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - 70); g.lineTo(x - 30, y - 140); g.moveTo(x, y - 70); g.lineTo(x + 30, y - 140); g.stroke(); g.fillStyle = "#FF8A3D"; g.beginPath(); g.arc(x, y - 150, 40, Math.PI, 0); g.fill(); }
  // rover
  g.strokeStyle = "#1B1650"; g.lineWidth = 3;
  [-34, 0, 34].forEach(dx => { g.fillStyle = "#4A4A6A"; g.beginPath(); g.arc(x + dx, y - 10, 11, 0, 7); g.fill(); g.stroke(); });
  g.fillStyle = "#F4F6FF"; g.fillRect(x - 44, y - 44, 88, 26); g.strokeRect(x - 44, y - 44, 88, 26);
  const tilt = st.shake ? Math.sin(time * 18) * 0.15 : 0;
  g.save(); g.translate(x, y - 48); g.rotate(tilt);
  g.fillStyle = "#3C59D6"; g.fillRect(-58, -8, 116, 10); g.strokeRect(-58, -8, 116, 10);
  if (st.dusty > 0) { g.fillStyle = `rgba(201,101,58,${clamp(st.dusty, 0, 1) * 0.95})`; g.fillRect(-58, -8, 116, 10); }
  g.restore();
  g.fillStyle = "#F4F6FF"; g.fillRect(x + 22, y - 86, 8, 36); g.strokeRect(x + 22, y - 86, 8, 36);
  g.fillStyle = "#F4F6FF"; g.fillRect(x + 12, y - 100, 28, 16); g.strokeRect(x + 12, y - 100, 28, 16);
  g.fillStyle = st.asleep ? "#555" : "#3DDBA4"; g.beginPath(); g.arc(x + 20, y - 92, 4, 0, 7); g.arc(x + 32, y - 92, 4, 0, 7); g.fill();
  if (st.asleep) { g.fillStyle = "#fff"; g.font = "800 26px sans-serif"; const b = (time * 0.6) % 1; g.globalAlpha = 1 - b; g.fillText("z", x + 46, y - 110 - b * 40); g.fillText("Z", x + 60, y - 130 - b * 50); g.globalAlpha = 1; }
  // dust storm overlay
  if (S > 0) { g.fillStyle = `rgba(150,70,35,${S * 0.6})`; g.fillRect(0, 0, w, h); g.fillStyle = `rgba(230,150,100,${S * 0.7})`; for (let i = 0; i < 80; i++) { const px = (i * 97 + time * 260) % (w + 40) - 20, py = (i * 53) % h; g.fillRect(px, py, 10, 2); } }
  g.fillStyle = "#fff"; g.font = "700 22px 'Baloo Bhaijaan 2', sans-serif";
  g.fillText(S > 0.3 ? T("Dust storm! Sunlight ≈ 10%", "عاصفة غبار! ضوء الشمس ≈ 10%") : T("Mars: sunlight ≈ 43% of Earth’s", "المريخ: ضوء الشمس ≈ 43% من الأرض"), 24, 40);
  g.restore();
}
function moonLight(p, peak) { if (p < 0.45 || p > 0.75) return 1; const n = Math.min(1, Math.min(p - 0.45, 0.75 - p) / 0.04); return 1 - n * (peak ? 0.25 : 1); }
const _crashExtra0 = drawCrashExtra, _flightExtra0 = drawFlightExtra;
drawCrashExtra = function (g, w, h, M, p, stars, time) {
  if (M.scene === "moon") {
    const light = p < 0.5 ? 1 : 1 - clamp((p - 0.5) / 0.12, 0, 1);
    drawMoon(g, w, h, { light, descend: clamp(p / 0.15, 0, 1), sprout: clamp((p - 0.2) / 0.2, 0, 1), frozen: p > 0.68 }, stars, time);
    if (p > 0.85) CV.banner(g, w, h, T("FROZEN", "تجمّدت"));
    return true;
  }
  if (M.scene === "marsground") {
    drawMarsGround(g, w, h, { descend: clamp(p / 0.15, 0, 1), rx: clamp((p - 0.15) / 0.35, 0, 1), storm: clamp((p - 0.45) / 0.15, 0, 1) * (p > 0.85 ? 0.6 : 1), dusty: clamp((p - 0.5) / 0.2, 0, 1), asleep: p > 0.72 }, stars, time);
    if (p > 0.85) CV.banner(g, w, h, T("ASLEEP FOREVER", "نامت للأبد"));
    return true;
  }
  return _crashExtra0(g, w, h, M, p, stars, time);
};
drawFlightExtra = function (g, w, h, R, time) {
  const s = R.sim, p = s.p, M = R.M, x = R.x;
  const lost = s.outcome === "lost" && p >= (s.lostAt || 1) - 0.01;
  if (M.scene === "moon") {
    const peak = x.pick("orbit") === "peak", green = (x.pick("instr") || []).includes("green");
    const frozen = lost || (s.outcome === "partial" && p > 0.55);
    drawMoon(g, w, h, { light: lost ? 0.15 : moonLight(p, peak), descend: clamp((p - 0.02) / 0.06, 0, 1), sprout: green ? clamp((p - 0.16) / 0.2, 0, 1) : 0, frozen, tilt: s.sciMult < 0.75 && p > 0.09 ? 0.12 : 0 }, R.stars, time);
    return true;
  }
  if (M.scene === "marsground") {
    const safe = !!x.flag("rtg") || !!x.flag("tilt");
    const storm = p > 0.45 && p < 0.62 ? 1 : (p > 0.42 && p <= 0.45 ? (p - 0.42) / 0.03 : (p >= 0.62 && p < 0.66 ? 1 - (p - 0.62) / 0.04 : 0));
    const dusty = safe || s.extra.tiltAdded ? (p > 0.45 && p < 0.52 ? 0.6 : 0.1) : (p > 0.45 ? (x.flag("windy") && p > 0.66 ? 0.15 : 0.8) : p * 0.4);
    const asleep = lost || (p > 0.5 && p < 0.62 && !x.flag("rtg"));
    drawMarsGround(g, w, h, { descend: clamp((p - 0.02) / 0.08, 0, 1), rx: lost ? clamp((s.lostAt || 0.5) - 0.1, 0, 1) * 1.1 : clamp((p - 0.1) * 1.1, 0, 1), storm: lost ? 0.5 : storm, dusty, asleep, shake: (!!x.flag("tilt") || !!s.extra.tiltAdded) && p > 0.5 && p < 0.54 }, R.stars, time);
    return true;
  }
  return _flightExtra0(g, w, h, R, time);
};
