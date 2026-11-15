/* ===================== SECOND CHANCE v2 — screens & interaction ===================== */
const $app = document.getElementById("app");
const $over = document.getElementById("overlay");
const STEP_ROLE = { objective: "sci", build: "eng", launch: "nav", tests: "pm" };
const CHAPTERS = [
  { n: 1, name: B("The crash", "الكارثة"), em: "🎬", steps: ["crash"] },
  { n: 2, name: B("Investigate", "التحقيق"), em: "🔍", steps: ["investigate"] },
  { n: 3, name: B("Redesign", "إعادة التصميم"), em: "🛠️", steps: ["objective", "build", "launch", "tests", "poll"] },
  { n: 4, name: B("Fly", "الطيران"), em: "🚀", steps: ["flight"] },
  { n: 5, name: B("Case closed", "إغلاق القضية"), em: "⭐", steps: ["closed"] }
];
const SUBSTEP = { objective: B("Question", "السؤال"), build: B("Build", "البناء"), launch: B("Launch", "الإطلاق"), tests: B("Tests", "الاختبارات"), poll: B("Go/No-Go", "جاهز؟") };
const TAGEMO = { atm: "🌡️", dust: "🌪️", relay: "📻", weather: "⛅", surface: "🏔️", co2: "🏭", fluor: "🌱", clouds: "☁️", planets: "🪐", stars: "✨", transients: "💥", veg: "🌾", water: "💧", thermal: "🔥" };
const goalEmoji = g => g.id === "atrain" ? "🚆" : (TAGEMO[(g.tags || [])[0]] || "🎯");
const curStep = () => stepsFor(mission())[design().step];
let ANIM = { raf: 0, t0: 0 };

/* ---------- top bar ---------- */
function topbar() {
  const inMission = G.screen === "mission";
  let chapters = "";
  if (inMission) {
    const M = mission(), D = design(), step = curStep();
    const chs = M.open ? [{ n: 1, name: B("The mission", "المهمة"), em: "📜", steps: ["intro"] }].concat(CHAPTERS.slice(2)) : CHAPTERS;
    chapters = `<ol class="chapters" aria-label="${esc(T("Chapters", "الفصول"))}">${chs.map((ch, i) => {
      const on = ch.steps.includes(step); const idx = stepsFor(M).indexOf(ch.steps[0]); const done = idx < D.step;
      return `<li class="${on ? "on" : ""} ${done ? "done" : ""}"><span class="em" aria-hidden="true">${ch.em}</span><span class="nm">${L(ch.name)}</span></li>`; }).join("")}</ol>`;
  }
  return `<header class="top">
    <button type="button" class="logo" data-act="home" aria-label="${esc(T("Home", "الرئيسية"))}"><span class="logo-dot"></span>${T("Second Chance", "فرصة ثانية")}</button>
    ${chapters}
    <div class="tools">
      <button type="button" class="tool" data-act="lang" aria-label="${esc(T("Switch to Arabic", "التبديل إلى الإنجليزية"))}">${LANG === "ar" ? "EN" : "ع"}</button>
      <button type="button" class="tool" data-act="sound" aria-pressed="${G.sound}" aria-label="${esc(T("Orbi’s voice", "صوت أوربي"))}">${G.sound ? "🔊" : "🔇"}</button>
    </div></header>`;
}

/* ---------- title screen ---------- */
function viewTitle() {
  const n = G.crew.n;
  const modes = Object.keys(MODES).map(k => { const m = MODES[k];
    return `<button type="button" class="mode ${G.mode === k ? "on" : ""}" data-act="mode" data-m="${k}" aria-pressed="${G.mode === k}"><b>${L(m.name)}</b><span>${L(m.age)}</span><small>${L(m.blurb)}</small></button>`; }).join("");
  const names = Array.from({ length: n }, (_, i) => `<label class="pname"><span style="background:${ROLES[ROLE_ORDER[i]].color}">${i + 1}</span><input id="name-${i}" data-name="${i}" value="${esc(G.crew.names[i] || "")}" placeholder="${esc(pdefault(i))}" maxlength="16" aria-label="${esc(T("Player name", "اسم اللاعب"))} ${i + 1}"></label>`).join("");
  const roles = ROLE_ORDER.map(r => `<div class="rolepick"><span class="re" aria-hidden="true">${ROLES[r].emoji}</span><span class="rn">${L(ROLES[r].name)}</span>
    ${n > 1 ? `<select id="own-${r}" data-own="${r}" aria-label="${esc(L(ROLES[r].name))}">${Array.from({ length: n }, (_, i) => `<option value="${i}" ${G.crew.owner[r] === i ? "selected" : ""}>${esc(pname(i))}</option>`).join("")}</select>` : ""}</div>`).join("");
  return `<main class="title-screen">
    <section class="hero">
      <div class="hero-text">
        <p class="kicker">${T("A NASA Space Apps mission game", "لعبة مهمات فضائية لتحدي ناسا")}</p>
        <h1>${T("Second Chance", "فرصة ثانية")}</h1>
        <p class="lede">${T("Real space missions failed. Investigate what went wrong, redesign the spacecraft, and fly it again.", "مهمات فضائية حقيقية فشلت. حقّق في السبب، وأعد تصميم المركبة، وأطلقها من جديد.")}</p>
        <button type="button" class="big-btn" data-act="start">${T("Start the mission", "ابدأ المهمة")} 🚀</button>
      </div>
      <div class="hero-orbi" aria-hidden="true">${orbiSVG("happy")}<div class="hero-say">${T("Hi! I’m Orbi. Let’s fix some space missions!", "مرحبًا! أنا أوربي. هيا نُصلح بعض المهمات الفضائية!")}</div></div>
    </section>
    <section class="setup">
      <div class="card">
        <h2>${T("Who’s playing?", "من سيلعب؟")}</h2>
        <div class="seg" role="group" aria-label="${esc(T("Number of players", "عدد اللاعبين"))}">${[1, 2, 3, 4].map(k => `<button type="button" data-act="crew" data-n="${k}" class="${n === k ? "on" : ""}" aria-pressed="${n === k}">${k} ${k === 1 ? T("player", "لاعب") : T("players", "لاعبين")}</button>`).join("")}</div>
        <div class="names">${names}</div>
        <h3>${T("Mission roles", "أدوار المهمة")}</h3>
        <div class="roles">${roles}</div>
        <p class="small muted">${n > 1 ? T("Pass the device when Orbi calls your role.", "مرّروا الجهاز عندما ينادي أوربي على دوركم.") : T("Solo: you play all four roles.", "وحدك: ستلعب الأدوار الأربعة.")}</p>
      </div>
      <div class="card">
        <h2>${T("Choose your level", "اختر مستواك")}</h2>
        <div class="modes">${modes}</div>
      </div>
    </section>
  </main>`;
}

