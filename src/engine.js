/* ===================== SECOND CHANCE v2 — engine (budgets, checks, scoring) ===================== */
"use strict";
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function fmt(v, d) { d = d || 0; const k = Math.pow(10, d); return (Math.round(v * k) / k).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }); }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const nfmt = v => Number.isInteger(v) ? fmt(v) : fmt(v, Math.abs(v) < 1 ? 2 : 1);

const G = {
  screen: "title", lang: "en", sound: true, mode: "engineer",
  crew: { n: 1, names: ["", "", "", ""], owner: { sci: 0, eng: 0, nav: 0, pm: 0 } },
  mid: null, designs: {}, attempts: {}, best: loadBest(), speed: 1
};
function loadBest() { try { return JSON.parse(localStorage.getItem("secondChance2.best") || "{}") || {}; } catch (e) { return {}; } }
function saveBest() { try { localStorage.setItem("secondChance2.best", JSON.stringify(G.best)); } catch (e) { /* storage off */ } }

function mission(id) { return MISSIONS.find(m => m.id === (id || G.mid)); }
function stepsFor(M) { return M.open ? ["intro", "objective", "build", "launch", "tests", "poll", "flight", "closed"] : ["crash", "investigate", "objective", "build", "launch", "tests", "poll", "flight", "closed"]; }
function newDesign() { return { goal: null, extra: [], picks: {}, step: 0, maxStep: 0, votes: {}, clues: [], diag: { q: 0, tries: 0, wrong: 0, done: false }, stats: { noGo: 0, pendingFix: false, fixed: false }, launched: false, result: null, seen: {}, track: { acts: { sci: 0, eng: 0, nav: 0, pm: 0 }, hints: 0, swaps: 0, polls: [], time: {} } }; }
function design() { if (!G.designs[G.mid]) G.designs[G.mid] = newDesign(); return G.designs[G.mid]; }
function slot(M, id) { return M.slots.find(s => s.id === id); }
function optOf(M, D, sid) {
  const s = slot(M, sid); if (!s) return null;
  const v = D.picks[sid];
  if (s.multi) return (v || []).map(id => s.opts.find(o => o.id === id)).filter(Boolean);
  return s.opts.find(o => o.id === v) || null;
}
function budgetOf(M) { return M.env.budget * MODES[G.mode].money; }
function deadlineOf(M) { return M.env.deadline + MODES[G.mode].deadlineAdd; }
function pdefault(i) { return T(`Player ${i + 1}`, `لاعب ${i + 1}`); }
function pname(i) { const n = (G.crew.names[i] || "").trim(); return n || pdefault(i); }
function playerFor(role) { return pname(G.crew.owner[role] || 0); }
function money(M, v) { return `$${fmt(v, M.env.money ? 2 : 0)}M`; }
function kg(M, v) { return `${fmt(v, M.env.mass ? 1 : 0)} ${T("kg", "كغ")}`; }
function goalList(M) { return { prim: M.goals.primary, sec: M.goals.secondaryFromPrimary ? M.goals.primary : M.goals.secondary }; }
function selectedGoals(M, D) {
  const { prim, sec } = goalList(M), out = [];
  const p = prim.find(g => g.id === D.goal); if (p) out.push(p);
  D.extra.forEach(id => { if (id === D.goal) return; const g = sec.find(x => x.id === id); if (g) out.push(g); });
  return out;
}

