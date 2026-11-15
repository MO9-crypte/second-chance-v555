/* ===================== SECOND CHANCE v2 — level challenges & mission report (data analysis) ===================== */
function challengeCard() {
  const m = MODES[G.mode];
  return `<div class="chal-card"><h3>🏅 ${T("Your challenges at", "تحدياتك في مستوى")} ${L(m.name)}</h3>
    <p class="small">${L(m.blurb)}</p>
    <ol>${CHALLENGES[G.mode].map(c => `<li>${L(c.t)}</li>`).join("")}</ol>
    <p class="small muted">${T("Stars need challenges: all of them for ⭐⭐⭐.", "النجوم تحتاج التحديات: كلها من أجل ⭐⭐⭐.")}</p></div>`;
}

const pct = v => `${v >= 0 ? "+" : ""}${Math.round(v * 100)}%`;
const col = v => v >= 70 ? "var(--mint)" : v >= 45 ? "var(--sun)" : "var(--red)";

/* cumulative science data: actual vs plan, with event markers */
function dataChart(r, M) {
  const W = 640, H = 230, P = { l: 52, r: 16, t: 16, b: 34 };
  const tl = r.telemetry, days = tl.plannedDays;
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  // build the actual curve from the flight samples and scale it to the real total
  let cum = 0; const pts = [{ x: 0, y: 0 }];
  let prev = 0;
  (r.series.length ? r.series : [{ p: 1, rate: 1 }]).forEach(s => { cum += Math.max(0, s.rate) * (s.p - prev); prev = s.p; pts.push({ x: s.p, y: cum }); });
  const k = cum > 0 ? tl.dataGb / cum : 0;
  const maxY = Math.max(tl.dataPlanGb, tl.dataGb, 1) * 1.08;
  const X = p => P.l + p * iw, Y = v => P.t + ih - (v / maxY) * ih;
  const line = pts.map((p, i) => `${i ? "L" : "M"}${X(p.x).toFixed(1)} ${Y(p.y * k).toFixed(1)}`).join(" ");
  const area = line + ` L${X(pts[pts.length - 1].x).toFixed(1)} ${Y(0)} L${X(0)} ${Y(0)} Z`;
  let g = "";
  for (let i = 0; i <= 4; i++) { const v = maxY * i / 4; g += `<line x1="${P.l}" x2="${W - P.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="rgba(255,255,255,.12)"/><text x="${P.l - 8}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="#C9C2FF">${fmt(v)}</text>`; }
  for (let i = 0; i <= 4; i++) { const p = i / 4; g += `<text x="${X(p)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="#C9C2FF">${T("day", "يوم")} ${Math.round(p * days)}</text>`; }
  g += `<path d="M${X(0)} ${Y(0)} L${X(1)} ${Y(tl.dataPlanGb)}" stroke="#C9C2FF" stroke-width="2" stroke-dasharray="6 6" fill="none"/>`;
  g += `<path d="${area}" fill="rgba(61,219,164,.18)"/><path d="${line}" stroke="#3DDBA4" stroke-width="3" fill="none" stroke-linejoin="round"/>`;
  r.marks.forEach(m => { const c = m.tone === "bad" ? "#FF5A5F" : m.tone === "warn" ? "#FFC83D" : "#3DDBA4"; g += `<line x1="${X(m.p)}" x2="${X(m.p)}" y1="${P.t}" y2="${Y(0)}" stroke="${c}" stroke-width="1.5" stroke-dasharray="2 4" opacity=".8"/><circle cx="${X(m.p)}" cy="${P.t + 4}" r="4" fill="${c}"/>`; });
  if (r.outcome === "lost") { const last = pts[pts.length - 1]; g += `<text x="${X(last.x) + 6}" y="${Y(0) - 8}" font-size="13" font-weight="800" fill="#FF5A5F">✖ ${T("lost", "فُقدت")}</text>`; }
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(T("Science data returned over the mission", "البيانات العلمية المُرسلة خلال المهمة"))}">${g}</svg>
    <div class="legend"><span><i style="background:#3DDBA4"></i>${T("Your mission (Gb)", "مهمتك (غيغابت)")}</span><span><i class="dash"></i>${T("Perfect plan", "الخطة المثالية")}</span><span><i style="background:#FF5A5F"></i>${T("problem", "مشكلة")}</span><span><i style="background:#FFC83D"></i>${T("warning", "تحذير")}</span><span><i style="background:#3DDBA4"></i>${T("good news", "خبر جيد")}</span></div>`;
}

/* launch margins vs the 10–30% target engineers aim for */
function marginChart(r) {
  const rows = [["mass", "⚖️", T("Weight", "الوزن")], ["power", "⚡", T("Power", "الطاقة")], ["battery", "🔋", T("Battery", "البطارية")], ["data", "📶", T("Data link", "رابط البيانات")], ["budget", "💰", T("Money left", "المال المتبقي")], ["time", "⏳", T("Time left", "الوقت المتبقي")]];
  const lo = -0.5, hi = 1, W = 640, rowH = 30, P = { l: 132, r: 60 };
  const X = v => P.l + (clamp(v, lo, hi) - lo) / (hi - lo) * (W - P.l - P.r);
  let g = `<rect x="${X(0.1)}" y="0" width="${X(0.3) - X(0.1)}" height="${rows.length * rowH}" fill="rgba(61,219,164,.14)"/><line x1="${X(0)}" x2="${X(0)}" y1="0" y2="${rows.length * rowH}" stroke="#fff" stroke-width="1.5"/>`;
  rows.forEach((row, i) => {
    const v = r.margins[row[0]], y = i * rowH;
    const c = v < 0 ? "#FF5A5F" : v < 0.1 ? "#FFC83D" : "#3DDBA4";
    const x0 = X(Math.min(0, v)), x1 = X(Math.max(0, v));
    g += `<text x="${P.l - 10}" y="${y + 20}" text-anchor="end" font-size="13" fill="#fff" font-weight="700">${row[1]} ${row[2]}</text><rect x="${x0}" y="${y + 7}" width="${Math.max(2, x1 - x0)}" height="16" rx="5" fill="${c}"/><text x="${x1 + 6}" y="${y + 20}" font-size="12.5" fill="#E4E0FF" font-weight="700">${pct(v)}</text>`;
  });
  g += `<text x="${(X(0.1) + X(0.3)) / 2}" y="${rows.length * rowH + 16}" text-anchor="middle" font-size="11.5" fill="#3DDBA4">${T("engineers’ target 10–30%", "هدف المهندسين 10–30%")}</text>`;
  return `<svg viewBox="0 0 ${W} ${rows.length * rowH + 24}" class="chart" role="img" aria-label="${esc(T("Margins at launch", "الهوامش عند الإطلاق"))}">${g}</svg>`;
}

/* plain-language analysis: strengths and what to improve next time */
function analysis(r, M, D) {
  const tips = [], good = [];
  const tl = r.telemetry, m = r.margins;
  if (r.outcome === "lost" && !M.open) tips.push(T("Your design repeated the real failure. Re-read the clues: the root cause can be fixed in the design or the tests.", "تصميمك كرّر الفشل الحقيقي. أعد قراءة الأدلة: السبب الجذري يمكن إصلاحه في التصميم أو الاختبارات."));
  if (m.mass < 0.1) tips.push(T(`Weight margin was ${pct(m.mass)}. Aim for 10–30%: lighter parts or a bigger rocket.`, `هامش الوزن كان ${pct(m.mass)}. استهدف 10–30%: قطع أخف أو صاروخ أكبر.`));
  if (m.power < 0.1) tips.push(T(`Power margin was ${pct(m.power)}. Solar cells age; keep at least 10–20% spare.`, `هامش الطاقة كان ${pct(m.power)}. الخلايا الشمسية تتقادم؛ احتفظ بـ 10–20% احتياطي.`));
  if (m.battery < 0.2) tips.push(T(`Battery spare was ${pct(m.battery)}. A battery fault would hurt: aim for 20%+.`, `احتياطي البطارية كان ${pct(m.battery)}. أي عطل في البطارية سيؤذي: استهدف 20% أو أكثر.`));
  if (tl.ratio < 1) tips.push(T(`The radio could send only ${Math.round(tl.ratio * 100)}% of the data produced. Use a faster radio, a bigger dish or more ground stations.`, `الراديو أرسل ${Math.round(tl.ratio * 100)}% فقط من البيانات المُنتجة. استخدم راديو أسرع أو طبقًا أكبر أو محطات أكثر.`));
  if (tl.down > 10) tips.push(T(`${tl.down} days were lost to problems. A backup computer and the stress test cut downtime.`, `ضاع ${tl.down} يومًا بسبب المشاكل. الحاسوب الاحتياطي واختبار الضغط يقللان التوقف.`));
  if (m.budget < 0.03 && m.budget >= 0) tips.push(T("You spent almost the whole budget: nothing left for surprises.", "أنفقت الميزانية كلها تقريبًا: لم يبقَ شيء للمفاجآت."));
  if (tl.testsAll && tl.tests / tl.testsAll < 0.5) tips.push(T(`Only ${tl.tests} of ${tl.testsAll} tests were run. Untested parts are where surprises live.`, `أُجري ${tl.tests} فقط من ${tl.testsAll} اختبارات. القطع غير المختبرة هي مكان المفاجآت.`));
  r.roles.forEach(row => {
    if (row.redMissed) tips.push(T(`${L(ROLES[row.role].name)} voted GO with a red flag in their own area. A real flight director would hold the launch.`, `${L(ROLES[row.role].name)} صوّت GO مع علامة حمراء في مجاله. مدير الطيران الحقيقي كان سيوقف الإطلاق.`));
    if (row.needless) tips.push(T(`${L(ROLES[row.role].name)} held the launch when their numbers were fine. Check before voting NO-GO.`, `${L(ROLES[row.role].name)} أوقف الإطلاق وأرقامه سليمة. راجع قبل التصويت NO-GO.`));
  });
  const miss = r.keys.filter(k => !k.ok).slice(0, 2);
  miss.forEach(k => tips.push(`${L(k.t)}: ${L(k.why)}`));
  if (tl.hints > 2) tips.push(T(`You used ${tl.hints} hints. Next time, try with fewer.`, `استخدمت ${tl.hints} تلميحات. في المرة القادمة جرّب بعدد أقل.`));
  const comp = [["perf", T("Mission result", "نتيجة المهمة")], ["sci", T("Science", "العلم")], ["dec", T("Smart decisions", "القرارات الذكية")], ["eff", T("Resource use", "استخدام الموارد")], ["team", G.crew.n > 1 ? T("Teamwork", "العمل الجماعي") : T("Self-checks", "المراجعة الذاتية")], ["chal", T("Level challenges", "تحديات المستوى")]];
  comp.filter(c => r[c[0]] >= 80).slice(0, 3).forEach(c => good.push(T(`${c[1]}: ${r[c[0]]}/100`, `${c[1]}: ${r[c[0]]}/100`)));
  r.roles.filter(row => row.caught).forEach(row => good.push(T(`${L(ROLES[row.role].name)} caught a real problem with a NO-GO.`, `${L(ROLES[row.role].name)} اكتشف مشكلة حقيقية بتصويت NO-GO.`)));
  if (tl.uptime >= 95 && r.outcome !== "lost") good.push(T(`Uptime ${tl.uptime}%: almost no time lost.`, `زمن التشغيل ${tl.uptime}%: لم يضع وقت تقريبًا.`));
  return { tips: tips.slice(0, 6), good: good.slice(0, 4) };
}

function vClosed(M, D) {
  const r = D.result; if (!r) return "";
  const tl = r.telemetry;
  const head = { success: T("Mission success!", "نجحت المهمة!"), rescued: T("Mission rescued!", "أُنقذت المهمة!"), partial: T("Partial success", "نجاح جزئي"), lost: T("Mission lost", "فُقدت المهمة") }[r.outcome];
  const atts = G.attempts[M.id] || [];
  const prev = atts.length > 1 ? atts[atts.length - 2] : null;
  const comp = [["perf", T("Mission result", "نتيجة المهمة"), 25], ["sci", T("Science", "العلم"), 20], ["dec", T("Smart decisions", "القرارات الذكية"), 20], ["eff", T("Resource use", "استخدام الموارد"), 15], ["team", G.crew.n > 1 ? T("Teamwork", "العمل الجماعي") : T("Self-checks", "المراجعة الذاتية"), 10], ["chal", T("Level challenges", "تحديات المستوى"), 10]];
  const bars = comp.map(c => { const v = r[c[0]], d = prev && prev[c[0]] != null ? v - prev[c[0]] : null;
    return `<div class="sbar"><span>${c[1]} <small class="muted">${c[2]}%</small></span><div class="mbar"><i style="width:${v}%;background:${col(v)}"></i></div><b>${v}</b>${d != null ? `<em class="${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "▲" : d < 0 ? "▼" : "="}${d ? Math.abs(d) : ""}</em>` : "<em></em>"}</div>`; }).join("");
  const tiles = [
    ["📅", T("Days operating", "أيام التشغيل"), `${fmt(tl.daysOp)}`, T(`planned ${fmt(tl.plannedDays)}`, `المخطط ${fmt(tl.plannedDays)}`)],
    ["💾", T("Science data home", "بيانات علمية وصلت"), tl.dataPlanGb ? `${fmt(tl.dataGb)} Gb` : "–", tl.dataPlanGb ? T(`${Math.round(100 * tl.dataGb / tl.dataPlanGb)}% of the perfect plan`, `${Math.round(100 * tl.dataGb / tl.dataPlanGb)}% من الخطة المثالية`) : ""],
    ["⏱️", T("Uptime", "زمن التشغيل الفعلي"), `${tl.uptime}%`, T(`${tl.down} days lost to problems`, `${tl.down} يومًا ضاعت بسبب المشاكل`)],
    ["💰", T("Budget used", "الميزانية المستخدمة"), `${Math.round(100 * tl.cost / tl.budget)}%`, `${money(M, tl.cost)} / ${money(M, tl.budget)}`],
    ["⏳", T("Schedule", "الجدول الزمني"), `${fmt(tl.months, 1)}/${tl.deadline}`, T("months to launch", "شهرًا حتى الإطلاق")],
    ["🧪", T("Tests run", "الاختبارات المنفذة"), `${tl.tests}/${tl.testsAll}`, T(`${tl.swaps} design changes tried`, `${tl.swaps} تغييرًا في التصميم`)]
  ].map(t => `<div class="tile"><span class="te">${t[0]}</span><b>${t[2]}</b><span>${t[1]}</span><small>${t[3]}</small></div>`).join("");
  const ch = r.ch.map(c => `<li class="${c.ok ? "ok" : "no"}"><span class="mk">${c.ok ? "✓" : "✗"}</span><span><b>${L(c.t)}</b></span></li>`).join("");
  const roleRows = r.roles.map(row => `<tr><td>${ROLES[row.role].emoji} ${L(ROLES[row.role].name)}</td>${G.crew.n > 1 ? `<td>${esc(row.player)}</td>` : ""}<td>${row.acts}</td><td>${row.vote == null ? "–" : row.vote}</td><td>${row.calls}</td><td>${row.domain}</td><td><b style="color:${col(row.score)}">${row.score}</b></td></tr>`).join("");
  const share = r.share.length ? (() => { const sum = r.share.reduce((a, s) => a + s.n, 0) || 1; return `<div class="share"><b>${T("Who did the work", "من قام بالعمل")}</b>${r.share.map(s => `<div class="sbar"><span>${esc(s.player)}</span><div class="mbar"><i style="width:${Math.round(100 * s.n / sum)}%;background:var(--sky)"></i></div><b>${Math.round(100 * s.n / sum)}%</b><em></em></div>`).join("")}<p class="small muted">${T("Balanced teams score higher: everyone should own decisions.", "الفرق المتوازنة تحصل على نتيجة أعلى: يجب أن يملك الجميع قرارات.")}</p></div>`; })() : "";
  const an = analysis(r, M, D);
  const keys = r.keys.map(k => `<li class="${k.ok ? "ok" : "no"}"><span class="mk" aria-hidden="true">${k.ok ? "✓" : "✗"}</span><span><b>${L(k.t)}</b><span>${L(k.why)}</span></span></li>`).join("");
  const reqs = r.reqs.map(q => `<li class="${q.met ? "ok" : "no"}"><span class="mk" aria-hidden="true">${q.met ? "✓" : "✗"}</span><span><b>${L(q.t)}</b><span>${T("Proven by", "يُثبت بـ")}: ${L(VERIFY[q.v])}</span></span></li>`).join("");
  const hist = atts.map(a => `<span class="att">${T("Try", "محاولة")} ${a.n} · ${L(MODES[a.mode || "engineer"].name)}: ${[0, 1, 2].map(i => i < a.stars ? "⭐" : "☆").join("")} ${a.total}</span>`).join("");
  const H = M.history;
  const rows = H.rows.map(row => `<tr><td>${L(row[0])}</td><td>${L(row[1])}</td><td>${esc(yourChoice(M, D, row[2]))}</td></tr>`).join("");
  const lv = LEVEL_CASES[G.mode], li = lv.indexOf(M.id), next = li >= 0 && li + 1 < lv.length ? mission(lv[li + 1]) : null;
  return `<section class="closed-top">
      <div class="stars-big">${[0, 1, 2].map(i => `<span class="sb ${i < r.stars ? "on" : ""}" style="--d:${i * 0.25}s">${starSVG(i < r.stars)}</span>`).join("")}</div>
      <h1>${head}</h1><p class="total">${r.total}<small>/100</small></p>
      <p class="lvl">${T("Level", "المستوى")}: <b>${L(MODES[r.mode].name)}</b> · ${T("challenges", "التحديات")} ${r.ch.filter(c => c.ok).length}/${r.ch.length}</p>
      ${D.diag.done ? `<div class="earned">${badgeSVG(M.badge.color, M.badge.glyph)}<span>${L(M.badge.name)}</span></div>` : ""}
      ${hist ? `<div class="atts">${hist}</div>` : ""}
    </section>
    <div class="closed-grid">
      <div class="card"><h2>🏅 ${T("Level challenges", "تحديات المستوى")}</h2><ul class="keys">${ch}</ul></div>
      <div class="card"><h2>📊 ${T("Score breakdown", "تفاصيل النتيجة")}</h2>${bars}${prev ? `<p class="small muted">▲▼ ${T("compared with your last try", "مقارنة بمحاولتك السابقة")}</p>` : ""}</div>
    </div>
    <h2 class="sec">🛰️ ${T("Mission telemetry", "بيانات المهمة")}</h2><div class="tiles">${tiles}</div>
    <div class="closed-grid">
      <div class="card"><h3>💾 ${T("Science data sent home over time", "البيانات العلمية المُرسلة عبر الزمن")}</h3>${dataChart(r, M)}</div>
      <div class="card"><h3>⚖️ ${T("Margins at launch", "الهوامش عند الإطلاق")}</h3>${marginChart(r)}<p class="small muted">${T("Below zero means the spacecraft was over its limit. Too much margin wastes money.", "تحت الصفر يعني أن المركبة تجاوزت حدها. الهامش الكبير جدًا يهدر المال.")}</p></div>
    </div>
    <div class="card team"><h2>🤝 ${G.crew.n > 1 ? T("Teamwork analysis", "تحليل العمل الجماعي") : T("Role-by-role analysis", "تحليل كل دور")}</h2>
      <div class="tablewrap"><table class="roles-t"><thead><tr><th>${T("Role", "الدور")}</th>${G.crew.n > 1 ? `<th>${T("Player", "اللاعب")}</th>` : ""}<th>${T("Choices made", "الاختيارات")}</th><th>${T("Poll vote", "جودة التصويت")}</th><th>${T("In-flight calls", "قرارات الطيران")}</th><th>${T("Own area result", "نتيجة مجاله")}</th><th>${T("Score", "النتيجة")}</th></tr></thead><tbody>${roleRows}</tbody></table></div>
      <p class="small muted">${T("Poll vote: 100 = voted correctly for your own numbers; voting GO with a red flag scores 0; holding the launch with nothing wrong scores 40.", "جودة التصويت: 100 = صوّت بشكل صحيح وفق أرقامك؛ التصويت GO مع علامة حمراء = 0؛ إيقاف الإطلاق دون مشكلة = 40.")}</p>${share}</div>
    <div class="closed-grid">
      <div class="card"><h2>💪 ${T("What you did well", "ما أحسنت فيه")}</h2>${an.good.length ? `<ul class="plain">${an.good.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : `<p class="muted">${T("Keep going: your strengths will show up here.", "استمر: ستظهر نقاط قوتك هنا.")}</p>`}</div>
      <div class="card"><h2>🎯 ${T("How to improve next time", "كيف تتحسن في المرة القادمة")}</h2>${an.tips.length ? `<ol class="plain">${an.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ol>` : `<p>${T("Nothing major. Try a harder level!", "لا شيء كبير. جرّب مستوى أصعب!")}</p>`}</div>
    </div>
    <div class="closed-grid">
      <div class="card"><h2>${T("Why it went this way", "لماذا حدث هذا")}</h2><ul class="keys">${keys}</ul></div>
      <div class="card"><h2>📜 ${T("Mission rules check", "مراجعة قواعد المهمة")}</h2><ul class="keys">${reqs}</ul></div>
    </div>
    <article class="casefile"><span class="stamp big">${M.open ? T("YOUR FILE", "ملفك") : L(M.stamp)}</span>
      <h2>${M.open ? T("Your case file", "ملف قضيتك") : T("What really happened", "ماذا حدث فعلًا")}</h2>
      ${M.open ? "" : `<p class="verdict-line ${r.outcome === "lost" ? "bad" : "ok"}">${r.outcome === "lost" ? T("Your crew repeated history.", "فريقك كرر التاريخ.") : T("Your crew changed the ending!", "فريقك غيّر النهاية!")}</p>`}
      <p>${L(H.story)}</p>
      ${rows ? `<table><thead><tr><th>${T("Decision", "القرار")}</th><th>${T("Real mission", "المهمة الحقيقية")}</th><th>${T("Your crew", "فريقك")}</th></tr></thead><tbody>${rows}</tbody></table>` : ""}
      <p class="lesson">💡 ${L(H.lesson)}</p><p class="src">${T("Source", "المصدر")}: ${L(H.source)} ${T("Game numbers are simplified.", "أرقام اللعبة مبسطة.")}</p></article>
    <div class="navrow"><button type="button" class="btn ghost" data-act="cases">◂ ${T("All cases", "كل القضايا")}</button>
      <button type="button" class="btn" data-act="retry">🔁 ${T("Redesign and fly again", "أعد التصميم وأطلق مجددًا")}</button>
      ${next ? `<button type="button" class="big-btn sm" data-act="open" data-id="${next.id}">${T("Next case", "القضية التالية")}: ${L(next.title)} ▸</button>` : `<button type="button" class="big-btn sm" data-act="cases">${T("Back to the cases", "العودة للقضايا")}</button>`}</div>`;
}