/* ---------- case files ---------- */
function viewCases() {
  const cards = LEVEL_CASES[G.mode].map(id => mission(id)).map((M, idx) => {
    const best = G.best[M.id]; const st = best ? best.stars : 0; const badge = best && best.badge;
    return `<button type="button" class="case ${M.open ? "open" : ""}" data-act="open" data-id="${M.id}">
      <span class="case-art">${caseArt(M.id)}</span>
      <span class="stamp">${L(M.stamp)}</span>
      <span class="case-body"><span class="no">${T("Case", "القضية")} ${idx + 1} · ${L(M.years)}</span>
      <span class="case-title">${L(M.title)}</span><span class="teaser">${L(M.teaser)}</span>
      <span class="case-foot"><span class="stars" aria-label="${st} ${T("stars", "نجوم")}">${[0, 1, 2].map(i => starSVG(i < st)).join("")}</span>${badge ? `<span class="mini-badge" title="${esc(L(M.badge.name))}">${M.badge.glyph}</span>` : ""}</span></span>
    </button>`; }).join("");
  return `<main class="wrap"><div class="cases-head"><h1 class="h-cases">${T("Pick a case file", "اختر ملف قضية")}</h1>
    <p class="muted">${T("Level", "المستوى")}: <b>${L(MODES[G.mode].name)}</b>. ${G.mode === "cadet" ? T("Two made-up adventures, three real missions that went wrong, and one brand-new mission for Egypt.", "مغامرتان خياليتان، وثلاث مهمات حقيقية تعثرت، ومهمة جديدة تمامًا لمصر.") : T("Real missions that went wrong, and one brand-new mission for Egypt.", "مهمات حقيقية تعثرت، ومهمة جديدة تمامًا لمصر.")}</p></div><div class="cases">${cards}</div></main>`;
}

/* ---------- mission frame ---------- */
function roleTag(role) {
  if (!role) return "";
  return `<span class="roletag" style="--rc:${ROLES[role].color}">${ROLES[role].emoji} ${L(ROLES[role].name)}${G.crew.n > 1 ? `: <b>${esc(playerFor(role))}</b>` : ""}</span>`;
}
function substeps(step) {
  if (!SUBSTEP[step]) return "";
  const keys = Object.keys(SUBSTEP), i = keys.indexOf(step);
  return `<ol class="subs">${keys.map((k, j) => `<li class="${j === i ? "on" : j < i ? "done" : ""}">${L(SUBSTEP[k])}</li>`).join("")}</ol>`;
}
function navRow(backOk, nextLabel, missing, act) {
  return `<div class="navrow">
    ${backOk ? `<button type="button" class="btn ghost" data-act="prev">◂ ${T("Back", "رجوع")}</button>` : "<span></span>"}
    ${missing && missing.length ? `<span class="missing">${T("Still needed", "ما زال مطلوبًا")}: ${missing.join(T(", ", "، "))}</span>` : "<span></span>"}
    <button type="button" class="big-btn sm" data-act="${act || "next"}" ${missing && missing.length ? "disabled" : ""}>${nextLabel}</button></div>`;
}
function meters(M, D, c) {
  const ck = checks(M, D, c);
  const st = k => (ck.find(x => x.key === k) || { status: "wait" }).status;
  const num = MODES[G.mode].numbers;
  const crit = k => M.critical.includes(k) ? `<span class="crit" title="${esc(L(M.criticalWhy))}">★</span>` : "";
  const m = (key, em, label, frac, val, sKey) => { const s = st(sKey || key);
    return `<div class="meter ${s}"><div class="mt"><span>${em} ${label}${crit(key)}</span>${num ? `<span class="mv">${val}</span>` : ""}</div><div class="mbar"><i style="width:${clamp(frac * 100, 3, 100)}%"></i></div></div>`; };
  let h = "";
  if (c.mcap != null) { h += m("volume", "📦", T("Space", "المساحة"), c.ucap ? c.u / c.ucap : 0.05, `${fmt(c.u, 1)}/${fmt(c.ucap, 1)} U`); h += m("mass", "⚖️", T("Weight", "الوزن"), c.mass / c.mcap, `${fmt(c.mass, 1)}/${fmt(c.mcap, 1)} ${T("kg", "كغ")}`, "busmass"); }
  else h += m("mass", "⚖️", T("Weight", "الوزن"), c.cap ? c.mass / c.cap : 0.25, c.cap ? `${fmt(c.mass)}/${fmt(c.cap)} ${T("kg", "كغ")}` : `${fmt(c.mass)} ${T("kg", "كغ")}`);
  h += m("power", "⚡", T("Power", "الطاقة"), c.gen ? c.load / c.gen : 0.2, c.gen ? `${fmt(c.load)}/${fmt(c.gen)} W` : "–");
  h += m("battery", "🔋", T("Battery", "البطارية"), c.wh ? c.needWh / c.wh : 0.2, c.wh ? `${fmt(c.needWh)}/${fmt(c.wh)} Wh` : "–");
  h += m("data", "📶", T("Data", "البيانات"), c.rate ? (c.data ? c.data / c.down : 0.05) : 0.2, c.rate ? `${fmt(c.data, 1)}/${fmt(c.down, 1)}` : "–");
  h += m("budget", "💰", T("Money", "المال"), c.cost / c.budget, `${money(M, c.cost)}/${money(M, c.budget)}`);
  h += m("schedule", "⏳", T("Time", "الوقت"), c.months / deadlineOf(M), `${fmt(c.months, 1)}/${deadlineOf(M)} ${T("mo", "شهر")}`);
  return `<div class="meters" aria-label="${esc(T("Resources", "الموارد"))}">${h}</div>`;
}
function stats(M, s, o) {
  if (!MODES[G.mode].numbers) {
    const lv = (v, max) => { const k = max ? Math.max(1, Math.round(3 * v / max)) : 0; return "●".repeat(k) + "○".repeat(3 - k); };
    const mx = f => Math.max.apply(null, s.opts.map(x => x[f] || 0));
    const out = [];
    if (o.m) out.push(`⚖️ ${lv(o.m, mx("m"))}`); if (o.p) out.push(`⚡ ${lv(o.p, mx("p"))}`); if (o.gen || o.genU) out.push(`☀️ ${lv(o.gen || o.genU, mx(o.gen ? "gen" : "genU"))}`);
    if (o.cost) out.push(`💰 ${lv(o.cost, mx("cost"))}`); if (o.sci) out.push(`🔬 ${lv(o.sci, mx("sci"))}`); if (o.rate) out.push(`📶 ${lv(o.rate, mx("rate"))}`);
    return out.map(x => `<span>${x}</span>`).join("");
  }
  const ch = [];
  if (o.m) ch.push(`⚖️ ${nfmt(o.m)} ${T("kg", "كغ")}`); if (o.u) ch.push(`📦 ${nfmt(o.u)} U`); if (o.p) ch.push(`⚡ ${nfmt(o.p)} W`);
  if (o.gen) ch.push(`☀️ +${fmt(o.gen * M.env.solar)} W`); if (o.genU) ch.push(`☀️ +${nfmt(o.genU)} W/U`); if (o.wh) ch.push(`🔋 ${o.wh} Wh`);
  if (o.cap) ch.push(`🚀 ${nfmt(o.cap)} ${T("kg", "كغ")}`); if (o.cost != null) ch.push(`💰 ${money(M, o.cost)}`); if (o.mo) ch.push(`⏳ +${nfmt(o.mo)} ${T("mo", "شهر")}`);
  if (o.data) ch.push(`💾 ${nfmt(o.data)} Gb`); if (o.rate) ch.push(`📶 ${nfmt(o.rate)} Gb`); if (o.sci) ch.push(`🔬 ${o.sci}`);
  return ch.map(x => `<span>${x}</span>`).join("");
}