function calc(M, D) {
  const e = M.env;
  const r = { mass: M.fixed.m, load: M.fixed.p, cost: M.fixed.cost, gen: 0, wh: 0, data: 0, rate: 0, months: e.base, u: 0,
    ucap: null, mcap: null, cap: null, life: 1, sciM: 1, dataM: 1, flags: {}, launcher: null, orbit: null, U: 0, budget: budgetOf(M) };
  const bus = optOf(M, D, "bus"); if (bus) r.U = bus.flags.U;
  M.slots.forEach(s => {
    const v = optOf(M, D, s.id);
    (s.multi ? v : (v ? [v] : [])).forEach(o => {
      r.mass += o.m || 0; r.load += o.p || 0; r.cost += o.cost || 0; r.wh += o.wh || 0;
      r.data += o.data || 0; r.rate += o.rate || 0; r.months += o.mo || 0; r.u += o.u || 0;
      r.gen += (o.gen || 0) + (o.genU ? o.genU * r.U : 0);
      if (o.ucap != null) r.ucap = o.ucap; if (o.mcap != null) r.mcap = o.mcap;
      if (o.life) r.life *= o.life; if (o.sciM) r.sciM *= o.sciM; if (o.dataM) r.dataM *= o.dataM;
      if (s.kind === "launcher") { r.cap = o.cap; r.launcher = o; }
      if (s.kind === "orbit") r.orbit = o;
      Object.assign(r.flags, o.flags || {});
    });
  });
  r.gen *= e.solar;
  r.down = r.rate * r.dataM;
  r.ratio = r.data > 0 ? r.down / r.data : 2;
  r.needWh = r.load * Math.max(e.eclipseH, 0.3) / e.dod;
  const goals = selectedGoals(M, D), gtags = new Set();
  goals.forEach(g => (g.tags || []).forEach(t => gtags.add(t)));
  const instr = optOf(M, D, "instr") || [];
  r.instr = instr;
  r.off = instr.filter(o => !o.tags.some(t => gtags.has(t)));
  r.sciPot = instr.filter(o => o.tags.some(t => gtags.has(t))).reduce((a, o) => a + o.sci, 0);
  const x = { pick: id => D.picks[id] };
  r.goalsMet = goals.map(g => ({ g, met: g.check ? !!g.check(x) : instr.some(o => o.tags.some(t => (g.tags || []).includes(t))) }));
  if (r.flags.rough && instr.length) r.sciM *= 0.6;
  r.calM = (D.picks.tests || []).includes("cal") ? 1.1 : 1;
  r.orbitOk = !r.launcher || !r.orbit || !r.launcher.orbits || r.launcher.orbits.includes(r.orbit.id);
  return r;
}

