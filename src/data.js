/* ===================== SECOND CHANCE v2 — missions (English + Arabic) =====================
   Numbers are simplified game values anchored on real NASA facts. */
let LANG = "en";
const B = (en, ar) => ({ en, ar });
const L = x => x == null ? "" : (typeof x === "string" ? x : (x[LANG] != null ? x[LANG] : x.en));
const T = (en, ar) => LANG === "ar" ? ar : en;

const ROLES = {
  sci: { id: "sci", name: B("Science Lead", "قائد العلوم"), emoji: "🔭", color: "#FF6FA5", blurb: B("Picks the question and the instruments.", "يختار السؤال العلمي والأجهزة.") },
  eng: { id: "eng", name: B("Spacecraft Engineer", "مهندس المركبة"), emoji: "🛠️", color: "#FFC83D", blurb: B("Builds the spacecraft: power, battery, brain, engine.", "يبني المركبة: الطاقة والبطارية والعقل والمحرك.") },
  nav: { id: "nav", name: B("Navigator", "الملّاح"), emoji: "🧭", color: "#4FC3F7", blurb: B("Picks the orbit, tracking and radio links.", "يختار المدار والتتبع والاتصال.") },
  pm:  { id: "pm",  name: B("Mission Boss", "مدير المهمة"), emoji: "💼", color: "#3DDBA4", blurb: B("Owns money, time, the rocket and the tests.", "مسؤول عن الميزانية والوقت والصاروخ والاختبارات.") }
};
const ROLE_ORDER = ["sci", "eng", "nav", "pm"];

const MODES = {
  cadet:    { name: B("Cadet", "مستكشف صغير"), age: B("Ages 8–12", "من 8 إلى 12 سنة"), money: 1.2, deadlineAdd: 3, numbers: false, hints: "auto", rules: "easy", events: ["storm"],
              blurb: B("Pictures instead of numbers, extra money and time, one surprise in flight. 3 challenges.", "صور بدل الأرقام، ومال ووقت إضافيان، ومفاجأة واحدة أثناء الطيران. 3 تحديات.") },
  engineer: { name: B("Engineer", "مهندس"), age: B("Ages 13+", "من 13 سنة"), money: 1, deadlineAdd: 0, numbers: true, hints: "ask", rules: "normal", events: ["storm", "ops"],
              blurb: B("Real numbers and real budgets, two surprises, hints only when you ask. 5 challenges.", "أرقام وميزانيات حقيقية، ومفاجأتان، وتلميحات عند الطلب فقط. 5 تحديات.") },
  director: { name: B("Flight Director", "مدير الطيران"), age: B("Experts", "للخبراء"), money: 0.95, deadlineAdd: -1, numbers: true, hints: "none", rules: "strict", events: ["storm", "ops", "glitch", "cell"],
              blurb: B("Less money and time, strict flight rules, four surprises, no hints. 7 challenges.", "مال ووقت أقل، وقواعد طيران صارمة، وأربع مفاجآت، وبلا تلميحات. 7 تحديات.") }
};

/* Level challenges: each level has its own, and each level is harder than the one before.
   r = result data, c = budgets at launch, D = design, M = mission */
const CHALLENGES = {
  cadet: [
    { id: "arrive", t: B("Get the spacecraft to work in space", "اجعل المركبة تعمل في الفضاء"), ok: (r) => r.outcome !== "lost" },
    { id: "answer", t: B("Answer your main question", "أجب عن سؤالك الرئيسي"), ok: (r, c) => r.outcome !== "lost" && c.goalsMet[0] && c.goalsMet[0].met },
    { id: "money", t: B("Stay inside the budget", "ابقَ داخل الميزانية"), ok: (r, c) => c.cost <= c.budget }
  ],
  engineer: [
    { id: "full", t: B("Full mission success (no partial result)", "نجاح كامل للمهمة (ليس جزئيًا)"), ok: (r) => r.outcome === "success" || r.outcome === "rescued" },
    { id: "bonus", t: B("Complete at least one bonus goal", "حقق هدفًا إضافيًا واحدًا على الأقل"), ok: (r, c) => r.outcome !== "lost" && c.goalsMet.slice(1).filter(g => g.met).length >= 1 },
    { id: "margin", t: B("Launch with at least 10% weight and power margin", "أطلق بهامش 10% على الأقل في الوزن والطاقة"), ok: (r, c) => r.margins.mass >= 0.1 && r.margins.power >= 0.1 },
    { id: "clean", t: B("Launch with no red flags", "أطلق دون أي علامة حمراء"), ok: (r, c, D) => !D.stats.redGo },
    { id: "detect", t: B("Solve the case with at most one wrong answer (or plan 3+ tests in Nile Watch)", "احلّ القضية بخطأ واحد على الأكثر (أو خطط 3 اختبارات أو أكثر في عين على النيل)"), ok: (r, c, D, M) => M.open ? (D.picks.tests || []).length >= 3 : D.diag.wrong <= 1 }
  ],
  director: [
    { id: "full", t: B("Full mission success", "نجاح كامل للمهمة"), ok: (r) => r.outcome === "success" || r.outcome === "rescued" },
    { id: "bonus", t: B("Complete at least one bonus goal", "حقق هدفًا إضافيًا واحدًا على الأقل"), ok: (r, c) => r.outcome !== "lost" && c.goalsMet.slice(1).filter(g => g.met).length >= 1 },
    { id: "margin", t: B("Margins: 15% weight, 20% power, 20% extra battery", "الهوامش: 15% وزن، و20% طاقة، و20% بطارية إضافية"), ok: (r) => r.margins.mass >= 0.15 && r.margins.power >= 0.2 && r.margins.battery >= 0.2 },
    { id: "uptime", t: B("Lose less than 5% of mission time to problems", "لا تخسر أكثر من 5% من وقت المهمة بسبب المشاكل"), ok: (r) => r.telemetry && r.telemetry.uptime >= 95 },
    { id: "calls", t: B("Make every in-flight decision correctly", "اتخذ كل قرارات الطيران بشكل صحيح"), ok: (r) => r.flightCalls.total > 0 && r.flightCalls.good === r.flightCalls.total },
    { id: "sharp", t: B("Solve the case with no mistakes (or pass every Nile test)", "احلّ القضية دون أي خطأ (أو اجتز كل اختبارات النيل)"), ok: (r, c, D, M) => M.open ? ["ditl", "gstest", "vib", "tvac"].every(t => (D.picks.tests || []).includes(t)) : D.diag.wrong === 0 },
    { id: "science", t: B("Score at least 80 in science", "احصل على 80 على الأقل في العلم"), ok: (r) => r.sci >= 80 }
  ]
};

const TAGNAME = {
  atm: B("atmosphere layers", "طبقات الغلاف الجوي"), dust: B("dust storms", "العواصف الترابية"), weather: B("daily weather", "الطقس اليومي"), relay: B("lander relay", "التواصل مع المسبار"),
  surface: B("surface close-ups", "صور مقرّبة للسطح"), co2: B("CO₂", "ثاني أكسيد الكربون"), fluor: B("plant glow", "توهج النبات"), clouds: B("clouds", "السحب"),
  planets: B("planets", "الكواكب"), stars: B("star vibrations", "اهتزاز النجوم"), transients: B("sudden events", "الأحداث المفاجئة"),
  veg: B("crops", "المحاصيل"), water: B("water", "المياه"), thermal: B("heat", "الحرارة")
};

const VERIFY = { Test: B("Test", "اختبار"), Analysis: B("Analysis", "تحليل"), Inspection: B("Inspection", "فحص"), Demonstration: B("Demonstration", "عرض عملي") };

/* reusable tests */
const T_TVAC = (cost, mo) => ({ id: "tvac", ic: "tvac", n: B("Space-chamber test", "اختبار غرفة الفضاء"), cost, mo, d: B("Freeze and bake it in a vacuum chamber, like space will.", "نجمّدها ونسخنها في غرفة مفرغة من الهواء مثل الفضاء.") });
const T_VIB = (cost, mo) => ({ id: "vib", ic: "vib", n: B("Shake test", "اختبار الاهتزاز"), cost, mo, d: B("Shake it like the rocket will. Finds loose bolts.", "نهزّها كما سيهزّها الصاروخ لنكتشف المسامير المفكوكة.") });
const T_FAULT = (cost, mo) => ({ id: "fault", ic: "fault", n: B("Robot-brain stress test", "اختبار ضغط العقل الإلكتروني"), cost, mo, d: B("Throw failures at the software. Does it fix itself?", "نرمي أعطالًا على البرنامج: هل يصلح نفسه؟") });
const CPU_OPTS = (m1, m2) => [
  { id: "cpu1", ic: "chip", n: B("One flight computer", "حاسوب طيران واحد"), m: m1, p: 15, cost: 4, d: B("Light and proven. If it crashes, it waits for Earth.", "خفيف ومجرّب. إذا تعطّل ينتظر المساعدة من الأرض.") },
  { id: "cpu2", ic: "chip2", n: B("Two computers (backup)", "حاسوبان (مع احتياطي)"), m: m2, p: 22, cost: 8, flags: { robust: true }, d: B("A backup takes over by itself after a fault.", "الاحتياطي يتولى القيادة وحده عند حدوث عطل.") }
];