function viewMission() {
  const M = mission(), D = design(), step = curStep();
  const V = { crash: vCrash, intro: vIntro, investigate: vInvestigate, objective: vObjective, build: vBuild, launch: vLaunch, tests: vTests, poll: vPoll, flight: vFlight, closed: vClosed }[step];
  return `<main class="wrap mission">${V(M, D)}</main>`;
}

/* Chapter 1: the crash (or the Nile intro) */
function vCrash(M) {
  return `<div class="scene-head"><h1>${L(M.title)} <span class="yr">${L(M.years)}</span></h1>${substeps()}</div>
    <div class="cine"><canvas id="cine" width="1280" height="720" aria-label="${esc(T("What happened", "ماذا حدث"))}"></canvas></div>
    <div class="navrow"><span></span><span></span><button type="button" class="big-btn sm" data-act="next" id="crash-next">${T("Start the investigation", "ابدأ التحقيق")} 🔍</button></div>`;
}
function vIntro(M) {
  return `<div class="scene-head"><h1>${L(M.title)}</h1></div>
    <div class="intro-art">${caseArt("nile")}</div>
    <div class="navrow"><span></span><span></span><button type="button" class="big-btn sm" data-act="next">${T("Let’s design it", "هيا نصممها")} 🛠️</button></div>`;
}

/* Chapter 2: the investigation board */
function vInvestigate(M, D) {
  const st = M.story, opened = D.clues.length, all = opened >= st.clues.length;
  const cards = st.clues.map((cl, i) => { const open = D.clues.includes(i);
    return `<button type="button" class="clue ${open ? "open" : ""}" data-act="clue" data-i="${i}" style="--r:${[-3, 2, -1.5, 3, -2][i % 5]}deg" aria-expanded="${open}">
      <span class="tape" aria-hidden="true"></span>
      <span class="clue-front"><span class="clue-ic">${icon(cl.ic)}</span><span class="clue-n">${T("Clue", "دليل")} ${i + 1}</span><span class="clue-t">${L(cl.t)}</span><span class="tap">${T("Tap to open", "اضغط للفتح")}</span></span>
      <span class="clue-back"><span class="clue-t">${L(cl.t)}</span><span class="clue-body">${esc(L(cl.body)).replace(/\n/g, "<br>")}</span></span>
    </button>`; }).join("");
  let solve = "";
  if (all && !D.diag.done) {
    const q = st.diagnose[D.diag.q];
    solve = `<div class="solve" id="solve"><h2>🔍 ${L(q.q)}</h2><div class="answers">${q.opts.map((o, i) => `<button type="button" class="answer" data-act="answer" data-i="${i}">${L(o.t)}</button>`).join("")}</div></div>`;
  } else if (D.diag.done) {
    solve = `<div class="solved"><div class="badge-big">${badgeSVG(M.badge.color, M.badge.glyph)}</div><div><p class="kicker">${T("Case cracked! Badge earned", "تم حل القضية! حصلت على شارة")}</p><h2>${L(M.badge.name)}</h2>
      <p>${T("Now you know what went wrong. Time to redesign the mission so it can’t happen again.", "الآن تعرف ما الخطأ. حان وقت إعادة تصميم المهمة حتى لا يتكرر.")}</p>
      <button type="button" class="big-btn sm" data-act="next">${T("Redesign the mission", "أعد تصميم المهمة")} 🛠️</button></div></div>`;
  }
  return `<div class="scene-head"><h1>${T("The investigation", "التحقيق")}</h1><span class="counter">${T("Clues opened", "الأدلة المفتوحة")}: ${opened}/${st.clues.length}</span></div>
    <div class="board">${cards}</div>${solve}`;
}

/* Chapter 3: redesign */
function vObjective(M, D, c) {
  c = c || calc(M, D);
  const { prim, sec } = goalList(M);
  const primCards = prim.map(g => `<button type="button" class="goal ${D.goal === g.id ? "on" : ""}" data-act="goal" data-id="${g.id}" aria-pressed="${D.goal === g.id}"><span class="gem" aria-hidden="true">${goalEmoji(g)}</span><b>${L(g.n)}</b><span>${L(g.d)}</span></button>`).join("");
  const secCards = sec.filter(g => g.id !== D.goal).map(g => { const on = D.extra.includes(g.id);
    return `<button type="button" class="goal small ${on ? "on" : ""}" data-act="extra" data-id="${g.id}" aria-pressed="${on}"><span class="gem" aria-hidden="true">${goalEmoji(g)}</span><b>${L(g.n)}</b><span>${L(g.d)}</span></button>`; }).join("");
  const goals = selectedGoals(M, D);
  const reqs = goals.flatMap(g => g.req.map(r => `<li><span class="vb">${L(VERIFY[r.v])}</span>${L(r.t)}</li>`));
  return `<div class="scene-head"><h1>${T("What should the mission answer?", "ما السؤال الذي ستجيب عنه المهمة؟")}</h1>${roleTag("sci")}</div>${substeps("objective")}
    <h2 class="sec">${T("Main question", "السؤال الرئيسي")}</h2><div class="goals">${primCards}</div>
    <h2 class="sec">${T("Bonus goals", "أهداف إضافية")} <span class="muted small">${T("(optional: more science, harder design)", "(اختياري: علم أكثر، وتصميم أصعب)")}</span></h2><div class="goals">${secCards}</div>
    ${goals.length ? `<div class="rules"><h3>📜 ${T("Mission rules (requirements)", "قواعد المهمة (المتطلبات)")}</h3><p class="small muted">${T("Every goal becomes a rule, and every rule needs a way to prove it.", "كل هدف يصبح قاعدة، وكل قاعدة تحتاج طريقة لإثباتها.")}</p><ul>${reqs.join("")}</ul></div>` : ""}
    ${challengeCard()}
    ${navRow(false, `${T("Build the spacecraft", "ابنِ المركبة")} 🛠️`, D.goal ? [] : [T("a main question", "سؤال رئيسي")])}`;
}