/* Each check belongs to a role, has a status (go / warn / nogo / wait) and a plain-language reason. */
function checks(M, D, c) {
  const out = [];
  const add = (role, key, label, status, why, hard) => out.push({ role, key, label, status, why, hard: !!hard });
  const pm0 = c.goalsMet[0];
  if (!pm0) add("sci", "obj", B("Main question", "السؤال الرئيسي"), "wait", B("Choose a question first.", "اختر سؤالًا أولًا."), true);
  else add("sci", "obj", B("Main question", "السؤال الرئيسي"), pm0.met ? "go" : "nogo", pm0.met ? B("An instrument answers it.", "هناك جهاز يجيب عنه.") : B("No instrument on board answers your main question!", "لا يوجد جهاز يجيب عن سؤالك الرئيسي!"));
  c.goalsMet.slice(1).forEach(gm => add("sci", "goal-" + gm.g.id, gm.g.n, gm.met ? "go" : "warn", gm.met ? B("Covered.", "مُغطّى.") : B("You chose this goal, but nothing covers it.", "اخترت هذا الهدف لكن لا شيء يغطيه.")));
  if (c.off.length) add("sci", "off", B("Extra instruments", "أجهزة زائدة"), "warn", B(`${c.off.map(o => L(o.n)).join(", ")}: not needed for your questions.`, `${c.off.map(o => L(o.n)).join("، ")}: غير مطلوب لأسئلتك.`));
  if (c.mcap != null) {
    add("eng", "busmass", B("Weight inside the CubeSat", "الوزن داخل الكيوب سات"), c.mass > c.mcap ? "nogo" : (c.mass > c.mcap * 0.9 ? "warn" : "go"), B(`${kg(M, c.mass)} of ${kg(M, c.mcap)} allowed.`, `${kg(M, c.mass)} من ${kg(M, c.mcap)} مسموح.`), c.mass > c.mcap);
    add("eng", "volume", B("Space inside", "المساحة الداخلية"), c.u > c.ucap ? "nogo" : (c.u > c.ucap * 0.9 ? "warn" : "go"), B(`${fmt(c.u, 1)} of ${fmt(c.ucap, 1)} units used.`, `${fmt(c.u, 1)} من ${fmt(c.ucap, 1)} وحدة مستخدمة.`), c.u > c.ucap);
  }
  if (c.cap == null) add("eng", "mass", B("Weight vs rocket", "الوزن مقابل الصاروخ"), "wait", B("Pick a rocket to know the limit.", "اختر صاروخًا لتعرف الحد."), true);
  else { const m = (c.cap - c.mass) / c.cap;
    add("eng", "mass", B("Weight vs rocket", "الوزن مقابل الصاروخ"), m < 0 ? "nogo" : (m < 0.1 ? "warn" : "go"),
      m < 0 ? B(`${kg(M, c.mass - c.cap)} too heavy for this rocket!`, `أثقل من قدرة الصاروخ بـ ${kg(M, c.mass - c.cap)}!`) : B(`${Math.round(m * 100)}% spare.${m < 0.1 ? " Engineers like at least 10%." : ""}`, `${Math.round(m * 100)}% هامش.${m < 0.1 ? " المهندسون يفضلون 10% على الأقل." : ""}`), m < 0); }
  if (MODES[G.mode].rules === "strict" && c.cap != null && c.mass <= c.cap && (c.cap - c.mass) / c.cap < 0.1) add("eng", "rule-mass", B("Flight rule: weight margin", "قاعدة الطيران: هامش الوزن"), "nogo", B("Flight Directors may not launch with less than 10% weight margin.", "لا يُسمح لمدير الطيران بالإطلاق بهامش وزن أقل من 10%."), true);
  if (MODES[G.mode].rules === "strict" && c.gen > 0 && (c.gen - c.load) / c.load < 0.1) add("eng", "rule-power", B("Flight rule: power margin", "قاعدة الطيران: هامش الطاقة"), "nogo", B("Flight Directors need at least 10% spare power.", "مدير الطيران يحتاج 10% طاقة احتياطية على الأقل."), true);
  if (c.gen <= 0) add("eng", "power", B("Power", "الطاقة"), "wait", B("Add solar power.", "أضف طاقة شمسية."), true);
  else { const pm = (c.gen - c.load) / c.load;
    add("eng", "power", B("Power", "الطاقة"), pm < 0 ? "nogo" : (pm < 0.1 ? "warn" : "go"), B(`Makes ${fmt(c.gen)} W, uses ${fmt(c.load)} W.`, `ينتج ${fmt(c.gen)} واط ويستهلك ${fmt(c.load)} واط.`)); }
  if (c.wh <= 0) add("eng", "battery", B("Battery", "البطارية"), "wait", B("Add a battery.", "أضف بطارية."), true);
  else add("eng", "battery", B("Battery", "البطارية"), c.wh < c.needWh ? "nogo" : "go", B(`${fmt(c.wh)} Wh carried, ${fmt(c.needWh)} Wh needed.`, `${fmt(c.wh)} واط·ساعة متوفرة، والمطلوب ${fmt(c.needWh)}.`));
  if (!c.orbit) add("nav", "orbit", B("Orbit", "المدار"), "wait", B("Choose an orbit.", "اختر مدارًا."), true);
  else add("nav", "orbit", B("Orbit vs rocket", "المدار مقابل الصاروخ"), c.orbitOk ? "go" : "nogo", c.orbitOk ? c.orbit.n : B("This rocket can’t take you to that orbit!", "هذا الصاروخ لا يستطيع إيصالك لهذا المدار!"), !c.orbitOk);
  if (c.rate <= 0) add("nav", "data", B("Radio", "الراديو"), "wait", B("Add a radio.", "أضف راديو."), true);
  else add("nav", "data", B("Data home", "البيانات إلى الأرض"), c.ratio < 0.6 ? "nogo" : (c.ratio < 1 ? "warn" : "go"),
    c.data > 0 ? B(`Sends ${fmt(c.down, 1)}, makes ${fmt(c.data, 1)} Gb a day.`, `يرسل ${fmt(c.down, 1)} وينتج ${fmt(c.data, 1)} غيغابت يوميًا.`) : B("Very little data to send.", "بيانات قليلة جدًا."));
  add("pm", "budget", B("Money", "الميزانية"), c.cost > c.budget ? "nogo" : (c.cost > c.budget * 0.97 ? "warn" : "go"), B(`${money(M, c.cost)} of ${money(M, c.budget)}.`, `${money(M, c.cost)} من ${money(M, c.budget)}.`), c.cost > c.budget);
  add("pm", "schedule", B("Time", "الوقت"), c.months > deadlineOf(M) ? "nogo" : (c.months > deadlineOf(M) - 1 ? "warn" : "go"), B(`${fmt(c.months, 1)} of ${deadlineOf(M)} months.`, `${fmt(c.months, 1)} من ${deadlineOf(M)} شهرًا.`), c.months > deadlineOf(M));
  const tests = D.picks.tests || [];
  add("pm", "tests", B("Tests", "الاختبارات"), tests.length ? "go" : "warn", tests.length ? B(`${tests.length} planned.`, `${tests.length} مخطط.`) : B("Nothing will be tested before flight!", "لن يُختبر أي شيء قبل الطيران!"));
  return out;
}

