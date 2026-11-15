/* ===================== SECOND CHANCE v2 — Orbi, the talking assistant ===================== */
const ORBI = { expr: "normal", timer: 0, queue: [], onDone: null, full: "", hidden: false };
const $orbi = document.getElementById("orbi");

function stripEmoji(t) { return t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "").replace(/\s+/g, " ").trim(); }
let VOICES = [];
function loadVoices() { try { VOICES = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { VOICES = []; } }
if (window.speechSynthesis) { loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) { /* ignore */ } }

/* ---- Orbi's voice ----
   Arabic: prefer natural Modern Standard Arabic voices (Edge "Online (Natural)", Google, Apple), Saudi/MSA first,
   speak at a normal pitch (a high pitch makes Arabic hard to understand) and read Latin abbreviations as Arabic words. */
const AR_SAY = [
  [/NO-GO/g, "نو غو"], [/\bGO\b/g, "غو"], [/\bUHF\b/g, "يو إتش إف"], [/\bK2\b/g, "كيه تو"], [/OCO-2/g, "أوكو اثنان"], [/OCO-3/g, "أوكو ثلاثة"], [/\bOCO\b/g, "أوكو"],
  [/\bCubeSat\b/gi, "كيوب سات"], [/\b(\d+)U\b/g, "$1 يو"], [/\bX\)/g, "إكس)"], [/\bS\)/g, "إس)"], [/\bKa\b/g, "كا"], [/\bA-?Train\b/g, "القطار إيه"], [/\bL2\b/g, "إل اثنان"],
  [/(\d)\s?كم/g, "$1 كيلومتر"], [/(\d)\s?كغ/g, "$1 كيلوغرام"], [/(\d)\s?م\b/g, "$1 متر"], [/(\d)\s?%/g, "$1 بالمئة"], [/واط·ساعة/g, "واط ساعة"],
  [/lbf·s/g, "رطل ثانية"], [/N·s/g, "نيوتن ثانية"], [/\bimpulse\b/g, "الدفع"], [/«|»/g, ""], [/…/g, "، "], [/\s*[-–]\s*/g, " "]
];
function arSpeech(t) { let x = t; AR_SAY.forEach(([a, b]) => { x = x.replace(a, b); }); return x; }
function voiceScore(v, ar) {
  const n = (v.name || "") + " " + (v.lang || ""), l = (v.lang || "").toLowerCase();
  let s = 0;
  if (/natural|online|neural|premium|enhanced/i.test(n)) s += 50;
  if (/google/i.test(n)) s += 30;
  if (ar) { if (l.startsWith("ar-sa")) s += 20; else if (l.startsWith("ar-xa") || l === "ar") s += 18; else if (l.startsWith("ar-ae") || l.startsWith("ar-jo")) s += 12; else if (l.startsWith("ar-eg")) s += 10;
    if (/hamed|zariyah|salma|shakir|maged|majed|laila|tarik|naayf|amany/i.test(n)) s += 8; }
  else { if (l.startsWith("en-us")) s += 15; if (/aria|jenny|ava|samantha|zira|female/i.test(n)) s += 8; }
  if (v.localService === false) s += 3;
  return s;
}
function bestVoice(ar) {
  const want = ar ? "ar" : "en";
  const list = VOICES.filter(v => (v.lang || "").toLowerCase().replace("_", "-").startsWith(want));
  list.sort((a, b) => voiceScore(b, ar) - voiceScore(a, ar));
  return list[0] || null;
}
let AR_WARNED = false;
function speak(text) {
  if (!G.sound || !window.speechSynthesis) { setTalking(false); return; }
  try {
    speechSynthesis.cancel();
    if (!VOICES.length) loadVoices();
    const ar = LANG === "ar";
    const v = bestVoice(ar);
    if (ar && !v && !AR_WARNED) { AR_WARNED = true; setTimeout(() => orbiSay(B("", "لا يوجد صوت عربي على هذا الجهاز. للحصول على صوت عربي فصيح وطبيعي افتح اللعبة في متصفح Edge، أو أضف اللغة العربية من إعدادات الكلام في جهازك."), "worried", { speak: false }), 400); }
    let clean = stripEmoji(text);
    if (ar) clean = arSpeech(clean);
    // speak sentence by sentence: smoother, and Chrome stops very long utterances
    const parts = clean.split(/(?<=[.!?؟!؛\n])\s+/).map(p => p.trim()).filter(Boolean);
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part);
      u.lang = ar ? (v ? v.lang : "ar-SA") : "en-US";
      if (v) u.voice = v;
      u.pitch = ar ? 1.05 : 1.3;
      u.rate = ar ? 0.92 : 1.03;
      if (i === parts.length - 1) { u.onend = () => setTalking(false); u.onerror = () => setTalking(false); }
      speechSynthesis.speak(u);
    });
  } catch (e) { setTalking(false); }
}
function hush() { try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* ignore */ } setTalking(false); }
function setTalking(on) { $orbi.classList.toggle("talking", !!on); }