function vBuild(M, D) {
  const c = calc(M, D);
  const list = M.slots.filter(s => s.phase === "craft");
  if (!D.tab || !list.find(s => s.id === D.tab)) D.tab = list[0].id;
  const tabs = list.map(s => { const v = D.picks[s.id]; const done = s.multi ? (v || []).length : !!v;
    return `<button type="button" role="tab" class="tab ${D.tab === s.id ? "on" : ""} ${done ? "done" : ""}" data-act="tab" data-id="${s.id}" aria-selected="${D.tab === s.id}"><span aria-hidden="true">${s.tab}</span> ${L(s.short || s.label)}${done ? " ✓" : ""}</button>`; }).join("");
  const s = slot(M, D.tab);
  const parts = s.opts.map(o => { const sel = s.multi ? (D.picks[s.id] || []).includes(o.id) : D.picks[s.id] === o.id;
    return `<div class="part-card ${sel ? "on" : ""}" data-drag="1" data-slot="${s.id}" data-opt="${o.id}">
      <div class="pic" aria-hidden="true">${icon(o.ic, o.icp)}</div>
      <div class="pinfo"><b>${L(o.n)}</b><div class="pstats">${stats(M, s, o)}</div><p>${L(o.d)}</p>${o.tags ? `<div class="ptags">${o.tags.map(t => TAGEMO[t] + " " + L(TAGNAME[t])).join(" · ")}</div>` : ""}${o.hist && !M.open ? `<span class="hist">${T("Flown in the real mission", "استُخدم في المهمة الحقيقية")}</span>` : ""}</div>
      <button type="button" class="add ${sel ? "on" : ""}" data-act="place" data-slot="${s.id}" data-opt="${o.id}" aria-pressed="${sel}">${sel ? (s.multi ? T("Remove", "إزالة") : "✓ " + T("Installed", "مُركّب")) : T("Install", "ركّب")}</button>
    </div>`; }).join("");
  const missing = list.filter(sl => sl.multi ? !(D.picks[sl.id] || []).length : !D.picks[sl.id]).map(sl => L(sl.short || sl.label));
  return `<div class="scene-head"><h1>${T("Build your spacecraft", "ابنِ مركبتك")}</h1>${roleTag("eng")}</div>${substeps("build")}
    <div class="build">
      <div class="stage" id="stage"><div class="stage-tip">${T("Drag parts here, or tap Install", "اسحب القطع إلى هنا، أو اضغط «ركّب»")}</div>${stageSVG(M, D, c)}${meters(M, D, c)}</div>
      <div class="tray"><div class="tabs" role="tablist">${tabs}</div>
        <div class="slot-info"><b>${L(s.label)}</b> ${roleTag(s.role)}${s.hint ? `<p class="small">${L(s.hint)}</p>` : ""}</div>
        <div class="parts">${parts}</div></div>
    </div>
    ${navRow(true, `${T("To the launch pad", "إلى منصة الإطلاق")} 🚀`, missing)}`;
}

function choiceCards(M, D, s, c, art) {
  return s.opts.map(o => { const sel = D.picks[s.id] === o.id;
    let extra = "";
    if (s.kind === "launcher") {
      const fits = c.mass <= o.cap, reach = !c.orbit || !o.orbits || o.orbits.includes(c.orbit.id);
      extra = `<div class="capbar"><i style="width:${clamp(c.mass / o.cap * 100, 2, 100)}%" class="${fits ? "" : "over"}"></i></div><div class="small ${fits && reach ? "ok" : "bad"}">${!fits ? T("Too heavy for this rocket", "ثقيل جدًا على هذا الصاروخ") : !reach ? T("Can’t reach your orbit", "لا يصل إلى مدارك") : T("Fits!", "مناسب!")}</div>`;
    }
    return `<button type="button" class="choice ${sel ? "on" : ""}" data-act="place" data-slot="${s.id}" data-opt="${o.id}" aria-pressed="${sel}">
      <span class="cart" aria-hidden="true">${art(o)}</span><b>${L(o.n)}</b><span class="pstats">${stats(M, s, o)}</span><span class="cd">${L(o.d)}</span>${extra}
      ${o.hist && !M.open ? `<span class="hist">${T("Flown in the real mission", "استُخدم في المهمة الحقيقية")}</span>` : ""}</button>`; }).join("");
}
function vLaunch(M, D) {
  const c = calc(M, D);
  const list = M.slots.filter(s => s.phase === "launch");
  const art = s => o => s.kind === "launcher" ? (o.ic === "iss" ? issSVG() : rocketSVG(o.ic, clamp(o.cap / (M.env.mass ? 30 : 1500), 0.25, 1))) : s.kind === "orbit" ? orbitSVG(o.ic) : icon(o.ic);
  const html = list.map(s => `<section class="pick"><div class="pick-h"><h2 class="sec">${L(s.label)}</h2>${roleTag(s.role)}</div>${s.hint ? `<p class="small muted">${L(s.hint)}</p>` : ""}<div class="choices">${choiceCards(M, D, s, c, art(s))}</div></section>`).join("");
  const missing = list.filter(s => !D.picks[s.id]).map(s => L(s.label));
  return `<div class="scene-head"><h1>${T("Launch & orbit", "الإطلاق والمدار")}</h1>${roleTag("nav")}</div>${substeps("launch")}
    ${meters(M, D, c)}${html}${navRow(true, `${T("To the test lab", "إلى مختبر الاختبارات")} 🧪`, missing)}`;
}
function vTests(M, D) {
  const c = calc(M, D);
  const list = M.slots.filter(s => s.phase === "verify");
  const html = list.map(s => {
    const cards = s.multi ? s.opts.map(o => { const on = (D.picks[s.id] || []).includes(o.id);
      return `<button type="button" class="choice test ${on ? "on" : ""}" data-act="place" data-slot="${s.id}" data-opt="${o.id}" aria-pressed="${on}"><span class="cart" aria-hidden="true">${icon(o.ic)}</span><b>${L(o.n)}</b><span class="pstats">${stats(M, s, o)}</span><span class="cd">${L(o.d)}</span><span class="tick">${on ? "✓ " + T("In the plan", "ضمن الخطة") : "+ " + T("Add test", "أضف الاختبار")}</span></button>`; }).join("")
      : choiceCards(M, D, s, c, o => icon(o.ic));
    return `<section class="pick"><div class="pick-h"><h2 class="sec">${L(s.label)}</h2>${roleTag(s.role)}</div>${s.hint ? `<p class="small muted">${L(s.hint)}</p>` : ""}<div class="choices">${cards}</div></section>`; }).join("");
  const missing = list.filter(s => !s.multi && !D.picks[s.id]).map(s => L(s.label));
  return `<div class="scene-head"><h1>${T("The test lab", "مختبر الاختبارات")}</h1>${roleTag("pm")}</div>${substeps("tests")}
    ${meters(M, D, c)}${html}${navRow(true, `${T("Call the Go / No-Go poll", "ابدأ تصويت الجاهزية")} 📣`, missing, "to-poll")}`;
}