/* ---------- flight simulation ---------- */
let RUN = null;
function makeCtx(M, D, c) {
  return { M, D, c,
    pick: id => { const s = slot(M, id); const v = D.picks[id]; return s && s.multi ? (v || []) : v; },
    opt: id => optOf(M, D, id), has: id => (D.picks.tests || []).includes(id),
    goal: id => D.goal === id || D.extra.includes(id), flag: k => c.flags[k] };
}
function startFlight() {
  const M = mission(), D = design(), c = calc(M, D);
  const sim = { outcome: "success", lifeMult: 1, sciMult: 1, dataBoost: 0, extra: {}, log: [], decisions: [], lostAt: null, p: 0, paused: false, done: false, down: 0, series: [], marks: [], lastSample: -1,
    say(txt, tone, expr) { this.log.push({ p: this.p, txt, tone: tone || "info", expr }); if (tone === "bad" || tone === "warn" || tone === "good") this.marks.push({ p: this.p, tone }); },
    lose(t, txt) { this.outcome = "lost"; this.lostAt = t; this.say(txt, "bad", "shocked"); } };
  const x = makeCtx(M, D, c);
  const items = LOGIC[M.id].timeline(x).sort((a, b) => a.t - b.t);
  const ev = MODES[G.mode].events;
  let items2 = items.filter(it => !it.decision || !(it.decision.id === "backlog" || it.decision.id === "budget") || ev.includes("ops"));
  if (ev.includes("glitch")) items2.push(evGlitch(0.76));
  if (ev.includes("cell")) items2.push(evCell(0.5, x));
  items2.sort((a, b) => a.t - b.t);
  items.length = 0; items2.forEach(i => items.push(i));
  RUN = { mid: M.id, M, D, c, x, sim, items, idx: 0, last: 0, raf: 0, shown: 0, pending: null, stars: makeStars() };
}
function makeStars() { const a = []; let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; for (let i = 0; i < 140; i++) a.push([rnd(), rnd(), rnd() * 1.8 + 0.4, rnd() * 6]); return a; }