const MISSIONS = [
/* ------------------------------ 1. MCO -------------------------------- */
{
  id: "mco", no: 1, title: B("Mars Climate Orbiter", "مسبار مناخ المريخ"), years: "1998–1999", stamp: B("LOST 1999", "فُقد 1999"),
  scene: "mars", craft: "orbiter", badge: { name: B("Unit Detective", "محقق الوحدات"), color: "#FF6FA5", glyph: "📏" },
  teaser: B("It flew 670 million km to Mars… and vanished in minutes.", "طار 670 مليون كيلومتر إلى المريخ… ثم اختفى في دقائق."),
  env: { budget: 160, deadline: 30, base: 24, eclipseH: 0.7, dod: 0.4, solar: 0.43, days: 650, money: 0, mass: 0, refSci: 88 },
  critical: ["budget", "schedule"],
  criticalWhy: B("Mars launch windows open only every 26 months. Late means waiting two years.", "نافذة الإطلاق إلى المريخ تُفتح كل 26 شهرًا فقط. التأخير يعني الانتظار سنتين."),
  fixed: { m: 200, p: 80, cost: 35 },
  story: {
    crash: [
      B("September 1999. After nine months in space, the orbiter reaches Mars.", "سبتمبر 1999. بعد تسعة أشهر في الفضاء، يصل المسبار إلى المريخ."),
      B("It fires its engine and slips behind the planet…", "يشغّل محركه ويختفي خلف الكوكب…"),
      B("…and never comes back. Signal lost!", "…ولم يعد أبدًا. انقطعت الإشارة!")
    ],
    clues: [
      { ic: "cal", t: B("Tracking report", "تقرير التتبع"), body: B("Planned closest approach: 226 km.\nLast measurement: 110 km.\nLater estimate: 57 km.\nLowest safe height: 80 km.", "أقرب نقطة مخططة: 226 كم.\nآخر قياس: 110 كم.\nتقدير لاحق: 57 كم.\nأقل ارتفاع آمن: 80 كم."),
        orbi: B("57 is way below 80! It flew much too low. But why?", "57 أقل بكثير من 80! طار منخفضًا جدًا. لكن لماذا؟"), expr: "shocked" },
      { ic: "email", t: B("E-mail from a navigator", "رسالة من أحد الملاحين"), body: B("“Every update puts our closest approach a bit lower. Something in the thruster data looks strange. Can someone check?”", "«كل تحديث يجعل أقرب نقطة أكثر انخفاضًا. هناك شيء غريب في بيانات الدافعات. هل يمكن لأحد أن يتحقق؟»"),
        orbi: B("Someone noticed! Did anyone listen? Hmm…", "أحدهم لاحظ المشكلة! هل استمع إليه أحد؟ همم…"), expr: "think" },
      { ic: "iface", t: B("Thruster data file", "ملف بيانات الدافعات"), body: B("From the spacecraft team’s software:\nimpulse = 1.00 lbf·s\n(pound-force seconds)", "من برنامج فريق المركبة:\nimpulse = 1.00 lbf·s\n(رطل-قوة × ثانية)"),
        orbi: B("lbf… that’s an imperial unit, like pounds and feet.", "lbf… هذه وحدة إمبراطورية مثل الرطل والقدم."), expr: "think" },
      { ic: "clipboard", t: B("The teams’ rulebook", "دليل الاتفاق بين الفريقين"), body: B("“All thruster values SHALL be in N·s (newton-seconds).”\n1 pound-force = 4.45 newtons.", "«يجب أن تكون كل قيم الدافعات بوحدة N·s (نيوتن × ثانية).»\n1 رطل-قوة = 4.45 نيوتن."),
        orbi: B("The rulebook says newtons! Do you see the problem?", "الدليل يقول نيوتن! هل ترى المشكلة؟"), expr: "shocked" },
      { ic: "wing1", t: B("Spacecraft photo", "صورة المركبة"), body: B("Only ONE solar wing, on one side.", "جناح شمسي واحد فقط، على جانب واحد."),
        orbi: B("One wing means sunlight pushes it unevenly, so it fires small thrusters a lot.", "جناح واحد يعني أن ضوء الشمس يدفعها بشكل غير متوازن، فتشغّل دافعات صغيرة كثيرًا."), expr: "normal" }
    ],
    diagnose: [
      { q: B("What sent the orbiter too low?", "ما الذي جعل المسبار ينخفض أكثر من اللازم؟"), correct: 1, opts: [
        { t: B("A dust storm pulled it down", "عاصفة ترابية سحبته للأسفل"), no: B("Dust storms don’t reach up to orbit. Look at the data file and the rulebook again.", "العواصف الترابية لا تصل إلى المدار. انظر إلى ملف البيانات والدليل مرة أخرى.") },
        { t: B("Two teams used different units: pounds vs newtons", "فريقان استخدما وحدتين مختلفتين: رطل ونيوتن") },
        { t: B("The main engine exploded", "المحرك الرئيسي انفجر"), no: B("The engine worked fine. The problem was in the numbers, not the hardware.", "المحرك عمل جيدًا. المشكلة كانت في الأرقام، وليست في الأجهزة.") },
        { t: B("The solar wing broke off", "الجناح الشمسي انكسر"), no: B("The wing stayed on. But it did make the error grow. What error?", "الجناح بقي مكانه، لكنه جعل الخطأ يكبر. أي خطأ؟") } ],
        yes: B("Exactly! One team wrote pounds, the other read newtons. Every push was counted 4.45 times too small.", "بالضبط! فريق كتب بالرطل والآخر قرأ بالنيوتن. كل دفعة حُسبت أصغر بـ 4.45 مرة.") },
      { q: B("Why didn’t anyone catch it in time?", "لماذا لم يكتشفه أحد في الوقت المناسب؟"), correct: 0, opts: [
        { t: B("Nobody tested the data passing between teams, and worries stayed in e-mails", "لم يختبر أحد البيانات المتبادلة بين الفريقين، وبقيت المخاوف في الرسائل") },
        { t: B("The spacecraft had no computer", "المركبة لم يكن لها حاسوب"), no: B("It had one. The mistake was on the ground.", "كان لها حاسوب. الخطأ كان على الأرض.") },
        { t: B("Mars was too far for radio", "المريخ بعيد جدًا عن الراديو"), no: B("Radio worked all the way. The navigator’s e-mail proves they saw something.", "الراديو عمل طوال الرحلة. رسالة الملاح تثبت أنهم لاحظوا شيئًا.") } ],
        yes: B("Right. A cheap test and a formal way to raise worries would have saved it. Now let’s fly it again, better!", "صحيح. اختبار رخيص وطريقة رسمية لرفع المخاوف كانت ستنقذه. هيا نطيّره من جديد، بشكل أفضل!") }
    ]
  },
  hints: {
    objective: B("Start with the question. Which instrument looks at the air layer by layer?", "ابدأ بالسؤال. أي جهاز ينظر إلى الهواء طبقة بعد طبقة؟"),
    build: B("Remember the photo clue: one wing means lots of thruster firings. Two balanced wings give a mistake less to grow.", "تذكّر دليل الصورة: جناح واحد يعني دفعات كثيرة. جناحان متوازنان يجعلان أي خطأ يكبر أقل."),
    launch: B("The orbiter survives no lower than 80 km. How much safety margin will you keep at Mars?", "المسبار لا ينجو تحت 80 كم. كم هامش أمان ستترك عند المريخ؟"),
    tests: B("The data file and the rulebook didn’t match. Which test compares the teams’ data?", "ملف البيانات والدليل لم يتطابقا. أي اختبار يقارن بيانات الفريقين؟")
  },
  goals: {
    primary: [
      { id: "atm", n: B("Map the Martian air, layer by layer", "رسم خريطة لهواء المريخ طبقة بطبقة"), d: B("Temperature, dust and water vapour at many heights.", "الحرارة والغبار وبخار الماء على ارتفاعات كثيرة."), tags: ["atm"],
        req: [{ t: B("Measure temperature, dust and water-vapour profiles", "قياس الحرارة والغبار وبخار الماء على ارتفاعات مختلفة"), v: "Test" }] },
      { id: "dust", n: B("Track dust storms and ice clouds", "تتبع العواصف الترابية والسحب الجليدية"), d: B("See the whole planet every day.", "رؤية الكوكب كله كل يوم."), tags: ["dust"],
        req: [{ t: B("Image the whole planet once per day", "تصوير الكوكب كاملًا مرة يوميًا"), v: "Analysis" }] }
    ],
    secondary: [
      { id: "relay", n: B("Talk for the Mars Polar Lander", "التواصل نيابة عن مسبار القطب المريخي"), d: B("The lander arrives in Dec 1999 and needs a relay.", "المسبار يصل في ديسمبر 1999 ويحتاج من ينقل رسائله."), tags: ["relay"],
        req: [{ t: B("Provide a UHF relay link for the lander", "توفير رابط راديو UHF للمسبار"), v: "Demonstration" }] },
      { id: "weather", n: B("Daily weather pictures", "صور يومية للطقس"), d: B("A weather satellite for Mars.", "قمر طقس للمريخ."), tags: ["weather"],
        req: [{ t: B("Return a colour picture of Mars every day", "إرسال صورة ملونة للمريخ كل يوم"), v: "Analysis" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Science instruments", "الأجهزة العلمية"), short: B("Instrument", "جهاز"), tab: "🔭",
      opts: [
        { id: "pmirr", ic: "radiometer", n: B("Air-layer radiometer", "مقياس طبقات الهواء"), m: 44, p: 40, cost: 22, data: 0.6, sci: 40, tags: ["atm", "dust"], hist: true, d: B("Looks at the air layer by layer.", "ينظر إلى الهواء طبقة بعد طبقة.") },
        { id: "marci", ic: "camera", n: B("Mars Color Imager", "كاميرا المريخ الملونة"), m: 2, p: 10, cost: 8, data: 1.2, sci: 25, tags: ["dust", "weather"], hist: true, d: B("Colour cameras for daily weather maps.", "كاميرات ملونة لخرائط الطقس اليومية.") },
        { id: "uhf", ic: "radio", n: B("UHF relay radio", "راديو تواصل UHF"), m: 6, p: 15, cost: 5, data: 0, sci: 20, tags: ["relay"], hist: true, d: B("Lets landers send data home through you.", "يسمح للمسابير بإرسال بياناتها عبرك.") },
        { id: "hrc", ic: "bigcam", n: B("Super-zoom surface camera", "كاميرا تكبير فائقة للسطح"), m: 60, p: 60, cost: 35, data: 4, sci: 45, tags: ["surface"], d: B("Amazing close-ups. Only useful if your question needs them!", "صور مقربة رائعة، مفيدة فقط إن احتاجها سؤالك!") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Solar power", "الطاقة الشمسية"), short: B("Solar", "طاقة"), tab: "☀️",
      hint: B("At Mars the Sun gives only 43% of the power it gives at Earth.", "عند المريخ تعطي الشمس 43% فقط من طاقتها عند الأرض."),
      opts: [
        { id: "wing1", ic: "wing1", n: B("One solar wing", "جناح شمسي واحد"), m: 32, gen: 1000, cost: 7, hist: true, flags: { wings: 1 }, d: B("Light and cheap, but unbalanced: needs many thruster firings.", "خفيف ورخيص، لكنه غير متوازن ويحتاج دفعات كثيرة.") },
        { id: "wing2", ic: "wing2", n: B("Two balanced wings", "جناحان متوازنان"), m: 48, gen: 1250, cost: 13, flags: { wings: 2 }, d: B("Heavier, but balanced: far fewer thruster firings.", "أثقل، لكنه متوازن ويحتاج دفعات أقل بكثير.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      hint: B("Powers the spacecraft in Mars’ shadow on every orbit.", "تشغّل المركبة في ظل المريخ في كل دورة."),
      opts: [
        { id: "b450", ic: "battery", icp: 2, n: B("Battery, 450 Wh", "بطارية 450 واط·ساعة"), m: 14, wh: 450, cost: 3, d: B("Enough for a light payload.", "تكفي لحمولة خفيفة.") },
        { id: "b900", ic: "battery", icp: 4, n: B("Battery, 900 Wh", "بطارية 900 واط·ساعة"), m: 24, wh: 900, cost: 5, d: B("Room for power-hungry instruments.", "تكفي لأجهزة تستهلك طاقة كبيرة.") }
      ] },
    { id: "cpu", kind: "cpu", phase: "craft", role: "eng", label: B("Robot brain", "العقل الإلكتروني"), short: B("Brain", "عقل"), tab: "🧠", opts: CPU_OPTS(6, 11) },
    { id: "prop", kind: "prop", phase: "craft", role: "eng", label: B("Engine & fuel", "المحرك والوقود"), short: B("Engine", "محرك"), tab: "🔥",
      opts: [
        { id: "prop1", ic: "tank", n: B("Engine + exact fuel", "محرك + وقود بالضبط"), m: 300, cost: 6, hist: true, d: B("Exactly what the plan needs.", "بالضبط ما تحتاجه الخطة.") },
        { id: "prop2", ic: "tank", icp: true, n: B("Engine + 40 kg spare fuel", "محرك + 40 كغ وقود احتياطي"), m: 340, cost: 7, flags: { reserve: true }, d: B("Extra fuel for surprise correction burns.", "وقود إضافي لتصحيحات غير متوقعة.") }
      ] },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio dish", "طبق الاتصال"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "hga13", ic: "dish", icp: 1, n: B("Radio dish, 1.3 m", "طبق راديو 1.3 م"), m: 12, p: 30, cost: 6, rate: 2.0, d: B("Standard for this size.", "مناسب لهذا الحجم.") },
        { id: "hga2", ic: "dish", icp: 2, n: B("Big radio dish, 2 m", "طبق راديو كبير 2 م"), m: 20, p: 35, cost: 10, rate: 4.0, d: B("Twice the data, more mass.", "ضعف البيانات، ووزن أكبر.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Arrival height at Mars", "ارتفاع الوصول عند المريخ"), short: B("Orbit", "مدار"),
      hint: B("Below about 80 km, the air of Mars destroys the orbiter.", "تحت 80 كم تقريبًا، يدمّر هواء المريخ المسبار."),
      opts: [
        { id: "moi226", ic: "moi226", n: B("Aim for 226 km", "استهدف 226 كم"), alt: 226, cost: 0, hist: true, d: B("The 1999 plan: fastest and uses least fuel.", "خطة 1999: الأسرع والأقل وقودًا.") },
        { id: "moi300", ic: "moi300", n: B("Aim for 300 km", "استهدف 300 كم"), alt: 300, cost: 2, life: 0.97, d: B("Extra safety. A few weeks slower.", "أمان إضافي. أبطأ ببضعة أسابيع.") },
        { id: "moi400", ic: "moi400", n: B("Aim for 400 km", "استهدف 400 كم"), alt: 400, cost: 4, life: 0.92, d: B("Very safe, but costs fuel and time later.", "آمن جدًا، لكنه يكلف وقودًا ووقتًا لاحقًا.") }
      ] },
    { id: "tracking", kind: "ops", phase: "launch", role: "nav", label: B("Tracking on the way", "التتبع أثناء الرحلة"),
      opts: [
        { id: "trk1", ic: "dishone", n: B("Normal tracking", "تتبع عادي"), cost: 0, hist: true, d: B("The usual antenna time.", "وقت الهوائيات المعتاد.") },
        { id: "trk2", ic: "dishtwo", n: B("Extra tracking + second checker", "تتبع إضافي + فريق مراجعة ثانٍ"), cost: 6, dataM: 1.25, flags: { enhanced: true }, d: B("More antenna time and a second team double-checking.", "وقت هوائيات أكثر وفريق ثانٍ يراجع المسار.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Rocket", "الصاروخ"),
      opts: [
        { id: "d7425", ic: "delta", n: B("Delta II 7425", "دلتا 2 (7425)"), cap: 660, cost: 50, hist: true, d: B("The real MCO rocket.", "الصاروخ الحقيقي للمسبار.") },
        { id: "d7925", ic: "delta9", n: B("Delta II 7925", "دلتا 2 (7925)"), cap: 1000, cost: 62, d: B("Nine boosters instead of four.", "تسعة معززات بدل أربعة.") },
        { id: "atlas", ic: "atlas", n: B("Atlas IIAS", "أطلس 2AS"), cap: 1400, cost: 90, d: B("Huge, and expensive.", "ضخم ومكلف.") }
      ] },
    { id: "process", kind: "ops", phase: "verify", role: "pm", label: B("When someone is worried…", "عندما يقلق أحد الفريق…"),
      opts: [
        { id: "informal", ic: "email", n: B("They send an e-mail", "يرسل رسالة بريد"), cost: 0, hist: true, d: B("Free and fast. Nobody has to follow up.", "مجاني وسريع، ولا أحد مُلزَم بالمتابعة.") },
        { id: "formal", ic: "clipboard", n: B("Formal report + team review", "تقرير رسمي + مراجعة الفريق"), cost: 2, mo: 0.5, flags: { formal: true }, d: B("Every worry gets an owner and a meeting.", "كل قلق له مسؤول واجتماع.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      hint: B("Each test costs money and months. You can’t afford them all.", "كل اختبار يكلف مالًا وشهورًا. لا يمكنك تحمّلها كلها."),
      opts: [
        T_TVAC(4, 1.5), T_VIB(3, 1),
        { id: "iface", ic: "iface", n: B("Team-to-team data test", "اختبار البيانات بين الفرق"), cost: 2, mo: 1, d: B("Run every team’s real files through navigation. Do the units match?", "تمرير ملفات كل فريق في برنامج الملاحة. هل الوحدات متطابقة؟") },
        { id: "cal", ic: "cal", n: B("Instrument calibration", "معايرة الأجهزة"), cost: 3, mo: 1, d: B("Better-tuned instruments, better science.", "أجهزة معايرة أفضل = علم أفضل.") },
        T_FAULT(3, 1)
      ] }
  ],
  history: {
    rows: [
      [B("Team-to-team data test", "اختبار البيانات بين الفرق"), B("Not done: units mismatch missed", "لم يُجرَ: خطأ الوحدات لم يُكتشف"), "iface"],
      [B("Solar power", "الطاقة الشمسية"), B("One wing", "جناح واحد"), "power"],
      [B("Worries", "المخاوف"), B("E-mails, never escalated", "رسائل لم تُرفع للإدارة"), "process"],
      [B("Arrival height", "ارتفاع الوصول"), B("226 km", "226 كم"), "orbit"],
      [B("Rocket", "الصاروخ"), B("Delta II 7425", "دلتا 2 (7425)"), "launcher"]
    ],
    story: B("On 23 September 1999 the orbiter fired its engine to enter Mars orbit and never came back. Ground software wrote thruster pushes in pound-force seconds; navigation expected newton-seconds, as the rules said. With one solar wing the small pushes happened often, so the error grew. Aimed at 226 km, it reached about 57 km. It could survive no lower than about 80 km.",
      "في 23 سبتمبر 1999 شغّل المسبار محركه ليدخل مدار المريخ ولم يعد أبدًا. برنامج أرضي كتب دفعات المحركات بالرطل-قوة، بينما توقّع برنامج الملاحة النيوتن كما تنص القواعد. ومع جناح شمسي واحد تكررت الدفعات الصغيرة فكبر الخطأ. كان الهدف 226 كم فوصل إلى نحو 57 كم، بينما لا يتحمل أقل من 80 كم تقريبًا."),
    lesson: B("Test every connection between teams, and give every worry a formal path.", "اختبر كل اتصال بين الفرق، واجعل لكل قلق طريقًا رسميًا."),
    source: B("Mars Climate Orbiter Mishap Investigation Board, Phase I Report (1999).", "تقرير مجلس التحقيق في حادثة مسبار مناخ المريخ، المرحلة الأولى (1999).")
  }
},

/* ------------------------------ 2. OCO -------------------------------- */
{
  id: "oco", no: 2, title: B("Orbiting Carbon Observatory", "مرصد الكربون المداري"), years: "2009", stamp: B("LOST 2009", "فُقد 2009"),
  scene: "earth", craft: "earthsat", badge: { name: B("Supply-Chain Sleuth", "كاشف الغش الخفي"), color: "#4FC3F7", glyph: "🔍" },
  teaser: B("A satellite to map carbon dioxide never reached space. The cause stayed hidden for ten years.", "قمر لرسم خريطة ثاني أكسيد الكربون لم يصل إلى الفضاء، وبقي السبب مخفيًا عشر سنوات."),
  env: { budget: 285, deadline: 36, base: 30, eclipseH: 0.6, dod: 0.35, solar: 1, days: 730, money: 0, mass: 0, refSci: 76 },
  critical: ["budget"],
  criticalWhy: B("A safer rocket or more tests come out of the same fixed budget.", "الصاروخ الأكثر أمانًا أو الاختبارات الإضافية تُدفع من نفس الميزانية الثابتة."),
  fixed: { m: 250, p: 150, cost: 70 },
  story: {
    crash: [
      B("February 2009. The rocket lifts off with the carbon satellite inside its nose cone.", "فبراير 2009. ينطلق الصاروخ وقمر الكربون داخل مقدمته."),
      B("Three minutes later, the nose cone should split open and fall away…", "بعد ثلاث دقائق يجب أن تنفتح المقدمة وتسقط…"),
      B("…it doesn’t. The rocket is too heavy and falls into the ocean.", "…لكنها لم تنفتح. أصبح الصاروخ ثقيلًا جدًا وسقط في المحيط.")
    ],
    clues: [
      { ic: "cal", t: B("Launch data", "بيانات الإطلاق"), body: B("T+178 s: command “open the nose cone” sent.\nNose cone open? NO.", "بعد 178 ثانية: أُرسل أمر «افتح المقدمة».\nهل انفتحت؟ لا."), orbi: B("The nose cone was supposed to pop open… and it didn’t!", "كان يجب أن تنفتح المقدمة… ولم تنفتح!"), expr: "shocked" },
      { ic: "tank", t: B("Rocket note", "ملاحظة عن الصاروخ"), body: B("With the nose cone still on, the rocket carries hundreds of extra kilograms. Orbit not reached.", "مع بقاء المقدمة، حمل الصاروخ مئات الكيلوغرامات الزائدة. لم يصل إلى المدار."), orbi: B("Too heavy to reach space. That’s why it fell.", "ثقيل جدًا ليصل إلى الفضاء، ولهذا سقط."), expr: "worried" },
      { ic: "clipboard", t: B("Supplier certificate", "شهادة المورّد"), body: B("Metal for the nose-cone joint:\nstrength test PASSED ✔", "معدن وصلة المقدمة:\nاختبار القوة: ناجح ✔"), orbi: B("PASSED… but are we sure?", "ناجح… لكن هل نحن متأكدون؟"), expr: "think" },
      { ic: "audit", t: B("NASA investigation, 2019", "تحقيق ناسا 2019"), body: B("The metal supplier changed failing test numbers into passing ones, for years.", "مورّد المعدن غيّر نتائج الاختبارات الفاشلة إلى ناجحة لسنوات."), orbi: B("Wow! The certificates were not true!", "واو! الشهادات لم تكن صادقة!"), expr: "shocked" },
      { ic: "email", t: B("Glory satellite, 2011", "قمر «جلوري» 2011"), body: B("Same rocket type. Same nose cone stuck. Lost again.", "نفس نوع الصاروخ. نفس المقدمة العالقة. فُقد مرة أخرى."), orbi: B("The same problem twice! The cause was hidden inside the parts.", "نفس المشكلة مرتين! السبب كان مخفيًا داخل القطع."), expr: "worried" }
    ],
    diagnose: [
      { q: B("What stopped the satellite from reaching space?", "ما الذي منع القمر من الوصول إلى الفضاء؟"), correct: 0, opts: [
        { t: B("The nose cone never opened, so the rocket was too heavy", "المقدمة لم تنفتح فأصبح الصاروخ ثقيلًا جدًا") },
        { t: B("The satellite’s solar panels didn’t unfold", "ألواح القمر الشمسية لم تنفتح"), no: B("The satellite never even got to space. Look at the launch data.", "القمر لم يصل للفضاء أصلًا. انظر إلى بيانات الإطلاق.") },
        { t: B("Bad weather at launch", "طقس سيئ وقت الإطلاق"), no: B("The weather was fine. Something mechanical failed.", "الطقس كان جيدًا. شيء ميكانيكي هو الذي تعطّل.") },
        { t: B("The satellite’s computer crashed", "حاسوب القمر تعطّل"), no: B("The satellite was still inside the rocket. The problem was the rocket.", "القمر كان داخل الصاروخ. المشكلة في الصاروخ.") } ],
        yes: B("Yes! The nose cone stayed on and the extra weight pulled the rocket down.", "نعم! بقيت المقدمة والوزن الزائد سحب الصاروخ للأسفل.") },
      { q: B("What was the hidden root cause?", "ما السبب الخفي الحقيقي؟"), correct: 1, opts: [
        { t: B("A typo in the launch software", "خطأ كتابي في برنامج الإطلاق"), no: B("Check the certificate and the 2019 investigation.", "انظر إلى الشهادة وإلى تحقيق 2019.") },
        { t: B("Weak metal parts with false test certificates", "قطع معدنية ضعيفة بشهادات اختبار غير صحيحة") },
        { t: B("Someone forgot to remove a cover", "أحدهم نسي إزالة غطاء"), no: B("Nothing was forgotten. Something was hidden.", "لم يُنسَ شيء، بل أُخفي شيء.") } ],
        yes: B("Exactly. Nobody re-tested the metal. Now it’s your rocket choice and your tests!", "بالضبط. لم يُعِد أحد اختبار المعدن. الآن اختيار الصاروخ والاختبارات بيدك!") }
    ]
  },
  hints: {
    objective: B("This mission is about carbon dioxide. Which question matters most to you?", "هذه المهمة عن ثاني أكسيد الكربون. أي سؤال يهمك أكثر؟"),
    build: B("The oxygen band helps measure air pressure and spot clouds. Precision is everything here.", "نطاق الأكسجين يساعد على قياس الضغط وكشف السحب. الدقة هي كل شيء هنا."),
    launch: B("One of these rockets has a story… If you keep it, how could you check its parts?", "أحد هذه الصواريخ له قصة… إذا اخترته، كيف ستتحقق من قطعه؟"),
    tests: B("Certificates can lie. Which test checks the metal again?", "الشهادات قد تكذب. أي اختبار يعيد فحص المعدن؟")
  },
  goals: {
    primary: [
      { id: "co2", n: B("Find where CO₂ comes from and goes", "اكتشاف من أين يأتي ثاني أكسيد الكربون وأين يذهب"), d: B("Sources like cities and fires, sinks like forests and oceans.", "مصادر مثل المدن والحرائق، ومصارف مثل الغابات والمحيطات."), tags: ["co2"],
        req: [{ t: B("Measure CO₂ below the satellite with very high precision", "قياس ثاني أكسيد الكربون تحت القمر بدقة عالية جدًا"), v: "Test" }] },
      { id: "season", n: B("Watch Earth ‘breathe’ through the seasons", "مشاهدة الأرض «تتنفس» عبر الفصول"), d: B("CO₂ falls in summer as plants grow, rises in winter.", "ينخفض في الصيف مع نمو النبات ويرتفع في الشتاء."), tags: ["co2"],
        req: [{ t: B("Revisit every region at least every 16 days", "زيارة كل منطقة كل 16 يومًا على الأقل"), v: "Analysis" }] }
    ],
    secondary: [
      { id: "atrain", n: B("Fly with the A-Train satellites", "الطيران مع أقمار «القطار A»"), d: B("Combine data with neighbour satellites minutes apart.", "دمج البيانات مع أقمار تطير بفارق دقائق."), check: x => x.pick("orbit") === "atrain",
        req: [{ t: B("Orbit at 705 km in the A-Train line", "مدار على ارتفاع 705 كم ضمن القطار A"), v: "Analysis" }] },
      { id: "fluor", n: B("See plants glow", "رؤية توهّج النباتات"), d: B("Plants give off a tiny red glow while they work.", "النباتات تصدر توهجًا أحمر خافتًا أثناء عملها."), tags: ["fluor"],
        req: [{ t: B("Observe the oxygen A-band near 760 nm", "رصد نطاق الأكسجين قرب 760 نانومتر"), v: "Test" }] },
      { id: "clouds", n: B("Spot clouds automatically", "كشف السحب تلقائيًا"), d: B("Clouds spoil CO₂ readings.", "السحب تفسد قراءات الكربون."), tags: ["clouds"],
        req: [{ t: B("Detect clouds in every measurement", "كشف السحب في كل قياس"), v: "Analysis" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Science instruments", "الأجهزة العلمية"), short: B("Instrument", "جهاز"), tab: "🔭",
      opts: [
        { id: "spec3", ic: "spectro", n: B("3-colour CO₂ spectrometer", "مطياف الكربون ثلاثي الألوان"), m: 140, p: 105, cost: 85, data: 8, sci: 60, tags: ["co2", "fluor", "clouds"], hist: true, d: B("Its oxygen band measures pressure and spots clouds: super precise.", "نطاق الأكسجين فيه يقيس الضغط ويكشف السحب: دقة عالية.") },
        { id: "spec2", ic: "spectro2", n: B("2-colour CO₂ spectrometer", "مطياف الكربون ثنائي الألوان"), m: 95, p: 70, cost: 55, data: 5, sci: 35, tags: ["co2"], d: B("Cheaper and lighter, less precise.", "أرخص وأخف، لكنه أقل دقة.") },
        { id: "ctx", ic: "camera", n: B("Cloud camera", "كاميرا السحب"), m: 12, p: 15, cost: 8, data: 2, sci: 12, tags: ["clouds"], d: B("Shows what the spectrometer looks through.", "تُظهر ما ينظر من خلاله المطياف.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Solar power", "الطاقة الشمسية"), short: B("Solar", "طاقة"), tab: "☀️",
      opts: [
        { id: "arr900", ic: "wing2", n: B("Solar wings, 900 W", "أجنحة شمسية 900 واط"), m: 30, gen: 900, cost: 8, flags: { wings: 2 }, d: B("Sized for the basic payload.", "مناسبة للحمولة الأساسية.") },
        { id: "arr1300", ic: "arraybig", n: B("Big solar wings, 1300 W", "أجنحة شمسية كبيرة 1300 واط"), m: 42, gen: 1300, cost: 12, flags: { wings: 2, big: true }, d: B("Margin for extras and ageing.", "هامش للإضافات وللتقادم.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      hint: B("Near Earth the satellite enters Earth’s shadow every 99 minutes.", "قرب الأرض يدخل القمر ظل الأرض كل 99 دقيقة."),
      opts: [
        { id: "b500", ic: "battery", icp: 2, n: B("Battery, 500 Wh", "بطارية 500 واط·ساعة"), m: 16, wh: 500, cost: 3, d: B("Light. Check the shadow need!", "خفيفة. تحقق من حاجة الظل!") },
        { id: "b900", ic: "battery", icp: 4, n: B("Battery, 900 Wh", "بطارية 900 واط·ساعة"), m: 26, wh: 900, cost: 5, d: B("Comfortable in every shadow.", "مريحة في كل ظل.") }
      ] },
    { id: "cpu", kind: "cpu", phase: "craft", role: "eng", label: B("Robot brain", "العقل الإلكتروني"), short: B("Brain", "عقل"), tab: "🧠", opts: CPU_OPTS(6, 10) },
    { id: "prop", kind: "prop", phase: "craft", role: "eng", label: B("Fuel", "الوقود"), short: B("Fuel", "وقود"), tab: "🔥",
      opts: [
        { id: "hyd45", ic: "tank", n: B("Fuel, 45 kg", "وقود 45 كغ"), m: 60, cost: 4, d: B("Enough for two years.", "يكفي لسنتين.") },
        { id: "hyd80", ic: "tank", icp: true, n: B("Fuel, 80 kg", "وقود 80 كغ"), m: 100, cost: 5, life: 1.15, d: B("Room for a longer mission.", "يكفي لمهمة أطول.") }
      ] },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio", "الراديو"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "sband", ic: "antenna", n: B("Simple radio (S-band)", "راديو بسيط (S)"), m: 5, p: 25, cost: 3, rate: 6, d: B("Cheap. Fine for small data.", "رخيص ويكفي لبيانات قليلة.") },
        { id: "xband", ic: "dish", icp: 0, n: B("Fast radio (X-band)", "راديو سريع (X)"), m: 9, p: 40, cost: 7, rate: 30, d: B("Much faster downloads.", "تنزيل أسرع بكثير.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Orbit", "المدار"),
      opts: [
        { id: "atrain", ic: "atrain", n: B("705 km, A-Train line", "705 كم مع القطار A"), cost: 0, hist: true, d: B("Same time of day every pass, next to other satellites.", "نفس التوقيت كل مرور، بجوار أقمار أخرى.") },
        { id: "sso600", ic: "sso600", n: B("600 km, pole to pole", "600 كم من قطب لقطب"), cost: 0, life: 0.9, d: B("Covers the globe on your own.", "تغطية الكرة الأرضية وحدك.") },
        { id: "iss400", ic: "iss400", n: B("400 km, tilted like the ISS", "400 كم مائل مثل محطة الفضاء"), cost: 0, life: 0.5, sciM: 0.75, d: B("Misses the far north and south.", "لا يغطي أقصى الشمال والجنوب.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Rocket", "الصاروخ"),
      opts: [
        { id: "taurus", ic: "taurus", n: B("Taurus XL", "توروس XL"), cap: 700, cost: 55, hist: true, orbits: ["atrain", "sso600"], flags: { taurus: true }, d: B("The 2009 choice. Affordable and the right size.", "اختيار 2009. سعره مناسب وحجمه مناسب.") },
        { id: "delta", ic: "delta", n: B("Delta II", "دلتا 2"), cap: 1100, cost: 80, orbits: ["atrain", "sso600", "iss400"], d: B("Very reliable. OCO-2 flew on one in 2014.", "موثوق جدًا. أُطلق عليه OCO-2 عام 2014.") },
        { id: "ride", ic: "ride", n: B("Shared ride on a big rocket", "رحلة مشتركة على صاروخ كبير"), cap: 600, cost: 30, mo: 6, orbits: ["sso600"], d: B("Cheap, but you wait and go where the main passenger goes.", "رخيص، لكنك تنتظر وتذهب حيث يذهب الراكب الرئيسي.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      hint: B("NASA can’t re-test every part. It trusts supplier certificates for many.", "ناسا لا تستطيع إعادة اختبار كل قطعة، وتثق بشهادات المورّدين لكثير منها."),
      opts: [
        T_TVAC(6, 1.5), T_VIB(5, 1),
        { id: "cal", ic: "cal", n: B("Spectrometer calibration", "معايرة المطياف"), cost: 5, mo: 1.5, d: B("Precision is the whole point.", "الدقة هي جوهر المهمة.") },
        T_FAULT(3, 1),
        { id: "audit", ic: "audit", n: B("Re-test the nose-cone metal", "إعادة اختبار معدن المقدمة"), cost: 5, mo: 2, d: B("Don’t just trust certificates: test the metal yourself.", "لا تكتفِ بالشهادات: اختبر المعدن بنفسك.") }
      ] }
  ],
  history: {
    rows: [
      [B("Rocket", "الصاروخ"), B("Taurus XL", "توروس XL"), "launcher"],
      [B("Nose-cone metal", "معدن المقدمة"), B("Trusted the certificates", "الثقة في الشهادات"), "audit"],
      [B("Orbit", "المدار"), B("705 km, A-Train", "705 كم مع القطار A"), "orbit"],
      [B("Instrument", "الجهاز"), B("3-colour spectrometer", "مطياف ثلاثي الألوان"), "instr"]
    ],
    story: B("On 24 February 2009 the Taurus XL lifted off. The nose cone (the fairing) did not separate, and with the extra weight the rocket could not reach orbit. The satellite fell into the ocean near Antarctica. The same failure destroyed the Glory satellite in 2011. In 2019 NASA found the root cause: the supplier of the fairing-joint aluminum had altered test results and falsified certificates. NASA rebuilt the mission: OCO-2 launched on 2 July 2014 on a Delta II and went on to map CO₂ from orbit.",
      "في 24 فبراير 2009 انطلق صاروخ توروس XL. لم تنفصل المقدمة (الغطاء الواقي)، وبسبب الوزن الزائد لم يصل الصاروخ إلى المدار، فسقط القمر في المحيط قرب القارة القطبية الجنوبية. ودمّر العطل نفسه قمر «جلوري» عام 2011. وفي 2019 اكتشفت ناسا السبب: مورّد ألومنيوم وصلة المقدمة غيّر نتائج الاختبارات وزوّر الشهادات. أعادت ناسا بناء المهمة، فانطلق OCO-2 في 2 يوليو 2014 على صاروخ دلتا 2 ورسم خرائط ثاني أكسيد الكربون من المدار."),
    lesson: B("A system is only as strong as the parts nobody re-tested.", "قوة النظام تساوي قوة القطع التي لم يُعِد أحد اختبارها."),
    source: B("NASA Launch Services Program, Taurus XL failure summaries (2019).", "برنامج خدمات الإطلاق في ناسا، ملخصات فشل توروس XL (2019).")
  }
},

/* ----------------------------- 3. Kepler ------------------------------ */
{
  id: "kepler", no: 3, title: B("Kepler Space Telescope", "تلسكوب كبلر الفضائي"), years: "2009–2018", stamp: B("SAVED 2013", "أُنقذ 2013"),
  scene: "helio", craft: "telescope", badge: { name: B("Sunlight Hacker", "عبقري ضوء الشمس"), color: "#FFC83D", glyph: "☀️" },
  teaser: B("The planet hunter lost the wheels it needed to point. Engineers used sunlight itself to save it.", "صائد الكواكب فقد العجلات التي يحتاجها ليوجّه نفسه، فاستخدم المهندسون ضوء الشمس لإنقاذه."),
  env: { budget: 620, deadline: 48, base: 40, eclipseH: 0, dod: 0.5, solar: 0.95, days: 3500, money: 0, mass: 0, refSci: 92 },
  critical: ["mass", "budget"],
  criticalWhy: B("The telescope almost fills the rocket. Every spare part has to fit.", "التلسكوب يكاد يملأ الصاروخ. كل قطعة احتياطية يجب أن تتسع."),
  fixed: { m: 430, p: 200, cost: 250 },
  story: {
    crash: [
      B("Kepler stares at 100,000 stars, hunting for planets. It needs to point perfectly still.", "كبلر يحدّق في 100,000 نجم بحثًا عن الكواكب، ويحتاج إلى ثبات تام."),
      B("2012: one spinning wheel that keeps it steady breaks. Three left…", "2012: تتعطل إحدى العجلات الدوّارة التي تثبّته. بقيت ثلاث…"),
      B("2013: a second wheel breaks. Kepler starts to drift. Is the mission over?", "2013: تتعطل عجلة ثانية ويبدأ كبلر بالانجراف. هل انتهت المهمة؟")
    ],
    clues: [
      { ic: "wheeltest", t: B("Wheel #2, July 2012", "العجلة رقم 2، يوليو 2012"), body: B("Friction rising… wheel stopped.", "الاحتكاك يرتفع… العجلة توقفت."), orbi: B("One wheel down. Kepler has four. Still okay.", "عجلة واحدة تعطلت. لدى كبلر أربع. ما زال الوضع جيدًا."), expr: "normal" },
      { ic: "clipboard", t: B("Pointing rule", "قاعدة التوجيه"), body: B("Kepler needs 3 working wheels to point in all three directions.", "يحتاج كبلر إلى 3 عجلات تعمل ليتوجّه في الاتجاهات الثلاثة."), orbi: B("So losing two would be a big problem…", "إذن فقدان اثنتين مشكلة كبيرة…"), expr: "worried" },
      { ic: "wheeltest", t: B("Wheel #4, May 2013", "العجلة رقم 4، مايو 2013"), body: B("Friction rising… wheel stopped.\nWheels left: 2.", "الاحتكاك يرتفع… العجلة توقفت.\nالعجلات المتبقية: 2."), orbi: B("Oh no. Only two left!", "يا للأسف، بقيت اثنتان فقط!"), expr: "shocked" },
      { ic: "array", t: B("Kepler’s solar panel", "اللوح الشمسي لكبلر"), body: B("A big panel faces the Sun. Sunlight pushes on it: gently, but always.", "لوح كبير يواجه الشمس. ضوء الشمس يدفعه بلطف، لكن دائمًا."), orbi: B("Sunlight pushes? Interesting… could that help us?", "ضوء الشمس يدفع؟ مثير… هل يمكن أن يساعدنا؟"), expr: "think" },
      { ic: "tank", t: B("Fuel gauge", "مؤشر الوقود"), body: B("A little fuel left for small thruster puffs.", "بقي قليل من الوقود لنفثات صغيرة."), orbi: B("Not much fuel. We must be clever.", "الوقود قليل. يجب أن نكون أذكياء."), expr: "normal" }
    ],
    diagnose: [
      { q: B("Why did Kepler lose its steady pointing?", "لماذا فقد كبلر ثباته؟"), correct: 2, opts: [
        { t: B("It ran out of electricity", "نفدت منه الكهرباء"), no: B("The solar panel still worked. Look at the wheel clues.", "اللوح الشمسي ما زال يعمل. انظر إلى أدلة العجلات.") },
        { t: B("A meteor hit it", "اصطدم به نيزك"), no: B("No impact was found. Something wore out inside.", "لم يُعثر على اصطدام. شيء ما تآكل بالداخل.") },
        { t: B("Two of its four spinning wheels broke", "تعطلت اثنتان من عجلاته الأربع") },
        { t: B("Earth blocked the view", "الأرض حجبت الرؤية"), no: B("Kepler was far from Earth. Check the pointing rule.", "كبلر كان بعيدًا عن الأرض. راجع قاعدة التوجيه.") } ],
        yes: B("Correct! With only two wheels, Kepler could not hold still.", "صحيح! بعجلتين فقط لم يستطع كبلر الثبات.") },
      { q: B("What free push could act like a third wheel?", "أي دفعة مجانية يمكن أن تعمل كعجلة ثالثة؟"), correct: 0, opts: [
        { t: B("Sunlight pushing on the solar panel", "ضوء الشمس الذي يدفع اللوح الشمسي") },
        { t: B("Earth’s magnet", "مغناطيس الأرض"), no: B("Kepler was too far from Earth for that.", "كبلر بعيد جدًا عن الأرض لذلك.") },
        { t: B("The Moon’s gravity", "جاذبية القمر"), no: B("Too weak and too far. Look at the panel clue.", "ضعيفة وبعيدة جدًا. انظر إلى دليل اللوح.") } ],
        yes: B("Genius! That’s exactly what engineers did. Now design Kepler so you’re ready for anything.", "عبقري! هذا بالضبط ما فعله المهندسون. الآن صمم كبلر لتكون مستعدًا لأي شيء.") }
    ]
  },
  hints: {
    objective: B("Kepler is a planet hunter. What do you most want to find?", "كبلر صائد كواكب. ما أكثر شيء تريد اكتشافه؟"),
    build: B("Kepler needs 3 wheels. Spares are safer but heavy, and this rocket is nearly full.", "كبلر يحتاج 3 عجلات. الاحتياطي أكثر أمانًا لكنه ثقيل، والصاروخ ممتلئ تقريبًا."),
    launch: B("Close to Earth, Earth blocks the stars every 90 minutes.", "قرب الأرض، تحجب الأرض النجوم كل 90 دقيقة."),
    tests: B("A long run of the wheels before launch can show rising friction.", "تشغيل العجلات طويلًا قبل الإطلاق قد يكشف ارتفاع الاحتكاك.")
  },
  goals: {
    primary: [
      { id: "earths", n: B("How common are Earth-size planets?", "ما مدى شيوع الكواكب بحجم الأرض؟"), d: B("Count small planets where water could be liquid.", "عدّ الكواكب الصغيرة التي قد يوجد فيها ماء سائل."), tags: ["planets"],
        req: [{ t: B("See a dip in starlight of about 1 part in 10,000", "رصد انخفاض في ضوء النجم بنحو جزء من 10,000"), v: "Test" }] },
      { id: "giants", n: B("Make a census of all kinds of planets", "إحصاء كل أنواع الكواكب"), d: B("The first big count of planet families.", "أول إحصاء كبير لعائلات الكواكب."), tags: ["planets"],
        req: [{ t: B("Watch at least 100,000 stars at once", "مراقبة 100,000 نجم على الأقل في وقت واحد"), v: "Analysis" }] }
    ],
    secondary: [
      { id: "stars", n: B("Listen to stars vibrate", "الاستماع لاهتزاز النجوم"), d: B("Tiny ripples reveal a star’s size and age.", "تموجات صغيرة تكشف حجم النجم وعمره."), tags: ["stars"],
        req: [{ t: B("Measure bright stars every minute", "قياس النجوم اللامعة كل دقيقة"), v: "Test" }] },
      { id: "trans", n: B("Catch exploding stars", "رصد النجوم المنفجرة"), d: B("Supernovae caught as they happen.", "المستعرات العظمى لحظة حدوثها."), tags: ["transients"],
        req: [{ t: B("Fast readout of chosen targets", "قراءة سريعة لأهداف مختارة"), v: "Demonstration" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Camera & electronics", "الكاميرا والإلكترونيات"), short: B("Camera", "كاميرا"), tab: "🔭",
      opts: [
        { id: "fp42", ic: "ccd", n: B("Giant 95-megapixel camera", "كاميرا عملاقة 95 ميغابكسل"), m: 470, p: 250, cost: 180, data: 2, sci: 70, tags: ["planets", "stars"], hist: true, d: B("42 sensors. A huge view of the sky.", "42 مستشعرًا. رؤية ضخمة للسماء.") },
        { id: "fp21", ic: "ccdhalf", n: B("Half-size camera", "كاميرا بنصف الحجم"), m: 330, p: 150, cost: 110, data: 1, sci: 40, tags: ["planets", "stars"], d: B("Lighter, cheaper, half the stars.", "أخف وأرخص ونصف عدد النجوم.") },
        { id: "fast", ic: "stopwatch", n: B("1-minute fast mode", "وضع السرعة كل دقيقة"), m: 5, p: 10, cost: 6, data: 0.6, sci: 14, tags: ["stars", "transients"], d: B("Read a few targets every minute.", "قراءة بعض الأهداف كل دقيقة.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Solar power", "الطاقة الشمسية"), short: B("Solar", "طاقة"), tab: "☀️",
      opts: [
        { id: "arr1100", ic: "array", n: B("Solar panel, 1100 W", "لوح شمسي 1100 واط"), m: 60, gen: 1100, cost: 15, hist: true, flags: { wings: 1 }, d: B("Fixed on the sunny side.", "مثبت على الجانب المشمس.") },
        { id: "arr1400", ic: "arraybig", n: B("Big solar panel, 1400 W", "لوح شمسي كبير 1400 واط"), m: 75, gen: 1400, cost: 20, flags: { wings: 1, big: true }, d: B("More margin, more mass.", "هامش أكبر ووزن أكبر.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      hint: B("No shadows in this orbit! The battery is only for launch and emergencies.", "لا ظلال في هذا المدار! البطارية للإطلاق والطوارئ فقط."),
      opts: [
        { id: "b400", ic: "battery", icp: 2, n: B("Battery, 400 Wh", "بطارية 400 واط·ساعة"), m: 12, wh: 400, cost: 3, d: B("Light.", "خفيفة.") },
        { id: "b800", ic: "battery", icp: 4, n: B("Battery, 800 Wh", "بطارية 800 واط·ساعة"), m: 20, wh: 800, cost: 5, d: B("Extra safety.", "أمان إضافي.") }
      ] },
    { id: "adcs", kind: "adcs", phase: "craft", role: "eng", label: B("Steady wheels", "عجلات التثبيت"), short: B("Wheels", "عجلات"), tab: "🎡",
      hint: B("Kepler needs 3 working wheels to point precisely.", "كبلر يحتاج 3 عجلات تعمل ليتوجّه بدقة."),
      opts: [
        { id: "rw4", ic: "wheels", icp: 4, n: B("4 wheels", "4 عجلات"), m: 40, p: 60, cost: 12, hist: true, flags: { wheels: 4 }, d: B("One spare. Lose two and pointing is over.", "واحدة احتياطية. فقدان اثنتين ينهي التوجيه.") },
        { id: "rw4b", ic: "wheelsplus", n: B("4 super wheels", "4 عجلات محسّنة"), m: 40, p: 60, cost: 30, flags: { wheels: 4, bearings: true }, d: B("Upgraded bearings: much less wear. Pricey.", "محامل محسّنة تتآكل أقل بكثير. مكلفة.") },
        { id: "rw6", ic: "wheels", icp: 6, n: B("6 wheels", "6 عجلات"), m: 65, p: 75, cost: 28, flags: { wheels: 6 }, d: B("Three spares. Heavy!", "ثلاث احتياطية. ثقيلة!") }
      ] },
    { id: "cpu", kind: "cpu", phase: "craft", role: "eng", label: B("Robot brain", "العقل الإلكتروني"), short: B("Brain", "عقل"), tab: "🧠", opts: CPU_OPTS(6, 10) },
    { id: "prop", kind: "prop", phase: "craft", role: "eng", label: B("Thruster fuel", "وقود الدافعات"), short: B("Fuel", "وقود"), tab: "🔥",
      opts: [
        { id: "fuel1", ic: "tank", n: B("Normal fuel", "وقود عادي"), m: 14, cost: 2, hist: true, d: B("Enough for the planned mission.", "يكفي للمهمة المخططة.") },
        { id: "fuel2", ic: "tank", icp: true, n: B("Extra fuel", "وقود إضافي"), m: 24, cost: 3, flags: { extraFuel: true }, d: B("Fuel is what ends most long missions.", "الوقود هو ما يُنهي معظم المهام الطويلة.") }
      ] },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio dish", "طبق الاتصال"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "ka", ic: "dish", icp: 1, n: B("Fast dish (Ka-band)", "طبق سريع (Ka)"), m: 15, p: 60, cost: 10, rate: 4, hist: true, d: B("Sends a month of data at once.", "يرسل بيانات شهر دفعة واحدة.") },
        { id: "xo", ic: "antenna", n: B("Slow radio (X-band)", "راديو بطيء (X)"), m: 10, p: 45, cost: 6, rate: 1.5, d: B("Cheaper, slower.", "أرخص وأبطأ.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Orbit", "المدار"),
      opts: [
        { id: "trail", ic: "trail", n: B("Following Earth around the Sun", "يتبع الأرض حول الشمس"), cost: 0, hist: true, d: B("Calm, stable, nothing blocks the view.", "هادئ ومستقر ولا شيء يحجب الرؤية.") },
        { id: "l2", ic: "l2", n: B("Sun–Earth L2 point", "نقطة L2 بين الشمس والأرض"), cost: 25, life: 0.95, d: B("Cold and stable, but uses fuel to stay.", "بارد ومستقر، لكنه يستهلك وقودًا للبقاء.") },
        { id: "leo", ic: "leo", n: B("Close to Earth", "قريب من الأرض"), cost: 0, life: 0.6, sciM: 0.35, d: B("Easy to reach, but Earth blocks the stars every 90 minutes.", "سهل الوصول، لكن الأرض تحجب النجوم كل 90 دقيقة.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Rocket", "الصاروخ"),
      opts: [
        { id: "d7925h", ic: "delta9", n: B("Delta II 7925-10L", "دلتا 2 (7925)"), cap: 1100, cost: 90, hist: true, d: B("Kepler’s real rocket.", "صاروخ كبلر الحقيقي.") },
        { id: "atlas401", ic: "atlas", n: B("Atlas V", "أطلس 5"), cap: 4000, cost: 140, d: B("Room for anything. Expensive.", "يتسع لأي شيء. مكلف.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      opts: [
        T_TVAC(8, 1.5), T_VIB(6, 1),
        { id: "cal", ic: "cal", n: B("Camera calibration", "معايرة الكاميرا"), cost: 8, mo: 1.5, d: B("Know your own noise before hunting tiny dips.", "اعرف ضجيج جهازك قبل البحث عن انخفاضات صغيرة.") },
        T_FAULT(4, 1),
        { id: "wheel", ic: "wheeltest", n: B("Long wheel test", "اختبار العجلات الطويل"), cost: 8, mo: 3, d: B("Spin spare wheels for months to spot wear early.", "تدوير عجلات احتياطية لشهور لكشف التآكل مبكرًا.") }
      ] }
  ],
  history: {
    rows: [
      [B("Steady wheels", "عجلات التثبيت"), B("4 (needs 3)", "4 (يحتاج 3)"), "adcs"],
      [B("Orbit", "المدار"), B("Following Earth around the Sun", "يتبع الأرض حول الشمس"), "orbit"],
      [B("Rocket", "الصاروخ"), B("Delta II 7925-10L", "دلتا 2 (7925)"), "launcher"],
      [B("Camera", "الكاميرا"), B("95 megapixels", "95 ميغابكسل"), "instr"],
      [B("After two wheels broke", "بعد تعطل عجلتين"), B("K2: balance on sunlight", "K2: التوازن على ضوء الشمس"), "k2"]
    ],
    story: B("Kepler launched in March 2009 and watched one patch of stars in Cygnus and Lyra. One reaction wheel failed in July 2012; a second failed in May 2013, and precise pointing was over. Engineers turned the telescope so sunlight pressure on its solar panel balanced it like a pencil on a fingertip, with small thruster puffs doing the rest. The new mission, K2, explored new fields along the ecliptic until the fuel ran out in 2018. Kepler and K2 found more than 2,600 confirmed planets.",
      "انطلق كبلر في مارس 2009 وراقب منطقة واحدة من النجوم في كوكبتي الدجاجة والقيثارة. تعطلت عجلة في يوليو 2012، ثم عجلة ثانية في مايو 2013 فانتهى التوجيه الدقيق. أدار المهندسون التلسكوب بحيث يوازنه ضغط ضوء الشمس على لوحه الشمسي كقلم على طرف إصبع، مع نفثات صغيرة من الدافعات. واستكشفت المهمة الجديدة K2 مناطق جديدة على طول مسار الشمس حتى نفد الوقود عام 2018. اكتشف كبلر وK2 معًا أكثر من 2,600 كوكب مؤكد."),
    lesson: B("When hardware breaks, the team’s creativity is the last spare part.", "عندما تتعطل الأجهزة، يصبح إبداع الفريق آخر قطعة غيار."),
    source: B("NASA exoplanets.nasa.gov/k2; Howell et al. 2014.", "ناسا exoplanets.nasa.gov/k2؛ هاول وآخرون 2014.")
  }
},

/* --------------------------- 4. Nile Watch ---------------------------- */
{
  id: "nile", no: 4, title: B("Nile Watch", "عين على النيل"), years: B("Your mission", "مهمتك"), stamp: B("OPEN", "مفتوحة"), open: true,
  scene: "cubesat", craft: "cubesat", badge: { name: B("Nile Guardian", "حارس النيل"), color: "#3DDBA4", glyph: "🛰️" },
  teaser: B("No history this time. Build a tiny satellite that helps Egypt watch its river, farms, heat or dust.", "بلا تاريخ هذه المرة. ابنِ قمرًا صغيرًا يساعد مصر على مراقبة نهرها أو حقولها أو حرارتها أو غبارها."),
  env: { budget: 1.8, deadline: 18, base: 12, eclipseH: 0.6, dod: 0.3, solar: 1, days: 1800, money: 2, mass: 1, refSci: 78 },
  critical: ["volume", "power", "data"],
  criticalWhy: B("Everything must fit in a few 10 cm cubes, run on a few watts, and squeeze its data through short passes.", "كل شيء يجب أن يتسع في بضعة مكعبات بطول 10 سم، ويعمل ببضعة واطات، ويرسل بياناته في مرورات قصيرة."),
  fixed: { m: 0.1, p: 2, cost: 0.05 },
  story: {
    intro: [
      B("Egypt depends on the Nile for most of its water, and on the green strip of farms along it.", "تعتمد مصر على النيل في معظم مياهها، وعلى شريط الحقول الأخضر على ضفتيه."),
      B("You get a CubeSat: a satellite made of 10 cm cubes. Small, cheap, and powerful if you design it well.", "لديك «كيوب سات»: قمر مصنوع من مكعبات طولها 10 سم. صغير ورخيص، وقوي إذا صممته جيدًا."),
      B("Use everything you learned from the three case files. This time, the story is yours!", "استخدم كل ما تعلمته من القضايا الثلاث. هذه المرة القصة قصتك!")
    ]
  },
  hints: {
    objective: B("Pick one question first: crops, water, heat or dust. Then build for it.", "اختر سؤالًا واحدًا أولًا: المحاصيل أو المياه أو الحرارة أو الغبار، ثم ابنِ من أجله."),
    build: B("Choose the size first. Then watch the volume meter: everything must fit!", "اختر الحجم أولًا، ثم راقب عدّاد المساحة: كل شيء يجب أن يتسع!"),
    launch: B("Cameras make lots of data. A partner station network brings about 3× more home.", "الكاميرات تنتج بيانات كثيرة. شبكة محطات شريكة تنزّل نحو 3 أضعاف."),
    tests: B("NASA’s CubeSat 101: test everything together, and test your ground station.", "دليل ناسا للكيوب سات: اختبر كل شيء معًا، واختبر محطتك الأرضية.")
  },
  goals: {
    primary: [
      { id: "veg", n: B("Crop health in the Delta", "صحة المحاصيل في الدلتا"), d: B("Spot thirsty or sick fields early.", "اكتشاف الحقول العطشى أو المريضة مبكرًا."), tags: ["veg"],
        req: [{ t: B("See fields in red and near-infrared at 10–30 m detail", "رؤية الحقول بالأحمر وتحت الأحمر القريب بدقة 10–30 م"), v: "Test" }] },
      { id: "water", n: B("Nile and Lake Nasser water", "مياه النيل وبحيرة ناصر"), d: B("Track how much water is stored.", "متابعة كمية المياه المخزنة."), tags: ["water"],
        req: [{ t: B("Measure water area every week", "قياس مساحة المياه كل أسبوع"), v: "Analysis" }] },
      { id: "heat", n: B("Hot spots in Greater Cairo", "النقاط الساخنة في القاهرة الكبرى"), d: B("Find the hottest neighbourhoods to plant shade.", "إيجاد أكثر الأحياء حرارة لزراعة الظل."), tags: ["thermal"],
        req: [{ t: B("Map surface temperature at about 100 m detail", "رسم حرارة السطح بدقة 100 م تقريبًا"), v: "Test" }] },
      { id: "dust", n: B("Khamaseen dust storms", "عواصف الخماسين الترابية"), d: B("Follow spring dust storms across Egypt.", "متابعة عواصف الربيع عبر مصر."), tags: ["dust"],
        req: [{ t: B("Image dust plumes across Egypt every day", "تصوير سحب الغبار فوق مصر يوميًا"), v: "Analysis" }] }
    ],
    secondaryFromPrimary: true
  },
  slots: [
    { id: "bus", kind: "bus", phase: "craft", role: "eng", label: B("CubeSat size", "حجم الكيوب سات"), short: B("Size", "الحجم"), tab: "📦",
      hint: B("1 unit (1U) = a 10 cm cube of about 1–1.33 kg (NASA CubeSat 101).", "الوحدة (1U) = مكعب 10 سم وزنه 1–1.33 كغ تقريبًا (دليل ناسا)."),
      opts: [
        { id: "u3", ic: "cube", icp: 3, n: B("3U (3 cubes)", "3U (ثلاثة مكعبات)"), m: 0.4, cost: 0.12, ucap: 2.4, mcap: 4.0, flags: { U: 3 }, d: B("Smallest and cheapest.", "الأصغر والأرخص.") },
        { id: "u6", ic: "cube", icp: 6, n: B("6U (6 cubes)", "6U (ستة مكعبات)"), m: 0.9, cost: 0.25, ucap: 5.2, mcap: 8.0, flags: { U: 6 }, d: B("Twice the room.", "ضعف المساحة.") },
        { id: "u12", ic: "cube", icp: 12, n: B("12U (12 cubes)", "12U (اثنا عشر مكعبًا)"), m: 1.7, cost: 0.45, ucap: 10.5, mcap: 16.0, flags: { U: 12 }, d: B("Room for a big payload. Costs more.", "مساحة لحمولة كبيرة. أغلى.") }
      ] },
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Cameras", "الكاميرات"), short: B("Camera", "كاميرا"), tab: "🔭",
      opts: [
        { id: "msi", ic: "multicam", n: B("Colour + infrared camera", "كاميرا ألوان وتحت الحمراء"), m: 1.0, u: 1.5, p: 3, cost: 0.35, data: 6, sci: 30, tags: ["veg", "water", "dust"], d: B("A great all-rounder.", "جيدة في كل شيء.") },
        { id: "tir", ic: "thermalcam", n: B("Heat camera", "كاميرا حرارية"), m: 1.6, u: 2, p: 5, cost: 0.45, data: 3, sci: 30, tags: ["thermal", "water"], d: B("Sees heat. Bulky.", "ترى الحرارة. حجمها كبير.") },
        { id: "hsi", ic: "hypercam", n: B("Rainbow camera (hyperspectral)", "كاميرا قوس قزح (فائقة الطيف)"), m: 2.4, u: 3, p: 7, cost: 0.8, data: 18, sci: 45, tags: ["veg", "water"], d: B("Hundreds of colours. A data monster!", "مئات الألوان. وحش بيانات!") },
        { id: "wide", ic: "widecam", n: B("Wide camera", "كاميرا واسعة"), m: 0.3, u: 0.5, p: 1, cost: 0.08, data: 1, sci: 15, tags: ["dust"], d: B("All of Egypt in one picture. Cheap.", "مصر كلها في صورة واحدة. رخيصة.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Solar power", "الطاقة الشمسية"), short: B("Solar", "طاقة"), tab: "☀️",
      opts: [
        { id: "body", ic: "cells", n: B("Solar cells on the walls", "خلايا شمسية على الجدران"), m: 0.3, u: 0, genU: 2.2, cost: 0.04, flags: { wings: 0 }, d: B("Simple, no moving parts.", "بسيطة وبلا أجزاء متحركة.") },
        { id: "deploy", ic: "deploy", n: B("Fold-out solar wings", "أجنحة شمسية قابلة للفتح"), m: 0.6, u: 0.2, genU: 6, cost: 0.12, flags: { wings: 2 }, d: B("About three times the power.", "نحو ثلاثة أضعاف الطاقة.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      opts: [
        { id: "w20", ic: "battery", icp: 1, n: B("Battery, 20 Wh", "بطارية 20 واط·ساعة"), m: 0.15, u: 0.2, wh: 20, cost: 0.02, d: B("Small.", "صغيرة.") },
        { id: "w40", ic: "battery", icp: 2, n: B("Battery, 40 Wh", "بطارية 40 واط·ساعة"), m: 0.3, u: 0.4, wh: 40, cost: 0.04, d: B("Medium.", "متوسطة.") },
        { id: "w80", ic: "battery", icp: 4, n: B("Battery, 80 Wh", "بطارية 80 واط·ساعة"), m: 0.6, u: 0.8, wh: 80, cost: 0.08, d: B("Large.", "كبيرة.") }
      ] },
    { id: "adcs", kind: "adcs", phase: "craft", role: "eng", label: B("Pointing", "التوجيه"), short: B("Pointing", "توجيه"), tab: "🎯",
      opts: [
        { id: "mag", ic: "magnet", n: B("Magnets only", "مغناطيسات فقط"), m: 0.2, u: 0.3, p: 1, cost: 0.03, flags: { rough: true }, d: B("Cheap, but the camera wobbles.", "رخيصة، لكن الكاميرا تهتز.") },
        { id: "rw3", ic: "wheels", icp: 4, n: B("Tiny steady wheels", "عجلات تثبيت صغيرة"), m: 0.7, u: 0.8, p: 3, cost: 0.15, d: B("Holds the camera steady on a target.", "تثبّت الكاميرا على الهدف.") }
      ] },
    { id: "cpu", kind: "cpu", phase: "craft", role: "eng", label: B("Robot brain", "العقل الإلكتروني"), short: B("Brain", "عقل"), tab: "🧠",
      opts: [
        { id: "cots", ic: "chip", n: B("Shop-bought computer", "حاسوب تجاري"), m: 0.1, u: 0.2, p: 1, cost: 0.03, d: B("Cheap. Not built for radiation.", "رخيص، وغير مصمم للإشعاع.") },
        { id: "radtol", ic: "chipshield", n: B("Radiation-proof computer", "حاسوب مقاوم للإشعاع"), m: 0.15, u: 0.2, p: 1.5, cost: 0.1, flags: { robust: true }, d: B("Recovers by itself.", "يتعافى وحده.") }
      ] },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio", "الراديو"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "uhf", ic: "antenna", n: B("Ham radio (UHF)", "راديو هواة (UHF)"), m: 0.1, u: 0.2, p: 1, cost: 0.02, rate: 0.05, d: B("Very cheap. Too slow for pictures.", "رخيص جدًا، وبطيء على الصور.") },
        { id: "sb", ic: "radio", n: B("Medium radio (S-band)", "راديو متوسط (S)"), m: 0.25, u: 0.3, p: 3, cost: 0.08, rate: 1.5, d: B("A middle ground.", "حل وسط.") },
        { id: "xb", ic: "dish", icp: 0, n: B("Fast radio (X-band)", "راديو سريع (X)"), m: 0.5, u: 0.6, p: 6, cost: 0.25, rate: 12, d: B("Fast enough for cameras.", "سريع بما يكفي للكاميرات.") }
      ] },
    { id: "ground", kind: "ops", phase: "launch", role: "nav", label: B("Ground stations", "المحطات الأرضية"),
      opts: [
        { id: "gs1", ic: "dishone", n: B("One station in Egypt", "محطة واحدة في مصر"), cost: 0.03, dataM: 1, d: B("A few short passes over Cairo a day.", "بضع مرورات قصيرة فوق القاهرة يوميًا.") },
        { id: "gs3", ic: "globe", n: B("Egypt + partner stations", "مصر + محطات شريكة"), cost: 0.15, dataM: 3, d: B("Contacts around the world: about 3× the data.", "اتصالات حول العالم: نحو 3 أضعاف البيانات.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Orbit", "المدار"),
      opts: [
        { id: "iss400", ic: "iss400", n: B("400 km, released from the ISS", "400 كم، يُطلق من محطة الفضاء"), cost: 0, life: 0.4, d: B("Air drag brings it down in 1–2 years. No space junk.", "مقاومة الهواء تُسقطه خلال سنة إلى سنتين. بلا حطام فضائي.") },
        { id: "sso550", ic: "sso550", n: B("550 km, pole to pole", "550 كم من قطب لقطب"), cost: 0, d: B("Lasts 5+ years, over Egypt at the same time every day.", "يدوم أكثر من 5 سنوات، فوق مصر في نفس الوقت يوميًا.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Launch", "الإطلاق"),
      opts: [
        { id: "issdep", ic: "iss", n: B("Ride to the ISS", "رحلة إلى محطة الفضاء"), cap: 24, cost: 0.12, orbits: ["iss400"], d: B("Go up with supplies, get pushed out by the station.", "تصعد مع الإمدادات وتدفعك المحطة للخارج.") },
        { id: "ride", ic: "ride", n: B("Shared ride to 550 km", "رحلة مشتركة إلى 550 كم"), cap: 24, cost: 0.35, mo: 2, orbits: ["sso550"], d: B("Share a rocket with dozens of small satellites.", "صاروخ مشترك مع عشرات الأقمار الصغيرة.") },
        { id: "ded", ic: "taurus", n: B("Your own small rocket", "صاروخ صغير خاص بك"), cap: 150, cost: 7.5, orbits: ["iss400", "sso550"], d: B("Way beyond a CubeSat budget!", "أكبر بكثير من ميزانية الكيوب سات!") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      hint: B("CubeSat 101 warns: parts that work alone often fail together.", "دليل الكيوب سات يحذّر: القطع التي تعمل منفردة قد تفشل معًا."),
      opts: [
        T_TVAC(0.06, 1), T_VIB(0.04, 0.5),
        { id: "cal", ic: "cal", n: B("Camera calibration", "معايرة الكاميرا"), cost: 0.05, mo: 0.5, d: B("Turns pretty pictures into measurements.", "تحوّل الصور الجميلة إلى قياسات.") },
        { id: "ditl", ic: "ditl", n: B("Day-in-the-life test", "اختبار «يوم في الحياة»"), cost: 0.03, mo: 0.5, d: B("Run everything together for days, like in orbit.", "تشغيل كل شيء معًا لأيام كما في المدار.") },
        { id: "gstest", ic: "gstest", n: B("Ground-station test", "اختبار المحطة الأرضية"), cost: 0.02, mo: 0.5, d: B("Talk to the satellite through your real station first.", "كلّم القمر عبر محطتك الحقيقية أولًا.") },
        T_FAULT(0.03, 0.5)
      ] }
  ],
  history: {
    rows: [],
    story: B("No crew flew this mission before. This case file is yours. NASA’s CubeSat 101 guide collects the lessons first-time teams learn the hard way: parts that work alone can fail once connected, and launching with a weak ground station is a mission killer.",
      "لم يطيّر أحد هذه المهمة من قبل. هذه القضية قضيتك. يجمع دليل ناسا «كيوب سات 101» دروسًا تتعلمها الفرق الجديدة بصعوبة: القطع التي تعمل منفردة قد تفشل عند توصيلها، والإطلاق بمحطة أرضية ضعيفة يقتل المهمة."),
    lesson: B("Small satellites fail for big reasons: untested connections, untested ground stations, no margins.", "الأقمار الصغيرة تفشل لأسباب كبيرة: اتصالات غير مختبرة، ومحطات غير مختبرة، وبلا هوامش."),
    source: B("NASA CubeSat Launch Initiative, CubeSat 101.", "مبادرة ناسا لإطلاق الكيوب سات، دليل كيوب سات 101.")
  }
}
];