function vPoll(M, D) {
  const c = calc(M, D), ck = checks(M, D, c);
  const idx = ROLE_ORDER.findIndex(r => !D.votes[r]);
  const chips = ROLE_ORDER.map(r => `<div class="vchip ${D.votes[r] || ""}" style="--rc:${ROLES[r].color}"><span>${ROLES[r].emoji}</span><b>${L(ROLES[r].name)}</b><i>${D.votes[r] === "go" ? "GO" : D.votes[r] === "nogo" ? "NO-GO" : "…"}</i></div>`).join("");
  let body = "";
  if (idx >= 0) {
    const r = ROLE_ORDER[idx], mine = ck.filter(x => x.role === r), hard = mine.find(x => x.hard && (x.status === "nogo" || x.status === "wait"));
    body = `<div class="pollcard" style="--rc:${ROLES[r].color}"><div class="pc-head"><span class="pe">${ROLES[r].emoji}</span><div><h2>${L(ROLES[r].name)}${G.crew.n > 1 ? `: ${esc(playerFor(r))}` : ""}</h2><p>${T("Check your numbers. Are you GO for launch?", "راجع أرقامك. هل أنت جاهز للإطلاق؟")}</p></div></div>
      <ul class="checks">${mine.map(x => `<li class="${x.status}"><span class="dot"></span><span><b>${L(x.label)}</b><span>${L(x.why)}</span></span></li>`).join("")}</ul>
      <div class="vote-row"><button type="button" class="vote go" data-act="vote" data-v="go" ${hard ? "disabled" : ""}>GO 👍</button><button type="button" class="vote nogo" data-act="vote" data-v="nogo">NO-GO ✋</button></div>
      ${hard ? `<p class="small bad">${T("You can’t be GO", "لا يمكنك قول GO")}: ${L(hard.why)}</p>` : ""}</div>`;
  } else {
    const anyNo = ROLE_ORDER.some(r => D.votes[r] === "nogo");
    const reds = ck.filter(x => x.status === "nogo" && !x.hard).length;
    body = anyNo ? `<div class="verdict nogo"><h2>✋ ${T("Launch held!", "تم إيقاف الإطلاق!")}</h2><p>${T("Someone said NO-GO. Holding a launch for a real problem is great engineering. Go fix it!", "أحدكم قال NO-GO. إيقاف الإطلاق بسبب مشكلة حقيقية هندسة رائعة. هيا أصلحوها!")}</p><button type="button" class="big-btn sm" data-act="fix">${T("Back to the design", "عودة للتصميم")} 🛠️</button></div>`
      : `<div class="verdict go"><h2>👍 ${T("All GO!", "الجميع جاهز!")}</h2><p>${reds ? T(`Careful: you’re launching with ${reds} red flag(s).`, `انتبه: ستطلق مع ${reds} علامة حمراء.`) : T("Clean board. The rocket is ready.", "كل شيء أخضر. الصاروخ جاهز.")}</p><button type="button" class="big-btn launch" data-act="launch">${T("LAUNCH", "إطلاق")} 🚀</button></div>`;
  }
  return `<div class="scene-head"><h1>${T("Go / No-Go poll", "تصويت الجاهزية")}</h1></div>${substeps("poll")}<div class="vchips">${chips}</div>${body}
    <div class="navrow"><button type="button" class="btn ghost" data-act="prev">◂ ${T("Back", "رجوع")}</button><span></span><span></span></div>`;
}

/* Chapter 4: flight */
function vFlight(M) {
  return `<div class="scene-head"><h1>${T("Flight", "الطيران")}: ${L(M.title)}</h1><span class="clock" id="clock"></span></div>
    <div class="flight"><div class="cine"><canvas id="sky" width="1280" height="720" aria-label="${esc(T("Your mission flying", "مهمتك تطير"))}"></canvas><div id="decision" class="decision-wrap" aria-live="polite"></div></div>
    <div class="logbox"><h3>📋 ${T("Mission log", "سجل المهمة")}</h3><ol class="log" id="log"></ol></div></div>
    <div class="navrow"><div class="speed"><span>${T("Speed", "السرعة")}</span>${[1, 2, 4].map(v => `<button type="button" class="chip ${G.speed === v ? "on" : ""}" data-act="speed" data-v="${v}">${v}×</button>`).join("")}<button type="button" class="chip" data-act="skip">⏩ ${T("Fast", "سريع")}</button></div><span></span><span id="done-slot"></span></div>`;
}

/* Chapter 5: case closed */
function yourChoice(M, D, key) {
  const has = t => (D.picks.tests || []).includes(t);
  const name = id => { const o = optOf(M, D, id); return o ? (Array.isArray(o) ? o.map(x => L(x.n)).join(T(", ", "، ")) : L(o.n)) : "–"; };
  if (key === "iface") return has("iface") ? T("Tested: mix-up found and fixed", "اختُبر: الخطأ اكتُشف وأُصلح") : T("Not tested", "لم يُختبر");
  if (key === "audit") return has("audit") ? T("Re-tested the metal", "أُعيد اختبار المعدن") : T("Trusted the certificates", "الثقة في الشهادات");
  if (key === "k2") return D.result && D.result.k2 ? T("K2: balanced on sunlight", "K2: التوازن على ضوء الشمس") : T("Not needed, or not chosen", "لم يكن ضروريًا أو لم يُختر");
  if (key === "adcs") return name("adcs") + (has("wheel") ? T(" + long test", " + اختبار طويل") : "");
  return name(key);
}

/* ---------- overlays: hand-off between players, countdown ---------- */
function handoff(role, cb) {
  if (G.crew.n < 2) { cb(); return; }
  $over.innerHTML = `<div class="handoff" role="dialog" aria-modal="true" style="--rc:${ROLES[role].color}"><div class="ho-em">${ROLES[role].emoji}</div>
    <p>${T("Pass the device to", "مرّر الجهاز إلى")}</p><h2>${esc(playerFor(role))}</h2><p class="ho-role">${L(ROLES[role].name)}</p><p class="small">${L(ROLES[role].blurb)}</p>
    <button type="button" class="big-btn sm" id="ho-go">${T("I’m ready!", "أنا جاهز!")}</button></div>`;
  $over.hidden = false;
  const b = document.getElementById("ho-go"); b.focus();
  b.onclick = () => { $over.hidden = true; $over.innerHTML = ""; cb(); };
}
function countdown(cb) {
  $over.innerHTML = `<div class="count" aria-live="assertive"><span id="cnum">3</span></div>`; $over.hidden = false;
  let n = 3; orbiSay(B("Three… two… one…", "ثلاثة… اثنان… واحد…"), "happy");
  const tick = () => { n--; const el = document.getElementById("cnum"); if (n > 0) { el.textContent = n; setTimeout(tick, 650); } else { el.textContent = T("LIFTOFF!", "انطلاق!"); setTimeout(() => { $over.hidden = true; $over.innerHTML = ""; cb(); }, 650); } };
  setTimeout(tick, 650);
}