function score(R) {
  const { M, D, c, sim, x } = R;
  const dataF = c.ratio < 1 ? Math.min(1, c.ratio + sim.dataBoost * (1 - c.ratio)) : 1;
  const powerF = c.gen > 0 && c.gen < c.load ? c.gen / c.load : 1;
  const battF = c.wh < c.needWh ? 0.85 : 1;
  const lifeF = Math.min(1.25, c.life * sim.lifeMult);
  const lostF = sim.outcome === "lost" ? 0 : 1;
  const achieved = c.sciPot * c.calM * dataF * powerF * battF * sim.sciMult * c.sciM * lifeF * lostF;
  const sci = Math.round(clamp(100 * achieved / M.env.refSci, 0, 100));
  let outcome = sim.outcome;
  if (outcome === "success" && (powerF < 1 || battF < 1)) outcome = "partial";
  const perf = outcome === "success" ? 100 : outcome === "rescued" ? 92 : outcome === "partial" ? Math.round(45 + 25 * Math.min(1, lifeF)) : 0;
  // launch margins (what engineers actually review)
  const cap = c.mcap != null ? c.mcap : c.cap;
  const margins = { mass: (cap - c.mass) / cap, power: c.load ? (c.gen - c.load) / c.load : 0, battery: c.needWh ? (c.wh - c.needWh) / c.needWh : 1, data: c.ratio - 1, budget: (c.budget - c.cost) / c.budget, time: (deadlineOf(M) - c.months) / deadlineOf(M) };
  const bS = c.cost <= c.budget ? 80 + Math.min(20, margins.budget * 200) : 0;
  const mS = margins.mass < 0 ? 0 : margins.mass < 0.05 ? 55 : margins.mass < 0.1 ? 75 : margins.mass <= 0.35 ? 100 : 75;
  const pS = margins.power < 0 ? 15 : margins.power < 0.1 ? 65 : margins.power <= 0.6 ? 100 : 85;
  const btS = margins.battery < 0 ? 30 : margins.battery < 0.2 ? 80 : 100;
  const dS = c.ratio < 1 ? Math.round(100 * c.ratio) : c.ratio <= 3 ? 100 : 85;
  const eff = Math.round((bS + mS + pS + btS + dS) / 5);
  // decisions
  const keys = LOGIC[M.id].keys(x, sim).concat(sim.decisions.map(d => ({ ok: d.good, pts: 8, t: B(`In flight: ${L(d.label)} You chose “${L(d.choice)}”.`, `أثناء الطيران: ${L(d.label)} اخترت «${L(d.choice)}».`), why: d.why })));
  const tot = keys.reduce((a, k) => a + k.pts, 0);
  const dec = Math.round(100 * keys.filter(k => k.ok).reduce((a, k) => a + k.pts, 0) / tot);
  const flightCalls = { good: sim.decisions.filter(d => d.good).length, total: sim.decisions.length };
  // telemetry
  const plannedDays = M.env.days;
  const daysOp = sim.outcome === "lost" ? Math.round((sim.lostAt || 0) * plannedDays) : Math.round(plannedDays * Math.min(lifeF, 1.25));
  const scienceDays = sim.outcome === "lost" ? 0 : Math.max(0, daysOp - sim.down);
  const uptime = daysOp ? Math.round(100 * scienceDays / daysOp) : 0;
  const dataGb = Math.round(c.data * scienceDays * dataF * powerF * battF * sim.sciMult * c.sciM);
  const dataPlanGb = Math.round(c.data * plannedDays);
  // teamwork, role by role
  const tr = D.track, roleRows = [];
  const voteScore = (v, worst) => v === "go" ? (worst === "nogo" ? 0 : worst === "warn" ? 70 : 100) : (worst === "nogo" ? 100 : worst === "warn" ? 85 : 40);
  const tests = D.picks.tests || [], testSlot = slot(M, "tests");
  const domain = {
    sci: clamp(sci - 10 * c.off.length + (c.goalsMet.length > 1 ? 5 : 0), 0, 100),
    eng: Math.round((mS + pS + btS) / 3),
    nav: Math.round((dS + (c.orbitOk ? 100 : 0) + (c.orbit && c.orbit.sciM ? 100 * c.orbit.sciM : 100)) / 3),
    pm: Math.round((bS + (margins.time >= 0 ? 100 : 0) + 100 * Math.min(1, tests.length / Math.max(1, testSlot ? Math.ceil(testSlot.opts.length * 0.6) : 1))) / 3)
  };
  ROLE_ORDER.forEach(r => {
    const votes = tr.polls.filter(v => v.role === r);
    const vS = votes.length ? Math.round(votes.reduce((a, v) => a + voteScore(v.v, v.worst), 0) / votes.length) : null;
    const ds = sim.decisions.filter(d => d.role === r);
    const dS2 = ds.length ? Math.round(100 * ds.filter(d => d.good).length / ds.length) : null;
    const parts = [[domain[r], 0.5], [vS, 0.25], [dS2, 0.25]].filter(p => p[0] != null);
    const w = parts.reduce((a, p) => a + p[1], 0);
    roleRows.push({ role: r, player: playerFor(r), acts: tr.acts[r] || 0, domain: domain[r], vote: vS, calls: ds.length ? `${ds.filter(d => d.good).length}/${ds.length}` : "–", score: Math.round(parts.reduce((a, p) => a + p[0] * p[1], 0) / w),
      redMissed: votes.filter(v => v.v === "go" && v.worst === "nogo").length, needless: votes.filter(v => v.v === "nogo" && v.worst === "go").length, caught: votes.filter(v => v.v === "nogo" && v.worst === "nogo").length });
  });
  let team = roleRows.reduce((a, r) => a + r.score, 0) / 4 - 15 * (D.stats.redGo || 0) + (D.stats.fixed ? 5 : 0);
  const per = {};
  if (G.crew.n > 1) {
    ROLE_ORDER.forEach(r => { const p = G.crew.owner[r]; per[p] = (per[p] || 0) + (tr.acts[r] || 0) + tr.polls.filter(v => v.role === r).length + sim.decisions.filter(d => d.role === r).length; });
    const sum = Object.values(per).reduce((a, b) => a + b, 0) || 1, n = G.crew.n, mx = Math.max.apply(null, Object.values(per)) / sum;
    const balance = n > 1 ? clamp(1 - (mx - 1 / n) / (1 - 1 / n), 0, 1) : 1;
    team = team * (0.85 + 0.15 * balance);
  }
  team = Math.round(clamp(team, 0, 100));
  const share = Object.keys(per).map(k => ({ player: pname(+k), n: per[k] }));
  // level challenges
  const base = { outcome, sci, margins, flightCalls, telemetry: { uptime } };
  const ch = CHALLENGES[G.mode].map(cc => ({ id: cc.id, t: cc.t, ok: !!cc.ok(base, c, D, M) }));
  const chDone = ch.filter(x => x.ok).length, chal = Math.round(100 * chDone / ch.length);
  const total = Math.round(0.25 * perf + 0.20 * sci + 0.20 * dec + 0.15 * eff + 0.10 * team + 0.10 * chal);
  const scoreStars = total >= 85 ? 3 : total >= 65 ? 2 : total >= 40 ? 1 : 0;
  const chStars = chDone === ch.length ? 3 : chDone / ch.length >= 0.6 ? 2 : chDone >= 1 ? 1 : 0;
  const stars = Math.min(scoreStars, chStars);
  const reqs = c.goalsMet.flatMap(gm => gm.g.req.map(r => ({ t: r.t, v: r.v, met: gm.met && outcome !== "lost" })));
  reqs.push({ t: B("Weight is within the rocket’s limit", "الوزن ضمن حد الصاروخ"), v: "Inspection", met: c.cap != null && c.mass <= c.cap });
  reqs.push({ t: B("Makes at least as much power as it uses", "ينتج طاقة لا تقل عما يستهلك"), v: "Analysis", met: c.gen >= c.load });
  reqs.push({ t: B("The radio can send all the data home", "الراديو يستطيع إرسال كل البيانات"), v: "Demonstration", met: c.ratio >= 1 });
  const series = sim.series.slice(), marks = sim.marks.slice();
  return { outcome, perf, sci, eff, dec, team, collab: team, chal, ch, total, stars, keys, reqs, k2: !!sim.extra.k2, peri: sim.extra.peri, margins, flightCalls,
    telemetry: { plannedDays, daysOp, scienceDays, uptime, dataGb, dataPlanGb, down: sim.down, dataF, ratio: c.ratio, cost: c.cost, budget: c.budget, months: c.months, deadline: deadlineOf(M), mass: c.mass, cap, tests: tests.length, testsAll: testSlot ? testSlot.opts.length : 0, hints: tr.hints, swaps: tr.swaps, wrong: D.diag.wrong },
    roles: roleRows, share, series, marks, mode: G.mode, lifeF };
}