function orbiRender() {
  const showNext = ORBI.queue.length > 0 || !!ORBI.onDone;
  $orbi.innerHTML = `<button type="button" class="orbi-face" data-act="orbi-toggle" aria-label="${esc(T("Orbi, your assistant", "أوربي، مساعدك"))}">${orbiSVG(ORBI.expr)}</button>
    <div class="bubble ${ORBI.hidden ? "hide" : ""}" role="status" aria-live="polite">
      <div class="who">Orbi</div><p id="orbi-text"></p>
      <div class="bubble-row">
        ${hintAvailable() ? `<button type="button" class="chip" data-act="hint">💡 ${T("Hint", "تلميح")}</button>` : ""}
        <button type="button" class="chip" data-act="orbi-repeat" aria-label="${esc(T("Say it again", "أعد القول"))}">🔁</button>
        ${showNext ? `<button type="button" class="chip next" data-act="orbi-next">${T("Next", "التالي")} ▸</button>` : ""}
      </div></div>`;
}
function orbiSay(text, expr, opts) {
  opts = opts || {};
  ORBI.expr = expr || "normal";
  ORBI.full = L(text);
  ORBI.hidden = false;
  if (!opts.keepQueue) { ORBI.queue = []; ORBI.onDone = opts.onDone || null; }
  orbiRender();
  const el = document.getElementById("orbi-text");
  clearInterval(ORBI.timer);
  setTalking(true);
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || opts.instant) { el.textContent = ORBI.full; }
  else {
    let i = 0; const full = ORBI.full;
    ORBI.timer = setInterval(() => { i += 2; el.textContent = full.slice(0, i); if (i >= full.length) { clearInterval(ORBI.timer); if (!G.sound) setTalking(false); } }, 18);
  }
  if (opts.speak !== false) speak(ORBI.full); else setTimeout(() => setTalking(false), 900);
}
function orbiStory(lines, onDone) {
  // lines: [{t, e}]
  const list = lines.slice();
  const first = list.shift();
  ORBI.queue = list; ORBI.onDone = onDone || null;
  orbiSay(first.t, first.e, { keepQueue: true });
}
function orbiNext() {
  if (ORBI.queue.length) { const n = ORBI.queue.shift(); orbiSay(n.t, n.e, { keepQueue: true }); return; }
  const cb = ORBI.onDone; ORBI.onDone = null; orbiRender(); document.getElementById("orbi-text").textContent = ORBI.full;
  if (cb) cb();
}
function hintAvailable() {
  if (G.screen !== "mission") return false;
  if (MODES[G.mode].hints === "none") return false;
  const M = mission(); const step = stepsFor(M)[design().step];
  return !!(M.hints && M.hints[step]);
}
function orbiHint() { const M = mission(); const step = stepsFor(M)[design().step]; if (M.hints && M.hints[step]) orbiSay(M.hints[step], "think"); }

/* Orbi reacts to design changes: new red flags first, then encouragement. */
const REACT = {
  mass: B("Whoa, too heavy for the rocket! Pick a bigger rocket or lighter parts.", "واو، ثقيل جدًا على الصاروخ! اختر صاروخًا أكبر أو قطعًا أخف."),
  busmass: B("Too heavy for this CubeSat size!", "ثقيل جدًا على حجم هذا الكيوب سات!"),
  volume: B("It doesn’t fit inside! Choose a bigger CubeSat or smaller parts.", "لا يتسع بالداخل! اختر كيوب سات أكبر أو قطعًا أصغر."),
  power: B("We use more power than we make! Bigger solar panels?", "نستهلك طاقة أكثر مما ننتج! ألواح شمسية أكبر؟"),
  battery: B("The battery won’t last through the dark part of the orbit.", "البطارية لن تكفي خلال الجزء المظلم من المدار."),
  data: B("The radio can’t send all that data home. Faster radio, or more stations?", "الراديو لا يستطيع إرسال كل هذه البيانات. راديو أسرع أم محطات أكثر؟"),
  budget: B("Over budget! Something has to go.", "تجاوزنا الميزانية! يجب أن نستغني عن شيء."),
  schedule: B("We’ll miss the launch date! Too many months.", "سنفوت موعد الإطلاق! الشهور كثيرة جدًا."),
  orbit: B("This rocket can’t reach that orbit.", "هذا الصاروخ لا يصل إلى هذا المدار."),
  obj: B("Hmm, nothing on board answers our main question yet.", "همم، لا شيء على المركبة يجيب عن سؤالنا الرئيسي بعد."),
  off: B("That instrument doesn’t help with our questions. Extra weight!", "هذا الجهاز لا يساعد في أسئلتنا. وزن زائد!")
};
const PRAISE = [B("Nice choice!", "اختيار رائع!"), B("Looking good, engineer!", "يبدو رائعًا أيها المهندس!"), B("Ooh, shiny!", "واو، لامع!"), B("Every part counts. Good thinking!", "كل قطعة مهمة. تفكير جيد!")];
function orbiReact(before, after, opt) {
  const was = {}; before.forEach(c => { was[c.key] = c.status; });
  const worse = after.find(c => (c.status === "nogo" || c.status === "warn") && was[c.key] !== c.status && REACT[c.key] && !(was[c.key] === "nogo" && c.status === "warn"));
  if (worse) { orbiSay(REACT[worse.key], worse.status === "nogo" ? "shocked" : "worried"); return; }
  const fixed = after.find(c => c.status === "go" && (was[c.key] === "nogo"));
  if (fixed) { orbiSay(B("Problem solved! 🎉", "تم حل المشكلة! 🎉"), "party"); return; }
  if (opt && Math.random() < 0.45) orbiSay(PRAISE[Math.floor(Math.random() * PRAISE.length)], "happy", { speak: G.mode === "cadet" });
}