/* ---------- step entry: Orbi lines and hand-offs ---------- */
function enterStep() {
  const M = mission(), D = design(), step = curStep();
  stopAnim();
  const role = STEP_ROLE[step];
  const prevRole = D.lastRole;
  const go = () => {
    D.lastRole = role || D.lastRole;
    render();
    const auto = MODES[G.mode].hints === "auto";
    if (step === "crash") playCrash();
    else if (step === "intro") orbiStory(M.story.intro.map(t => ({ t, e: "happy" })));
    else if (step === "investigate") { if (!D.diag.done) orbiSay(B("Let’s be detectives! Open every clue and look closely.", "هيا نكون محققين! افتح كل دليل وانظر جيدًا."), "think"); }
    else if (step === "objective") orbiSay(auto ? M.hints.objective : B("Every NASA mission starts with a question. Pick ours!", "كل مهمة لناسا تبدأ بسؤال. اختر سؤالنا!"), "happy");
    else if (step === "build") orbiSay(auto ? M.hints.build : B("Time to build! Drag parts onto the spacecraft and watch the meters.", "وقت البناء! اسحب القطع إلى المركبة وراقب العدّادات."), "happy");
    else if (step === "launch") orbiSay(auto ? M.hints.launch : B("Now pick the orbit and a rocket that can carry our weight there.", "الآن اختر المدار وصاروخًا يستطيع حمل وزننا إليه."), "happy");
    else if (step === "tests") orbiSay(auto ? M.hints.tests : B("Tests cost money and time. Which ones protect us most?", "الاختبارات تكلف مالًا ووقتًا. أيها يحمينا أكثر؟"), "think");
    else if (step === "poll") orbiSay(B("Flight Director here! Each role checks their numbers and votes GO or NO-GO.", "هنا مدير الطيران! كل دور يراجع أرقامه ويصوّت GO أو NO-GO."), "normal");
    else if (step === "flight") startFlightView();
    else if (step === "closed") { const r = D.result; orbiSay(r.outcome === "lost" ? B("We lost it… but now we know why. Want to try again?", "فقدناها… لكننا الآن نعرف السبب. نحاول مجددًا؟") : r.stars === 3 ? B("Three stars! You’re a real mission engineer! 🎉", "ثلاث نجوم! أنت مهندس مهمات حقيقي! 🎉") : B("We made it! Can you get more stars?", "نجحنا! هل تستطيع جمع نجوم أكثر؟"), r.outcome === "lost" ? "worried" : "party"); }
  };
  if (role && role !== prevRole && G.crew.n > 1) handoff(role, go); else go();
}
function goStep(i) { const D = design(); D.step = i; D.maxStep = Math.max(D.maxStep, i); window.scrollTo(0, 0); enterStep(); }

/* ---------- animations ---------- */
function stopAnim() { if (ANIM.raf) cancelAnimationFrame(ANIM.raf); ANIM.raf = 0; if (RUN && RUN.raf) { cancelAnimationFrame(RUN.raf); RUN.raf = 0; } }
function playCrash() {
  const M = mission(), cv = document.getElementById("cine"); if (!cv) return;
  const g = cv.getContext("2d"), stars = makeStars(); const dur = 11000; ANIM.t0 = performance.now(); let said = -1;
  const lines = M.story.crash;
  const loop = now => {
    const p = clamp((now - ANIM.t0) / dur, 0, 1), k = Math.min(lines.length - 1, Math.floor(p * lines.length * 1.05));
    if (k !== said) { said = k; orbiSay(lines[k], k === lines.length - 1 ? "shocked" : k === 0 ? "normal" : "worried"); }
    drawCrash(g, cv.width, cv.height, M, p, stars, now / 1000);
    if (document.getElementById("cine")) ANIM.raf = requestAnimationFrame(loop);
  };
  ANIM.raf = requestAnimationFrame(loop);
}
function startFlightView() {
  if (!RUN || RUN.mid !== G.mid) return;
  RUN.shown = 0; RUN.last = 0; RUN.lastSaid = -1;
  updateLog();
  if (RUN.sim.done) showDone(); else RUN.raf = requestAnimationFrame(tick);
  if (RUN.pending) showDecision();
}
function tick(now) {
  const R = RUN; if (!R) return;
  if (!R.last) R.last = now;
  const dt = Math.min(0.1, (now - R.last) / 1000); R.last = now;
  const s = R.sim;
  if (!s.paused && !s.done) {
    s.p = Math.min(1, s.p + dt * G.speed / 26);
    while (R.idx < R.items.length && R.items[R.idx].t <= s.p) {
      if (s.outcome === "lost") { R.idx = R.items.length; break; }
      const it = R.items[R.idx++];
      if (it.decision) { s.paused = true; R.pending = it.decision; showDecision(); break; }
      const txt = typeof it.txt === "function" ? it.txt(s) : it.txt;
      if (txt) s.say(txt, it.tone, it.expr);
      if (it.run) it.run(s);
    }
    if (s.p - s.lastSample >= 0.01) { s.lastSample = s.p; s.series.push({ p: s.p, rate: s.outcome === "lost" ? 0 : s.sciMult, life: s.lifeMult }); }
    if (s.outcome === "lost" && s.p >= s.lostAt + 0.06) finishFlight();
    else if (s.p >= 1 && R.idx >= R.items.length && !s.paused) finishFlight();
  }
  const cv = document.getElementById("sky"); if (!cv) return;
  drawFlight(cv.getContext("2d"), cv.width, cv.height, R, now / 1000);
  updateLog();
  if (!s.done) R.raf = requestAnimationFrame(tick);
}
function updateLog() {
  const R = RUN, el = document.getElementById("log"); if (!el) return;
  while (R.shown < R.sim.log.length) {
    const e = R.sim.log[R.shown++];
    const li = document.createElement("li"); li.className = e.tone;
    li.innerHTML = `<span class="t">${T("Day", "اليوم")} ${Math.round(e.p * R.M.env.days)}</span>${esc(L(e.txt))}`;
    el.appendChild(li); el.scrollTop = el.scrollHeight;
    if (!R.pending && R.shown - 1 > (R.lastSaid == null ? -1 : R.lastSaid)) { R.lastSaid = R.shown - 1; orbiSay(e.txt, e.expr || ({ good: "happy", warn: "worried", bad: "shocked" }[e.tone] || "normal"), { speak: G.speed <= 2 }); }
  }
  const ck = document.getElementById("clock"); if (ck) ck.textContent = `${T("Mission day", "يوم المهمة")} ${Math.round(R.sim.p * R.M.env.days)}`;
}
function showDecision() {
  const R = RUN, d = R.pending, box = document.getElementById("decision"); if (!box) return;
  if (!d) { box.innerHTML = ""; return; }
  orbiSay(d.q, d.expr || "worried");
  box.innerHTML = `<div class="decision"><div class="dlabel">${L(d.label)} · ${ROLES[d.role].emoji} ${L(ROLES[d.role].name)}${G.crew.n > 1 ? `: ${esc(playerFor(d.role))}` : ""}</div><p>${L(d.q)}</p>
    <div class="dopts">${d.opts.map((o, i) => `<button type="button" class="big-btn sm alt" data-act="decide" data-i="${i}">${L(o.t)}</button>`).join("")}</div></div>`;
  const b = box.querySelector("button"); if (b) b.focus({ preventScroll: true });
}
function decide(i) {
  const R = RUN; if (!R || !R.pending) return;
  const d = R.pending, o = d.opts[i];
  R.sim.decisions.push({ label: d.label, choice: o.t, good: o.good, why: o.why, role: d.role });
  R.pending = null; o.apply(R.sim); R.sim.paused = false; R.last = 0;
  showDecision();
  if (!R.raf) R.raf = requestAnimationFrame(tick);
}
function finishFlight() {
  const R = RUN, s = R.sim; if (s.done) return;
  s.done = true;
  const res = score(R); R.D.result = res;
  const list = (G.attempts[R.M.id] = G.attempts[R.M.id] || []);
  list.push({ n: list.length + 1, outcome: res.outcome, total: res.total, stars: res.stars, mode: G.mode, perf: res.perf, sci: res.sci, dec: res.dec, eff: res.eff, team: res.team, chal: res.chal });
  const prev = G.best[R.M.id] || { total: -1, stars: 0, badge: false };
  G.best[R.M.id] = { total: Math.max(prev.total, res.total), stars: Math.max(prev.stars, res.stars), badge: prev.badge || R.D.diag.done };
  saveBest();
  showDone();
}
function showDone() {
  const el = document.getElementById("done-slot");
  if (el) { el.innerHTML = `<button type="button" class="big-btn sm" data-act="next">${T("Close the case", "أغلق القضية")} ⭐</button>`; }
}

/* ---------- actions ---------- */
function pickPart(sid, oid) {
  const M = mission(), D = design(), s = slot(M, sid);
  const before = checks(M, D, calc(M, D));
  D.track.swaps++; D.track.acts[s.role] = (D.track.acts[s.role] || 0) + 1;
  if (s.multi) { const cur = D.picks[sid] || []; D.picks[sid] = cur.includes(oid) ? cur.filter(x => x !== oid) : cur.concat(oid); }
  else D.picks[sid] = oid;
  // after installing, move to the next empty tab in the build screen
  if (curStep() === "build" && !s.multi) { const list = M.slots.filter(x => x.phase === "craft"); const nx = list.find(x => x.multi ? !(D.picks[x.id] || []).length : !D.picks[x.id]); if (nx) D.tab = nx.id; }
  render();
  orbiReact(before, checks(M, D, calc(M, D)), true);
  const st = document.getElementById("stage"); if (st) { st.classList.remove("pop"); void st.offsetWidth; st.classList.add("pop"); }
}
function act(a, el) {
  const M = G.mid ? mission() : null;
  switch (a) {
    case "home": stopAnim(); hush(); G.screen = "title"; render(); orbiSay(B("Welcome back, engineer!", "مرحبًا بعودتك أيها المهندس!"), "happy", { speak: false }); break;
    case "cases": stopAnim(); G.screen = "cases"; render(); orbiSay(B("Pick a case. I’ll be right here with you!", "اختر قضية. سأكون معك هنا!"), "happy"); break;
    case "start": G.screen = "cases"; render(); orbiSay(B("Each folder is a real mission. Pick one and let’s find out what happened!", "كل ملف مهمة حقيقية. اختر واحدًا ولنكتشف ما حدث!"), "happy"); break;
    case "lang": LANG = G.lang = G.lang === "en" ? "ar" : "en"; document.documentElement.lang = LANG; document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr"; hush(); render(); orbiSay(B("Language changed!", "تم تغيير اللغة!"), "happy"); break;
    case "sound": G.sound = !G.sound; if (!G.sound) hush(); render(); if (G.sound) orbiSay(B("I can talk again!", "أستطيع الكلام مجددًا!"), "happy"); break;
    case "mode": G.mode = el.dataset.m; render(); orbiSay(MODES[G.mode].blurb, "happy"); break;
    case "crew": G.crew.n = +el.dataset.n; ROLE_ORDER.forEach((r, i) => { G.crew.owner[r] = i % G.crew.n; }); render(); break;
    case "open": { stopAnim(); hush(); G.mid = el.dataset.id; G.screen = "mission"; const D = design();
      if (D.launched && !D.result) { D.launched = false; D.votes = {}; D.step = stepsFor(mission()).indexOf("poll"); }
      if (D.result) D.step = stepsFor(mission()).indexOf("closed");
      D.lastRole = null; window.scrollTo(0, 0); enterStep(); break; }
    case "next": { const D = design(), step = curStep(), steps = stepsFor(M);
      if (step === "objective" && !D.goal) return;
      if (step === "build" && M.slots.filter(s => s.phase === "craft").some(s => s.multi ? !(D.picks[s.id] || []).length : !D.picks[s.id])) return;
      if (step === "launch" && M.slots.filter(s => s.phase === "launch").some(s => !D.picks[s.id])) return;
      if (step === "flight") { D.maxStep = steps.length - 1; }
      goStep(D.step + 1); break; }
    case "to-poll": { const D = design(); if (M.slots.filter(s => s.phase === "verify" && !s.multi).some(s => !D.picks[s.id])) return; D.votes = {}; goStep(D.step + 1); break; }
    case "prev": { const D = design(); if (D.step > 0) goStep(D.step - 1); break; }
    case "orbi-toggle": ORBI.hidden = !ORBI.hidden; orbiRender(); document.getElementById("orbi-text").textContent = ORBI.full; break;
    case "orbi-next": orbiNext(); break;
    case "orbi-repeat": orbiSay(ORBI.full, ORBI.expr, { keepQueue: true }); break;
    case "hint": design().track.hints++; orbiHint(); break;
    case "clue": { const D = design(), i = +el.dataset.i; if (!D.clues.includes(i)) D.clues.push(i); const cl = M.story.clues[i]; render(); orbiSay(cl.orbi, cl.expr);
      if (D.clues.length === M.story.clues.length && !D.diag.done) setTimeout(() => { const s = document.getElementById("solve"); if (s) s.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300); break; }
    case "answer": { const D = design(), q = M.story.diagnose[D.diag.q], i = +el.dataset.i;
      if (i === q.correct) { orbiSay(q.yes, "party"); D.diag.q++; if (D.diag.q >= M.story.diagnose.length) D.diag.done = true; render(); }
      else { D.diag.wrong++; el.classList.add("shake"); el.disabled = true;
        orbiSay(MODES[G.mode].hints === "none" ? B("Not quite. Look at the clues again.", "ليس تمامًا. انظر إلى الأدلة مجددًا.") : q.opts[i].no, "worried"); }
      break; }
    case "goal": { const D = design(); D.track.acts.sci++; D.goal = el.dataset.id; D.extra = D.extra.filter(x => x !== D.goal); render(); const g = M.goals.primary.find(x => x.id === D.goal); orbiSay(B(`Great question! Now every part we pick must help answer it.`, `سؤال رائع! الآن كل قطعة نختارها يجب أن تساعد في الإجابة عنه.`), "happy", { speak: G.mode === "cadet" }); break; }
    case "extra": { const D = design(), id = el.dataset.id; D.track.acts.sci++; D.extra = D.extra.includes(id) ? D.extra.filter(x => x !== id) : D.extra.concat(id); render(); break; }
    case "tab": design().tab = el.dataset.id; render(); break;
    case "place": pickPart(el.dataset.slot, el.dataset.opt); break;
    case "vote": { const D = design(); const r = ROLE_ORDER.find(x => !D.votes[x]); if (!r) return; D.votes[r] = el.dataset.v;
      { const mine = checks(M, D, calc(M, D)).filter(k => k.role === r); const worst = mine.some(k => k.status === "nogo" || k.status === "wait") ? "nogo" : mine.some(k => k.status === "warn") ? "warn" : "go"; D.track.polls.push({ role: r, v: el.dataset.v, worst }); }
      const nx = ROLE_ORDER.find(x => !D.votes[x]);
      if (nx) { const go = () => { render(); orbiSay(B(`${L(ROLES[nx].name)}, are you GO?`, `${L(ROLES[nx].name)}، هل أنت جاهز؟`), "normal"); }; if (G.crew.n > 1 && G.crew.owner[nx] !== G.crew.owner[r]) handoff(nx, go); else go(); }
      else { render(); orbiSay(ROLE_ORDER.some(x => D.votes[x] === "nogo") ? B("Launch held. Good call if something’s wrong!", "تم إيقاف الإطلاق. قرار جيد إن كان هناك خطأ!") : B("Everyone is GO! Press LAUNCH!", "الجميع جاهز! اضغط إطلاق!"), "happy"); }
      break; }
    case "fix": { const D = design(); D.stats.noGo++; D.stats.pendingFix = true; D.votes = {}; goStep(stepsFor(M).indexOf("build")); break; }
    case "launch": { const D = design(), c = calc(M, D), ck = checks(M, D, c);
      if (ck.some(x => x.hard && (x.status === "nogo" || x.status === "wait"))) return;
      D.stats.redGo = ck.filter(x => x.status === "nogo").length; D.stats.amberGo = ck.filter(x => x.status === "warn").length;
      if (D.stats.pendingFix) { D.stats.fixed = true; D.stats.pendingFix = false; }
      D.launched = true; D.result = null; startFlight();
      countdown(() => goStep(stepsFor(M).indexOf("flight"))); break; }
    case "speed": G.speed = +el.dataset.v; document.querySelectorAll('[data-act="speed"]').forEach(b => b.classList.toggle("on", +b.dataset.v === G.speed)); break;
    case "skip": G.speed = 10; document.querySelectorAll('[data-act="speed"]').forEach(b => b.classList.remove("on")); break;
    case "decide": decide(+el.dataset.i); break;
    case "retry": { stopAnim(); RUN = null; const D = design(); D.launched = false; D.result = null; D.votes = {}; D.lastRole = null; goStep(stepsFor(M).indexOf("objective")); break; }
  }
}

/* ---------- drag & drop (mouse/pen); taps use the Install button ---------- */
let DRAG = null;
document.addEventListener("pointerdown", e => {
  const card = e.target.closest("[data-drag]");
  if (!card || e.pointerType === "touch" || e.button > 0 || e.target.closest("button")) return;
  DRAG = { slot: card.dataset.slot, opt: card.dataset.opt, x0: e.clientX, y0: e.clientY, ghost: null, card };
});
document.addEventListener("pointermove", e => {
  if (!DRAG) return;
  if (!DRAG.ghost && Math.hypot(e.clientX - DRAG.x0, e.clientY - DRAG.y0) > 8) {
    DRAG.ghost = document.createElement("div"); DRAG.ghost.className = "drag-ghost"; DRAG.ghost.innerHTML = DRAG.card.querySelector(".pic").innerHTML; document.body.appendChild(DRAG.ghost);
    document.body.classList.add("dragging");
  }
  if (DRAG.ghost) { DRAG.ghost.style.left = e.clientX + "px"; DRAG.ghost.style.top = e.clientY + "px";
    const st = document.getElementById("stage"); if (st) { const r = st.getBoundingClientRect(); st.classList.toggle("over", e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom); } }
});
document.addEventListener("pointerup", e => {
  if (!DRAG) return;
  const d = DRAG; DRAG = null; document.body.classList.remove("dragging");
  if (d.ghost) { d.ghost.remove(); const st = document.getElementById("stage");
    if (st) { st.classList.remove("over"); const r = st.getBoundingClientRect(); if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) { const D = design(), s = slot(mission(), d.slot); const sel = s.multi ? (D.picks[d.slot] || []).includes(d.opt) : D.picks[d.slot] === d.opt; if (!sel) pickPart(d.slot, d.opt); } } }
});

document.addEventListener("click", e => { const el = e.target.closest("[data-act]"); if (!el || el.disabled) return; act(el.dataset.act, el); });
document.addEventListener("input", e => { const el = e.target; if (el.dataset.name != null) { const i = +el.dataset.name; G.crew.names[i] = el.value.slice(0, 16); document.querySelectorAll("select[data-own] option").forEach(o => { if (+o.value === i) o.textContent = pname(i); }); } });
document.addEventListener("change", e => { const el = e.target; if (el.dataset.own) G.crew.owner[el.dataset.own] = +el.value; });

function render() {
  const fid = document.activeElement && document.activeElement.id;
  const html = G.screen === "title" ? viewTitle() : G.screen === "cases" ? viewCases() : viewMission();
  $app.innerHTML = topbar() + html;
  document.body.classList.toggle("on-title", G.screen === "title");
  if (fid) { const el = document.getElementById(fid); if (el) el.focus({ preventScroll: true }); }
  if (G.screen === "mission") {
    const step = curStep();
    if (step === "flight" && RUN) { RUN.shown = 0; updateLog(); if (RUN.pending) showDecision(); if (RUN.sim.done) { showDone(); const cv = document.getElementById("sky"); if (cv) drawFlight(cv.getContext("2d"), cv.width, cv.height, RUN, 0); } }
  }
  orbiRender(); const t = document.getElementById("orbi-text"); if (t) t.textContent = ORBI.full;
}

ROLE_ORDER.forEach((r, i) => { G.crew.owner[r] = i % G.crew.n; });
render();
orbiSay(B("Hi! I’m Orbi, your mission assistant. Choose your crew and level, then press Start!", "مرحبًا! أنا أوربي، مساعد مهمتك. اختر فريقك ومستواك ثم اضغط ابدأ!"), "happy", { speak: false });
