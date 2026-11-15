/* ===================== SECOND CHANCE — Engineer-level cases: Vanguard TV-3 (1957) and Swift rescue (2026) ===================== */
MISSIONS.push(
/* ----------------------------- Vanguard TV-3 ----------------------------- */
{
  id: "vanguard", no: 5, title: B("Vanguard TV-3", "فانغارد TV-3"), years: "1957", stamp: B("EXPLODED 1957", "انفجر 1957"),
  scene: "pad", craft: "rocket", badge: { name: B("Ignition Inspector", "مفتش الإشعال"), color: "#FF8A3D", glyph: "🔥" },
  teaser: B("America’s first try at a satellite rose about one metre… then fell back and exploded.", "أول محاولة أمريكية لإطلاق قمر صناعي ارتفعت نحو متر واحد… ثم سقطت وانفجرت."),
  env: { budget: 14, deadline: 4, base: 2, eclipseH: 0.6, dod: 0.5, solar: 1, days: 2000, money: 1, mass: 1, refSci: 60 },
  critical: ["schedule"],
  criticalWhy: B("The space race is on: Sputnik is already in orbit and the whole world is watching.", "سباق الفضاء بدأ: سبوتنيك في المدار بالفعل، والعالم كله يراقب."),
  fixed: { m: 0.5, p: 0.3, cost: 6 },
  story: {
    crash: [
      B("6 December 1957. Cameras from around the world watch the launch pad at Cape Canaveral.", "6 ديسمبر 1957. كاميرات من حول العالم تراقب منصة الإطلاق في كيب كانافيرال."),
      B("The engine ignites… the rocket rises about one metre…", "يشتعل المحرك… يرتفع الصاروخ نحو متر واحد…"),
      B("…then loses thrust after two seconds, falls back and explodes! The little satellite rolls away, still beeping.", "…ثم يفقد قوة الدفع بعد ثانيتين، ويسقط وينفجر! والقمر الصغير يتدحرج بعيدًا وما زال يُصدر إشارته.")
    ],
    clues: [
      { ic: "cal", t: B("Launch film", "فيلم الإطلاق"), body: B("Rises about 1.2 m.\nThrust lost at about 2 seconds.\nFalls back onto the pad and explodes.", "يرتفع نحو 1.2 م.\nتضيع قوة الدفع بعد ثانيتين تقريبًا.\nيسقط على المنصة وينفجر."), orbi: B("It barely left the ground. The problem happened right at engine start!", "بالكاد ترك الأرض. المشكلة حدثت لحظة تشغيل المحرك!"), expr: "shocked" },
      { ic: "tvac", t: B("Two seconds of telemetry", "ثانيتان من بيانات القياس"), body: B("Only a few sensors were installed.\nThey show a sudden pressure spike at ignition, then a fuel line breaks.", "لم تُركّب إلا حساسات قليلة.\nتُظهر قفزة مفاجئة في الضغط عند الإشعال، ثم ينكسر خط وقود."), orbi: B("A pressure spike at the very start… and very little data to study it.", "قفزة ضغط في البداية تمامًا… وبيانات قليلة جدًا لدراستها."), expr: "think" },
      { ic: "clipboard", t: B("Martin Company report", "تقرير شركة مارتن"), body: B("“Fuel tank pressure was slightly lower than planned during the start. Burning gas leaked back into the fuel system through the injector head.”", "«كان ضغط خزان الوقود أقل قليلًا من المخطط أثناء التشغيل، فتسرّب غاز مشتعل عائدًا إلى نظام الوقود عبر رأس الحاقن.»"), orbi: B("Low pressure let the fire flow the wrong way!", "الضغط المنخفض سمح للنار بأن تسير في الاتجاه الخطأ!"), expr: "shocked" },
      { ic: "iface", t: B("Engine maker’s view", "رأي صانع المحرك"), body: B("General Electric argued that a loose fuel connection caused the pressure drop.", "قالت جنرال إلكتريك إن وصلة وقود غير محكمة هي التي سببت انخفاض الضغط."), orbi: B("Two companies, two explanations. Maybe both were part of it.", "شركتان وتفسيران. ربما كلاهما جزء من القصة."), expr: "think" },
      { ic: "radio", t: B("The satellite", "القمر الصناعي"), body: B("A 1.5 kg sphere, 16 cm wide.\nThrown clear of the fire, still transmitting.\nNewspapers called it “Flopnik”.", "كرة وزنها 1.5 كغ وقطرها 16 سم.\nقُذفت بعيدًا عن النار وما زالت ترسل.\nسمّتها الصحف «فلوبنك»."), orbi: B("The satellite was fine. The rocket’s start was the problem.", "القمر كان سليمًا. بداية تشغيل الصاروخ هي المشكلة."), expr: "worried" }
    ],
    diagnose: [
      { q: B("What stopped the engine?", "ما الذي أوقف المحرك؟"), correct: 2, opts: [
        { t: B("The satellite was too heavy", "القمر كان ثقيلًا جدًا"), no: B("It weighed only 1.5 kg. Look at the pressure clues.", "وزنه 1.5 كغ فقط. انظر إلى أدلة الضغط.") },
        { t: B("Strong wind pushed it over", "رياح قوية أسقطته"), no: B("The film shows it falling straight down after losing thrust.", "الفيلم يُظهره يسقط مباشرة بعد فقدان الدفع.") },
        { t: B("Low fuel pressure at start let hot gas burn back into the injector", "ضغط الوقود المنخفض عند التشغيل سمح للغاز الساخن بالعودة وحرق الحاقن") },
        { t: B("It ran out of fuel", "نفد منه الوقود"), no: B("The tanks were full: that’s why the explosion was so big.", "الخزانات كانت ممتلئة، ولهذا كان الانفجار كبيرًا.") } ],
        yes: B("Exactly! Without enough push from the tank, fire leaked backwards into the engine’s plumbing.", "بالضبط! دون دفع كافٍ من الخزان، تسربت النار للخلف إلى أنابيب المحرك.") },
      { q: B("How did engineers fix later Vanguard rockets?", "كيف أصلح المهندسون صواريخ فانغارد اللاحقة؟"), correct: 0, opts: [
        { t: B("Raise the tank pressure and start the oxygen flow first", "رفع ضغط الخزان وبدء تدفق الأكسجين أولًا") },
        { t: B("Launch only at night", "الإطلاق ليلًا فقط"), no: B("Time of day had nothing to do with it.", "وقت الإطلاق لا علاقة له بالمشكلة.") },
        { t: B("Use a bigger satellite", "استخدام قمر أكبر"), no: B("The satellite wasn’t the problem.", "القمر لم يكن هو المشكلة.") } ],
        yes: B("Right! A smoother engine start. Vanguard 1 reached orbit in March 1958 and is still up there today. Now it’s your rocket!", "صحيح! تشغيل أنعم للمحرك. وصل فانغارد 1 إلى المدار في مارس 1958 وما زال هناك حتى اليوم. الآن جاء دور صاروخك!") }
    ]
  },
  hints: {
    objective: B("In 1957 just reaching orbit is huge. What else should your tiny satellite tell us?", "في 1957 مجرد الوصول للمدار إنجاز ضخم. ماذا يمكن أن يخبرنا قمرك الصغير أيضًا؟"),
    build: B("Remember the clues: pressure at start, the injector, and a loose connection.", "تذكّر الأدلة: الضغط عند التشغيل، والحاقن، والوصلة غير المحكمة."),
    launch: B("A higher orbit lasts much longer before the air pulls it down.", "المدار الأعلى يدوم أطول بكثير قبل أن يسحبه الهواء للأسفل."),
    tests: B("The failure happened in the first two seconds. Which test watches the engine start?", "الفشل حدث في أول ثانيتين. أي اختبار يراقب لحظة تشغيل المحرك؟")
  },
  goals: {
    primary: [
      { id: "orbit1", n: B("Put the first American satellite in orbit", "وضع أول قمر صناعي أمريكي في المدار"), d: B("Prove the rocket and the satellite work.", "إثبات أن الصاروخ والقمر يعملان."), tags: ["beacon"],
        req: [{ t: B("Reach orbit and send a radio signal that ground stations can track", "الوصول للمدار وإرسال إشارة راديو تتتبعها المحطات الأرضية"), v: "Demonstration" }] },
      { id: "shape", n: B("Measure the true shape of the Earth", "قياس الشكل الحقيقي للأرض"), d: B("Tiny changes in the orbit reveal Earth’s shape.", "تغيرات صغيرة في المدار تكشف شكل الأرض."), tags: ["beacon"],
        req: [{ t: B("Track the orbit precisely for years", "تتبع المدار بدقة لسنوات"), v: "Analysis" }] }
    ],
    secondary: [
      { id: "cells", n: B("Test solar cells in space", "اختبار الخلايا الشمسية في الفضاء"), d: B("Nobody has powered a satellite with sunlight yet.", "لم يشغّل أحد قمرًا بضوء الشمس بعد."), tags: ["solar"],
        req: [{ t: B("Run a transmitter on solar power", "تشغيل جهاز إرسال بالطاقة الشمسية"), v: "Demonstration" }] },
      { id: "temp", n: B("Measure temperatures in space", "قياس درجات الحرارة في الفضاء"), d: B("How hot and cold does a satellite get?", "إلى أي حد تسخن الأقمار وتبرد؟"), tags: ["temp"],
        req: [{ t: B("Send inside and outside temperatures", "إرسال درجات الحرارة الداخلية والخارجية"), v: "Test" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Satellite instruments", "أجهزة القمر"), short: B("Satellite", "القمر"), tab: "🛰️",
      opts: [
        { id: "beacon", ic: "radio", n: B("Battery radio beacon", "منارة راديو بالبطارية"), m: 0.3, p: 0.1, cost: 0.4, data: 0.001, sci: 30, tags: ["beacon"], hist: true, d: B("A steady signal that lets stations track the orbit.", "إشارة ثابتة تسمح للمحطات بتتبع المدار.") },
        { id: "solarradio", ic: "antenna", n: B("Solar-powered radio", "راديو بالطاقة الشمسية"), m: 0.3, p: 0.05, cost: 0.6, data: 0.001, sci: 25, tags: ["solar", "beacon"], hist: true, d: B("Keeps talking for years, if the solar cells survive.", "يستمر في الإرسال لسنوات إذا صمدت الخلايا الشمسية.") },
        { id: "therm", ic: "tvac", n: B("Temperature sensors", "حساسات الحرارة"), m: 0.2, p: 0.02, cost: 0.3, data: 0.001, sci: 12, tags: ["temp"], d: B("Report how hot and cold the satellite gets.", "تُبلغ عن سخونة القمر وبرودته.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Satellite power", "طاقة القمر"), short: B("Power", "طاقة"), tab: "🔋",
      opts: [
        { id: "merc", ic: "battery", icp: 2, n: B("Mercury batteries only", "بطاريات زئبقية فقط"), m: 0.4, gen: 1.2, wh: 30, cost: 0.2, life: 0.3, d: B("Simple, but they run flat after a few weeks.", "بسيطة، لكنها تنفد بعد أسابيع قليلة.") },
        { id: "mercsun", ic: "cells", n: B("Batteries + 6 solar cells", "بطاريات + 6 خلايا شمسية"), m: 0.5, gen: 1.6, wh: 30, cost: 0.5, hist: true, d: B("New technology from Bell Labs. Can last for years.", "تقنية جديدة من مختبرات بيل. قد تدوم سنوات.") }
      ] },
    { id: "tank", kind: "rocket", phase: "craft", role: "eng", label: B("First-stage tank pressure", "ضغط خزان المرحلة الأولى"), short: B("Tank", "الخزان"), tab: "🛢️",
      hint: B("The tank pressure pushes fuel into the engine before the pumps are fully running.", "ضغط الخزان يدفع الوقود إلى المحرك قبل أن تعمل المضخات بالكامل."),
      opts: [
        { id: "p_std", ic: "tank", n: B("Standard pressure", "ضغط قياسي"), cost: 0, hist: true, d: B("As designed. On the day, it ended up slightly low.", "كما صُمم. في يوم الإطلاق كان أقل قليلًا من المطلوب.") },
        { id: "p_high", ic: "tank", icp: true, n: B("Higher pressure + stronger tank", "ضغط أعلى + خزان أقوى"), cost: 0.8, mo: 0.5, flags: { highP: true }, d: B("More push at start. Needs a re-certified tank.", "دفع أكبر عند البداية. يحتاج خزانًا معاد اعتماده.") }
      ] },
    { id: "start", kind: "rocket", phase: "craft", role: "eng", label: B("Engine start sequence", "تسلسل تشغيل المحرك"), short: B("Start", "التشغيل"), tab: "🔥",
      opts: [
        { id: "s_same", ic: "fault", n: B("Fuel and oxygen together", "الوقود والأكسجين معًا"), cost: 0, hist: true, d: B("Fastest start, but rough pressure swings.", "أسرع تشغيل، لكن تقلبات الضغط عنيفة.") },
        { id: "s_lox", ic: "stopwatch", n: B("Oxygen flows first, then fuel", "الأكسجين أولًا ثم الوقود"), cost: 0.6, mo: 1, flags: { loxLead: true }, d: B("A gentler start: the fix later Vanguards used.", "تشغيل ألطف: الإصلاح الذي استخدمته صواريخ فانغارد اللاحقة.") }
      ] },
    { id: "fitting", kind: "rocket", phase: "craft", role: "eng", label: B("Fuel line connections", "وصلات خطوط الوقود"), short: B("Fittings", "الوصلات"), tab: "🔩",
      opts: [
        { id: "f_std", ic: "iface", n: B("Standard fittings", "وصلات قياسية"), cost: 0, hist: true, d: B("Tightened by hand on the pad.", "تُشد يدويًا على المنصة.") },
        { id: "f_wire", ic: "clipboard", n: B("Torque-checked and safety-wired", "مفحوصة العزم ومؤمّنة بالأسلاك"), cost: 0.2, mo: 0.25, flags: { wired: true }, d: B("Every connection measured and locked.", "كل وصلة مقاسة ومقفلة.") }
      ] },
    { id: "comms", kind: "comms", phase: "launch", role: "nav", label: B("Tracking network", "شبكة التتبع"), short: B("Tracking", "التتبع"),
      opts: [
        { id: "minitrack", ic: "globe", n: B("Minitrack radio stations", "محطات «ميني تراك» الراديوية"), cost: 0.5, rate: 0.01, hist: true, d: B("A chain of stations built to follow Vanguard.", "سلسلة محطات بُنيت لمتابعة فانغارد.") },
        { id: "fewst", ic: "dishone", n: B("Two stations only", "محطتان فقط"), cost: 0.2, rate: 0.002, d: B("Cheaper, with big gaps in tracking.", "أرخص، مع فجوات كبيرة في التتبع.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Target orbit", "المدار المستهدف"),
      opts: [
        { id: "high", ic: "atrain", n: B("650 × 3,900 km (long-lived)", "650 × 3,900 كم (طويل العمر)"), cost: 0, hist: true, d: B("High enough to stay up for centuries.", "مرتفع بما يكفي ليبقى قرونًا.") },
        { id: "low", ic: "leo", n: B("300 km (easier)", "300 كم (أسهل)"), cost: 0, life: 0.15, d: B("Easier for the rocket, but air drag pulls it down in weeks.", "أسهل على الصاروخ، لكن مقاومة الهواء تُسقطه خلال أسابيع.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Rocket", "الصاروخ"),
      opts: [
        { id: "tv3", ic: "taurus", n: B("Vanguard TV-3", "فانغارد TV-3"), cap: 10, cost: 3, hist: true, d: B("The three-stage Vanguard test vehicle.", "مركبة اختبار فانغارد ذات المراحل الثلاث.") },
        { id: "tv3bu", ic: "taurus", n: B("Backup rocket, fully re-inspected", "الصاروخ الاحتياطي بعد فحص كامل"), cap: 10, cost: 3.6, mo: 1, flags: { inspected: true }, d: B("Same design, but every part checked again. Costs a month.", "نفس التصميم، لكن كل قطعة فُحصت مجددًا. يكلّف شهرًا.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      hint: B("The 1957 team was rushing. Every test costs precious time.", "فريق 1957 كان مستعجلًا. كل اختبار يكلف وقتًا ثمينًا."),
      opts: [
        { id: "ignite", ic: "fault", n: B("Engine start test with pressure sensors", "اختبار تشغيل المحرك مع حساسات الضغط"), cost: 0.5, mo: 0.5, d: B("Fire the engine on a test stand and record every pressure in the first seconds.", "تشغيل المحرك على منصة اختبار وتسجيل كل ضغط في الثواني الأولى.") },
        { id: "leak", ic: "audit", n: B("Leak and tightness check", "فحص التسرب والإحكام"), cost: 0.2, mo: 0.25, d: B("Pressurise the fuel lines and look for loose connections.", "ضغط خطوط الوقود والبحث عن وصلات غير محكمة.") },
        { id: "telem", ic: "dishtwo", n: B("Extra telemetry sensors", "حساسات قياس إضافية"), cost: 0.3, mo: 0.25, d: B("If something fails, you’ll know exactly why.", "إذا فشل شيء ستعرف السبب بالضبط.") },
        T_VIB(0.3, 0.25),
        { id: "radio", ic: "gstest", n: B("Satellite radio check", "فحص راديو القمر"), cost: 0.1, mo: 0.25, d: B("Make sure the stations hear the beacon.", "التأكد من أن المحطات تسمع المنارة.") }
      ] }
  ],
  history: {
    rows: [
      [B("Tank pressure", "ضغط الخزان"), B("Slightly low at start", "منخفض قليلًا عند التشغيل"), "tank"],
      [B("Engine start", "تشغيل المحرك"), B("Fuel and oxygen together", "الوقود والأكسجين معًا"), "start"],
      [B("Fuel connections", "وصلات الوقود"), B("Possibly loose", "ربما غير محكمة"), "fitting"],
      [B("Start test with sensors", "اختبار التشغيل بالحساسات"), B("Not enough: the flaw was missed", "غير كافٍ: الخلل لم يُكتشف"), "ignite"]
    ],
    story: B("On 6 December 1957, two months after Sputnik, the Vanguard TV-3 rocket rose about 1.2 m, lost thrust after two seconds, fell back and exploded on the pad. Only a few sensors were fitted, so the cause was never certain. The Martin Company concluded that low fuel tank pressure during start let burning gas leak back into the fuel system through the injector; General Electric pointed to a loose fuel connection. Later Vanguards raised the tank pressure and changed the start sequence, and Vanguard 1 reached orbit on 17 March 1958. It is still in orbit today, the oldest human-made object in space.",
      "في 6 ديسمبر 1957، بعد شهرين من سبوتنيك، ارتفع صاروخ فانغارد TV-3 نحو 1.2 م، وفقد الدفع بعد ثانيتين، ثم سقط وانفجر على المنصة. لم تُركّب إلا حساسات قليلة، فلم يُعرف السبب بيقين. استنتجت شركة مارتن أن انخفاض ضغط خزان الوقود عند التشغيل سمح لغاز مشتعل بالتسرب عائدًا إلى نظام الوقود عبر الحاقن، بينما أشارت جنرال إلكتريك إلى وصلة وقود غير محكمة. رفعت صواريخ فانغارد اللاحقة ضغط الخزان وغيّرت تسلسل التشغيل، فوصل فانغارد 1 إلى المدار في 17 مارس 1958، وما زال في المدار حتى اليوم كأقدم جسم صنعه الإنسان في الفضاء."),
    lesson: B("The first seconds of an engine start are the most dangerous. Test them, and fit enough sensors to learn from failure.", "الثواني الأولى من تشغيل المحرك هي الأخطر. اختبرها، وركّب حساسات كافية لتتعلم من الفشل."),
    source: B("NASA NSSDC: Vanguard TV-3; Project Vanguard engineering history.", "ناسا NSSDC: فانغارد TV-3؛ التاريخ الهندسي لمشروع فانغارد.")
  }
},

/* ----------------------------- Swift rescue ----------------------------- */
{
  id: "swift", no: 6, title: B("Swift Rescue (LINK)", "إنقاذ تلسكوب سويفت (لينك)"), years: "2025–2026", stamp: B("LOST 2026", "فُقد 2026"),
  scene: "rescue", craft: "orbiter", badge: { name: B("Rescue Pilot", "طيار الإنقاذ"), color: "#4FC3F7", glyph: "🛟" },
  teaser: B("A $30 million robot was sent to save a falling space telescope. It couldn’t control itself.", "روبوت بقيمة 30 مليون دولار أُرسل لإنقاذ تلسكوب فضائي يسقط، لكنه لم يستطع التحكم في نفسه."),
  env: { budget: 30, deadline: 10, base: 6.5, eclipseH: 0.6, dod: 0.35, solar: 1, days: 400, money: 1, mass: 0, refSci: 80 },
  critical: ["schedule"],
  criticalWhy: B("Swift is sinking faster every month. Launch late and there is nothing left to save.", "سويفت يهبط أسرع كل شهر. إذا تأخر الإطلاق فلن يبقى شيء لإنقاذه."),
  fixed: { m: 150, p: 120, cost: 9 },
  story: {
    crash: [
      B("Swift has hunted gamma-ray bursts since 2004. Now a very active Sun is puffing up Earth’s upper air, and Swift is sinking.", "يرصد سويفت انفجارات أشعة غاما منذ 2004. والآن تنفخ شمسٌ نشطة جدًا الطبقات العليا من هواء الأرض، فيهبط سويفت."),
      B("July 2026: a small robot spacecraft called LINK launches to grab Swift and push it higher.", "يوليو 2026: تنطلق مركبة روبوتية صغيرة اسمها «لينك» لتمسك سويفت وترفعه أعلى."),
      B("But LINK starts spinning and can’t control itself. The rescue is called off. Swift falls.", "لكن «لينك» تبدأ بالدوران ولا تستطيع التحكم في نفسها. أُلغيت عملية الإنقاذ، وسقط سويفت.")
    ],
    clues: [
      { ic: "cal", t: B("Swift’s height", "ارتفاع سويفت"), body: B("2004: about 600 km.\n2025: sinking faster than expected.\nCause: strong solar activity heats and puffs up the upper atmosphere → more drag.", "2004: نحو 600 كم.\n2025: يهبط أسرع من المتوقع.\nالسبب: نشاط شمسي قوي يسخّن الغلاف الجوي العلوي وينفخه ← مقاومة أكبر."), orbi: B("The Sun itself made Swift fall faster!", "الشمس نفسها جعلت سويفت يسقط أسرع!"), expr: "worried" },
      { ic: "clipboard", t: B("NASA contract, Sept 2025", "عقد ناسا، سبتمبر 2025"), body: B("$30 million.\nDesign, build, test and launch a rescue robot in under one year.\nSwift was never designed to be serviced.", "30 مليون دولار.\nتصميم روبوت إنقاذ وبناؤه واختباره وإطلاقه في أقل من عام.\nسويفت لم يُصمم أبدًا ليُصلَح في الفضاء."), orbi: B("Less than a year to build something nobody had done before…", "أقل من عام لبناء شيء لم يفعله أحد من قبل…"), expr: "think" },
      { ic: "wheeltest", t: B("LINK spin data, July 2026", "بيانات دوران لينك، يوليو 2026"), body: B("Weeks after launch LINK spins at about 9° per second.\nBy 31 July thruster burns slow it to under 4° per second.", "بعد أسابيع من الإطلاق تدور «لينك» بنحو 9 درجات في الثانية.\nبحلول 31 يوليو أبطأتها الدافعات إلى أقل من 4 درجات في الثانية."), orbi: B("It’s spinning like a top! You can’t grab anything like that.", "إنها تدور كالخذروف! لا يمكنك الإمساك بشيء هكذا."), expr: "shocked" },
      { ic: "email", t: B("NASA statement, 19 Aug 2026", "بيان ناسا، 19 أغسطس 2026"), body: B("“Due to an ongoing attitude control issue, LINK will not capture or boost Swift.”", "«بسبب مشكلة مستمرة في التحكم بالاتجاه، لن تمسك لينك سويفت ولن ترفعه.»"), orbi: B("Attitude control means pointing and holding steady. That’s what failed.", "التحكم بالاتجاه يعني التوجيه والثبات. وهذا ما فشل."), expr: "worried" },
      { ic: "camera", t: B("Close approach photos", "صور الاقتراب"), body: B("LINK still got within 12–15 km of Swift and photographed it, as a demonstration.\nSwift took its last science data in October 2026.", "اقتربت «لينك» حتى 12–15 كم من سويفت وصوّرته كعرض تقني.\nجمع سويفت آخر بياناته العلمية في أكتوبر 2026."), orbi: B("So close! But not close enough to grab.", "قريب جدًا! لكن ليس بما يكفي للإمساك به."), expr: "worried" }
    ],
    diagnose: [
      { q: B("Why couldn’t LINK save Swift?", "لماذا لم تستطع «لينك» إنقاذ سويفت؟"), correct: 1, opts: [
        { t: B("Its rocket failed at launch", "صاروخها فشل عند الإطلاق"), no: B("The launch worked. Look at what happened weeks later.", "الإطلاق نجح. انظر ماذا حدث بعد أسابيع.") },
        { t: B("LINK couldn’t control its own orientation", "«لينك» لم تستطع التحكم في اتجاهها") },
        { t: B("Swift was too heavy to push", "سويفت كان ثقيلًا جدًا على الدفع"), no: B("LINK never even got to push. Check the spin data.", "«لينك» لم تصل حتى لمرحلة الدفع. راجع بيانات الدوران.") },
        { t: B("LINK ran out of fuel", "نفد وقود «لينك»"), no: B("Fuel wasn’t the main issue. Read NASA’s statement.", "الوقود لم يكن المشكلة الأساسية. اقرأ بيان ناسا.") } ],
        yes: B("Yes. Attitude control is the most basic skill a spacecraft needs before any delicate move.", "نعم. التحكم بالاتجاه أبسط مهارة تحتاجها المركبة قبل أي حركة دقيقة.") },
      { q: B("What made the problem so hard to recover from?", "ما الذي جعل التعافي من المشكلة صعبًا جدًا؟"), correct: 0, opts: [
        { t: B("Swift was falling fast, and a one-year build left little time to test and recover", "سويفت كان يسقط بسرعة، والبناء في عام واحد ترك وقتًا قليلًا للاختبار والتعافي") },
        { t: B("There were no ground stations", "لم تكن هناك محطات أرضية"), no: B("Ground teams talked to LINK the whole time.", "الفرق الأرضية تواصلت مع «لينك» طوال الوقت.") },
        { t: B("Swift refused to dock", "سويفت رفض الالتحام"), no: B("Swift can’t refuse anything: it was never built to be grabbed at all.", "سويفت لا يرفض شيئًا، لكنه لم يُصمم أصلًا ليُمسَك.") } ],
        yes: B("Exactly. Race against the clock: every week spent fixing LINK, Swift sank lower. Now design your own rescue!", "بالضبط. سباق مع الزمن: كل أسبوع من إصلاح «لينك» كان سويفت يهبط أكثر. الآن صمّم عملية الإنقاذ الخاصة بك!") }
    ]
  },
  hints: {
    objective: B("The main job is to push Swift higher. What else could this mission teach the world?", "المهمة الأساسية رفع سويفت أعلى. ماذا يمكن أن تعلّم هذه المهمة العالم أيضًا؟"),
    build: B("LINK failed at attitude control. A proven system is safer but takes time: watch the schedule meter!", "«لينك» فشلت في التحكم بالاتجاه. النظام المجرّب أكثر أمانًا لكنه يأخذ وقتًا: راقب عدّاد الوقت!"),
    launch: B("Launching straight into Swift’s orbit plane saves weeks of chasing.", "الإطلاق مباشرة في مستوى مدار سويفت يوفّر أسابيع من المطاردة."),
    tests: B("Which test runs the real pointing hardware and software together on the ground?", "أي اختبار يشغّل أجهزة التوجيه وبرامجه الحقيقية معًا على الأرض؟")
  },
  goals: {
    primary: [
      { id: "save", n: B("Boost Swift back to a safe orbit", "رفع سويفت إلى مدار آمن"), d: B("Grab it and push it back up to about 600 km.", "الإمساك به ودفعه للعودة إلى نحو 600 كم."), tags: ["boost"],
        req: [{ t: B("Capture Swift and raise its orbit before it falls too low", "الإمساك بسويفت ورفع مداره قبل أن يهبط كثيرًا"), v: "Demonstration" }] },
      { id: "years", n: B("Keep Swift’s science going for years", "إبقاء علم سويفت مستمرًا لسنوات"), d: B("Every extra year means hundreds more cosmic explosions caught.", "كل عام إضافي يعني رصد مئات الانفجارات الكونية الإضافية."), tags: ["boost"],
        req: [{ t: B("Raise the orbit high enough for years of extra life", "رفع المدار بما يكفي لسنوات إضافية من العمر"), v: "Analysis" }] }
    ],
    secondary: [
      { id: "capdemo", n: B("Prove robots can grab old satellites", "إثبات أن الروبوتات تستطيع الإمساك بالأقمار القديمة"), d: B("Swift was never built to be serviced. Doing it opens a new era.", "سويفت لم يُصمم ليُصلَح. فعل ذلك يفتح عصرًا جديدًا."), tags: ["capture"],
        req: [{ t: B("Grab a satellite with no docking hardware", "الإمساك بقمر لا يملك أدوات التحام"), v: "Demonstration" }] },
      { id: "inspect", n: B("Photograph Swift up close", "تصوير سويفت عن قرب"), d: B("Check its health after 21 years in space.", "فحص حالته بعد 21 عامًا في الفضاء."), tags: ["inspect"],
        req: [{ t: B("Take detailed pictures of Swift from close range", "التقاط صور مفصلة لسويفت من مسافة قريبة"), v: "Inspection" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Rescue tools", "أدوات الإنقاذ"), short: B("Tools", "الأدوات"), tab: "🦾",
      opts: [
        { id: "arms3", ic: "wheelsplus", n: B("Three robotic arms", "ثلاث أذرع روبوتية"), m: 60, p: 40, cost: 5, data: 0.5, sci: 50, tags: ["boost", "capture"], hist: true, d: B("Grip Swift firmly from three sides.", "تمسك سويفت بإحكام من ثلاث جهات.") },
        { id: "arm1", ic: "magnet", n: B("One arm + soft clamp", "ذراع واحدة + ملقط لين"), m: 35, p: 25, cost: 3, data: 0.4, sci: 35, tags: ["boost", "capture"], d: B("Lighter and simpler, but a wobblier grip.", "أخف وأبسط، لكن الإمساك أقل ثباتًا.") },
        { id: "lidar", ic: "dishtwo", n: B("Laser range sensor (lidar)", "حساس مسافة ليزري (ليدار)"), m: 12, p: 30, cost: 2, mo: 1, data: 0.3, sci: 10, tags: ["boost", "inspect"], d: B("Measures distance exactly, even with the Sun in its eyes.", "يقيس المسافة بدقة حتى والشمس في عينيه.") },
        { id: "cam", ic: "camera", n: B("Inspection cameras", "كاميرات الفحص"), m: 5, p: 10, cost: 0.5, data: 2, sci: 15, tags: ["inspect"], hist: true, d: B("Detailed pictures of Swift’s condition.", "صور مفصلة لحالة سويفت.") }
      ] },
    { id: "adcs", kind: "adcs", phase: "craft", role: "eng", label: B("Attitude control (pointing)", "التحكم بالاتجاه (التوجيه)"), short: B("Pointing", "التوجيه"), tab: "🧭",
      hint: B("This is what failed on the real LINK.", "هذا ما فشل في «لينك» الحقيقية."),
      opts: [
        { id: "acs_new", ic: "wheels", icp: 4, n: B("New lightweight system", "نظام جديد خفيف"), m: 15, p: 20, cost: 1.5, hist: true, flags: { acsNew: true }, d: B("Fast to build and cheap. Never flown before.", "سريع البناء ورخيص. لم يطِر من قبل.") },
        { id: "acs_proven", ic: "wheels", icp: 6, n: B("Flight-proven system", "نظام مجرّب في الطيران"), m: 30, p: 35, cost: 4, mo: 2.5, d: B("Has flown on other satellites. Heavier, pricier, slower to get.", "طار على أقمار أخرى. أثقل وأغلى وأبطأ في الحصول عليه.") }
      ] },
    { id: "prop", kind: "prop", phase: "craft", role: "eng", label: B("Boost engine", "محرك الرفع"), short: B("Engine", "المحرك"), tab: "🔥",
      opts: [
        { id: "chem", ic: "tank", icp: true, n: B("Chemical thrusters", "دافعات كيميائية"), m: 80, cost: 2, d: B("Strong push: raises Swift in days.", "دفع قوي: يرفع سويفت خلال أيام.") },
        { id: "elec", ic: "tank", n: B("Electric thrusters", "دافعات كهربائية"), m: 40, p: 60, cost: 3, flags: { electric: true }, d: B("Very efficient but gentle: the boost takes months.", "كفاءة عالية لكنها لطيفة: الرفع يستغرق أشهرًا.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Solar power", "الطاقة الشمسية"), short: B("Solar", "طاقة"), tab: "☀️",
      opts: [
        { id: "arr400", ic: "wing2", n: B("Solar wings, 400 W", "أجنحة شمسية 400 واط"), m: 15, gen: 400, cost: 1, flags: { wings: 2 }, d: B("Enough for a light setup.", "تكفي لتجهيز خفيف.") },
        { id: "arr700", ic: "arraybig", n: B("Big solar wings, 700 W", "أجنحة شمسية كبيرة 700 واط"), m: 25, gen: 700, cost: 1.8, flags: { wings: 2, big: true }, d: B("Room for electric thrusters and lidar.", "تكفي للدافعات الكهربائية والليدار.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      opts: [
        { id: "b500", ic: "battery", icp: 2, n: B("Battery, 500 Wh", "بطارية 500 واط·ساعة"), m: 6, wh: 500, cost: 0.3, d: B("Light.", "خفيفة.") },
        { id: "b900", ic: "battery", icp: 4, n: B("Battery, 900 Wh", "بطارية 900 واط·ساعة"), m: 10, wh: 900, cost: 0.5, d: B("For power-hungry setups.", "للتجهيزات كثيرة الاستهلاك.") }
      ] },
    { id: "cpu", kind: "cpu", phase: "craft", role: "eng", label: B("Robot brain", "العقل الإلكتروني"), short: B("Brain", "عقل"), tab: "🧠", opts: [
        { id: "cpu1", ic: "chip", n: B("One flight computer", "حاسوب طيران واحد"), m: 3, p: 10, cost: 0.5, d: B("Light and simple.", "خفيف وبسيط.") },
        { id: "cpu2", ic: "chip2", n: B("Two computers (backup)", "حاسوبان (مع احتياطي)"), m: 5, p: 15, cost: 1, flags: { robust: true }, d: B("A backup takes over after a fault.", "الاحتياطي يتولى القيادة عند العطل.") }
      ] },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio", "الراديو"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "sband", ic: "antenna", n: B("S-band radio", "راديو S"), m: 3, p: 15, cost: 0.4, rate: 3, d: B("Commands and status.", "أوامر وحالة المركبة.") },
        { id: "xband", ic: "dish", icp: 0, n: B("Fast X-band radio", "راديو X سريع"), m: 5, p: 25, cost: 0.8, rate: 12, d: B("Room for video of the approach.", "يكفي لفيديو الاقتراب.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Launch orbit", "مدار الإطلاق"),
      opts: [
        { id: "plane", ic: "iss400", n: B("Straight into Swift’s orbit plane (≈20.6°)", "مباشرة في مستوى مدار سويفت (≈20.6°)"), cost: 0, hist: true, d: B("No plane-change needed: meet Swift sooner.", "دون تغيير مستوى المدار: تلتقي بسويفت أسرع.") },
        { id: "generic", ic: "sso550", n: B("Any low orbit, then chase", "أي مدار منخفض ثم المطاردة"), cost: 0, mo: -0.5, life: 0.8, d: B("Easier rocket booking, but weeks of chasing and lots of fuel.", "حجز صاروخ أسهل، لكن أسابيع من المطاردة ووقود كثير.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Rocket", "الصاروخ"),
      opts: [
        { id: "pegasus", ic: "taurus", n: B("Pegasus XL (air-launched)", "بيغاسوس XL (يُطلق من طائرة)"), cap: 450, cost: 6, hist: true, orbits: ["plane", "generic"], d: B("Dropped from a jet: can launch toward exactly the right orbit.", "يُلقى من طائرة نفاثة: يمكنه الإطلاق نحو المدار الصحيح تمامًا.") },
        { id: "ride", ic: "ride", n: B("Shared ride", "رحلة مشتركة"), cap: 400, cost: 2, mo: 2, orbits: ["generic"], d: B("Cheap, but you wait for a slot while Swift sinks.", "رخيص، لكنك تنتظر موعدًا بينما يهبط سويفت.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      hint: B("Under a year to build means every test steals time from a falling telescope.", "أقل من عام للبناء يعني أن كل اختبار يسرق وقتًا من تلسكوب يسقط."),
      opts: [
        { id: "hil", ic: "fault", n: B("Pointing test with real hardware in the loop", "اختبار التوجيه بالأجهزة الحقيقية"), cost: 1, mo: 1, d: B("Run the real sensors, wheels and software together on the ground before trusting them in space.", "تشغيل الحساسات والعجلات والبرامج الحقيقية معًا على الأرض قبل الوثوق بها في الفضاء.") },
        { id: "grab", ic: "wheelsplus", n: B("Capture rehearsal on a Swift mock-up", "تجربة إمساك على نموذج لسويفت"), cost: 0.8, mo: 0.75, d: B("Practise the grab on a full-size model.", "التدرب على الإمساك على نموذج بالحجم الحقيقي.") },
        T_TVAC(0.6, 0.75), T_VIB(0.5, 0.5),
        { id: "prox", ic: "cal", n: B("Close-approach simulation in sunlight", "محاكاة الاقتراب تحت ضوء الشمس"), cost: 0.4, mo: 0.5, d: B("Check the cameras still work with the Sun behind Swift.", "التأكد أن الكاميرات تعمل والشمس خلف سويفت.") }
      ] }
  ],
  history: {
    rows: [
      [B("Attitude control", "التحكم بالاتجاه"), B("New system; control problems after launch", "نظام جديد؛ مشاكل تحكم بعد الإطلاق"), "adcs"],
      [B("Pointing test with real hardware", "اختبار التوجيه بالأجهزة الحقيقية"), B("Problem not caught before launch", "المشكلة لم تُكتشف قبل الإطلاق"), "hil"],
      [B("Rocket", "الصاروخ"), B("Pegasus XL, 3 July 2026", "بيغاسوس XL، 3 يوليو 2026"), "launcher"],
      [B("Rescue tools", "أدوات الإنقاذ"), B("Three robotic arms", "ثلاث أذرع روبوتية"), "instr"]
    ],
    story: B("Swift launched in 2004 to about 600 km and hunted gamma-ray bursts for over 21 years. Unusually strong solar activity made it sink faster than expected, so in September 2025 NASA awarded Katalyst Space $30 million to build LINK, a robot that would grab Swift with three arms and boost it higher, in under a year. LINK launched on a Pegasus XL on 3 July 2026, but soon developed attitude-control problems and spun at about 9° per second. On 19 August NASA and Katalyst announced that LINK would not capture Swift; it flew within 12–15 km as a demonstration instead. Swift collected its last science in October 2026 before falling back to Earth.",
      "انطلق سويفت عام 2004 إلى نحو 600 كم ورصد انفجارات أشعة غاما لأكثر من 21 عامًا. جعله نشاط شمسي قوي على غير العادة يهبط أسرع من المتوقع، فمنحت ناسا شركة «كاتاليست» في سبتمبر 2025 مبلغ 30 مليون دولار لبناء «لينك»، روبوت يمسك سويفت بثلاث أذرع ويرفعه، في أقل من عام. انطلقت «لينك» على صاروخ بيغاسوس XL في 3 يوليو 2026، لكنها سرعان ما واجهت مشاكل في التحكم بالاتجاه ودارت بنحو 9 درجات في الثانية. وفي 19 أغسطس أعلنت ناسا و«كاتاليست» أن «لينك» لن تمسك سويفت، فاقتربت منه حتى 12–15 كم كعرض تقني بدلًا من ذلك. جمع سويفت آخر بياناته العلمية في أكتوبر 2026 قبل أن يسقط عائدًا إلى الأرض."),
    lesson: B("In a race against time, test the basics first: a spacecraft that can’t point can’t do anything else.", "في السباق مع الزمن، اختبر الأساسيات أولًا: المركبة التي لا تستطيع التوجه لا تستطيع فعل أي شيء آخر."),
    source: B("NASA statement on the Swift Boost mission (19 Aug 2026); NASA Swift mission updates (Oct 2026).", "بيان ناسا حول مهمة رفع سويفت (19 أغسطس 2026)؛ تحديثات ناسا عن سويفت (أكتوبر 2026).")
  }
}
);

/* Which cases each level shows. The Engineer level has its own three real failures. */
const LEVEL_CASES = {
  cadet: ["mco", "oco", "kepler", "nile"],
  engineer: ["vanguard", "mco", "swift", "nile"],
  director: ["mco", "oco", "kepler", "nile"]
};
const TAG_EXTRA = { beacon: B("tracking signal", "إشارة التتبع"), solar: B("solar power test", "اختبار الطاقة الشمسية"), temp: B("temperatures", "درجات الحرارة"), boost: B("boost Swift", "رفع سويفت"), capture: B("robotic capture", "الإمساك الروبوتي"), inspect: B("close-up photos", "صور عن قرب") };
Object.assign(TAGNAME, TAG_EXTRA);

/* ---------- flight logic for the two new cases ---------- */
LOGIC.vanguard = {
  timeline(x) {
    const T = [];
    const highP = !!x.flag("highP"), lox = !!x.flag("loxLead"), wired = !!x.flag("wired"), ign = x.has("ignite"), leak = x.has("leak"), telem = x.has("telem");
    const inspected = !!x.flag("inspected");
    // The 1957 failure: low start pressure + rough start, and possibly a loose connection, not caught on the test stand
    const rough = !highP && !lox;
    const loose = !wired && !leak && !inspected;
    if (ign && rough) T.push({ t: 0.004, tone: "good", expr: "party", txt: B("Engine start test: a pressure spike at ignition burns the test injector! Engineers raise the tank pressure before launch. 🎉", "اختبار تشغيل المحرك: قفزة ضغط عند الإشعال أحرقت حاقن الاختبار! رفع المهندسون ضغط الخزان قبل الإطلاق. 🎉"), run: s => { s.extra.fixedStart = true; } });
    if ((leak || inspected) && !wired) T.push({ t: 0.006, tone: "good", txt: B("Inspection finds a fuel connection that isn’t fully tight. Fixed.", "الفحص وجد وصلة وقود غير محكمة تمامًا. أُصلحت.") });
    T.push({ t: 0.01, tone: "good", txt: B("6 December 1957, Cape Canaveral. Ignition!", "6 ديسمبر 1957، كيب كانافيرال. إشعال!") });
    const fails = (rough && !ign) || (loose && !highP && !ign);
    if (fails) {
      T.push({ t: 0.02, tone: "bad", expr: "shocked", txt: B("T+1 s: a pressure surge hits the engine. A fuel line bursts.", "بعد ثانية: موجة ضغط تضرب المحرك. خط وقود ينفجر.") });
      T.push({ t: 0.03, run: s => s.lose(0.03, telem
        ? B("T+2 s: thrust lost at about one metre up. The rocket falls back and explodes. Your extra sensors recorded everything: the cause is clear this time.", "بعد ثانيتين: ضاع الدفع على ارتفاع متر تقريبًا. سقط الصاروخ وانفجر. حساساتك الإضافية سجّلت كل شيء: السبب واضح هذه المرة.")
        : B("T+2 s: thrust lost at about one metre up. The rocket falls back and explodes on the pad. The satellite rolls away, still beeping.", "بعد ثانيتين: ضاع الدفع على ارتفاع متر تقريبًا. سقط الصاروخ وانفجر على المنصة، والقمر يتدحرج بعيدًا وما زال يُصدر إشارته.")) });
      return T;
    }
    T.push({ t: 0.03, tone: "good", expr: "party", txt: B("Smooth start! The rocket climbs into the sky. 🚀", "تشغيل سلس! الصاروخ يصعد إلى السماء. 🚀") });
    if (!x.has("vib")) T.push({ t: 0.06, tone: "warn", txt: B("Launch shaking loosens a wire in the satellite. One sensor goes quiet.", "اهتزاز الإطلاق فكّ سلكًا في القمر. توقّف أحد الحساسات."), run: s => { s.sciMult *= 0.85; } });
    T.push({ t: 0.08, tone: "good", txt: B("Second and third stages fire. Orbit reached!", "اشتعلت المرحلتان الثانية والثالثة. وصلنا إلى المدار!") });
    if (!x.has("radio")) T.push({ t: 0.1, tone: "warn", txt: B("The beacon is weaker than expected. Some stations struggle to hear it.", "المنارة أضعف من المتوقع. بعض المحطات تجد صعوبة في سماعها."), run: s => { s.sciMult *= 0.9; } });
    else T.push({ t: 0.1, tone: "good", txt: B("Beep… beep… Minitrack stations hear the satellite loud and clear!", "بيب… بيب… محطات ميني تراك تسمع القمر بوضوح!") });
    T.push(evStorm(0.3, x));
    if (x.pick("power") === "merc") T.push({ t: 0.35, tone: "warn", txt: B("The mercury batteries run flat. The satellite falls silent after a few weeks.", "نفدت البطاريات الزئبقية. صمت القمر بعد أسابيع قليلة.") });
    else T.push({ t: 0.35, tone: "good", txt: B("The solar cells keep the radio alive month after month!", "الخلايا الشمسية تُبقي الراديو حيًا شهرًا بعد شهر!") });
    T.push(evOps(0.55, x));
    if (x.goal("shape")) T.push({ t: 0.7, tone: "good", txt: B("Tracking the orbit shows the Earth is slightly pear-shaped!", "تتبّع المدار يُظهر أن الأرض تشبه الكمثرى قليلًا!") });
    if (x.pick("orbit") === "low") T.push({ t: 0.8, txt: B("The low orbit decays and the satellite burns up after a few weeks.", "المدار المنخفض يتآكل ويحترق القمر بعد أسابيع قليلة.") });
    T.push({ t: 1, tone: "good", txt: B("America’s first satellite is a success. Your orbit can last for centuries.", "أول قمر أمريكي ينجح. مدارك قد يدوم قرونًا.") });
    return T;
  },
  keys(x) {
    const rough = !x.flag("highP") && !x.flag("loxLead");
    return [
      { ok: !rough || x.has("ignite"), pts: 30, t: B("Made the engine start safe", "جعلت تشغيل المحرك آمنًا"), why: B("Higher tank pressure, oxygen-first start, or a start test that catches the spike.", "ضغط خزان أعلى، أو بدء الأكسجين أولًا، أو اختبار تشغيل يكتشف القفزة.") },
      { ok: !!x.flag("wired") || x.has("leak") || !!x.flag("inspected"), pts: 15, t: B("Checked the fuel connections", "فحصت وصلات الوقود"), why: B("A loose connection can drop the pressure at the worst moment.", "الوصلة غير المحكمة قد تُسقط الضغط في أسوأ لحظة.") },
      { ok: x.has("telem"), pts: 10, t: B("Fitted enough sensors to learn from failure", "ركّبت حساسات كافية للتعلم من الفشل"), why: B("In 1957 two seconds of thin data left the cause uncertain.", "في 1957 تركت ثانيتان من البيانات الشحيحة السبب غير مؤكد.") },
      { ok: x.pick("power") === "mercsun", pts: 15, t: B("Added solar cells", "أضفت خلايا شمسية"), why: B("Vanguard 1’s solar radio kept working for years.", "راديو فانغارد 1 الشمسي استمر لسنوات.") },
      { ok: x.pick("orbit") === "high", pts: 10, t: B("Chose a long-lived orbit", "اخترت مدارًا طويل العمر"), why: B("Vanguard 1 is still in orbit today.", "فانغارد 1 ما زال في المدار حتى اليوم.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every instrument serves your question", "كل جهاز يخدم سؤالك"), why: B("A tiny satellite has no room for extras.", "القمر الصغير لا يتسع للإضافات.") },
      { ok: x.has("vib") && x.has("radio"), pts: 10, t: B("Shook and checked the satellite", "هززت القمر وفحصته"), why: B("Cheap tests for a tiny satellite.", "اختبارات رخيصة لقمر صغير.") }
    ];
  }
};

LOGIC.swift = {
  timeline(x) {
    const T = [];
    const acsNew = !!x.flag("acsNew"), hil = x.has("hil"), grab = x.has("grab"), prox = x.has("prox");
    const sel = x.pick("instr"), arms3 = sel.includes("arms3"), arm1 = sel.includes("arm1"), lidar = sel.includes("lidar");
    const electric = !!x.flag("electric"), late = x.c.months > deadlineOf(x.M) - 1, chase = x.pick("orbit") === "generic";
    if (acsNew && hil) T.push({ t: 0.004, tone: "good", expr: "party", txt: B("Hardware-in-the-loop test: the new pointing system fights itself and starts a spin! Software fixed before launch. 🎉", "اختبار الأجهزة الحقيقية: نظام التوجيه الجديد يتعارض مع نفسه ويبدأ دورانًا! أُصلح البرنامج قبل الإطلاق. 🎉") });
    T.push({ t: 0.02, tone: "good", txt: B(`Launch on the ${L(x.opt("launcher").n)}!`, `الإطلاق على ${L(x.opt("launcher").n)}!`) });
    if (!x.has("vib")) T.push(shake(0.05));
    if (acsNew && !hil) {
      T.push({ t: 0.08, tone: "bad", expr: "shocked", txt: B("Weeks after launch LINK starts spinning at about 9° per second!", "بعد أسابيع من الإطلاق تبدأ «لينك» بالدوران بنحو 9 درجات في الثانية!") });
      T.push({ t: 0.16, tone: "warn", expr: "worried", txt: B("Thruster burns slow the spin, but it keeps coming back. Swift sinks lower every day.", "حرق الدافعات يُبطئ الدوران، لكنه يعود. وسويفت يهبط أكثر كل يوم."), run: s => { s.down += 40; } });
      T.push({ t: 0.22, decision: { id: "spin", role: "eng", label: B("LINK can’t hold steady!", "«لينك» لا تستطيع الثبات!"), expr: "think",
        q: B("Swift is falling and LINK still can’t point reliably. What does the team do?", "سويفت يسقط و«لينك» ما زالت لا تستطيع التوجه بثبات. ماذا يفعل الفريق؟"),
        opts: [
          { t: B("Try to grab Swift anyway", "نحاول الإمساك بسويفت رغم ذلك"), good: false, why: B("Grabbing a 1.5-tonne telescope while spinning risks a collision that destroys both.", "الإمساك بتلسكوب وزنه طن ونصف أثناء الدوران يخاطر باصطدام يدمّر الاثنين."),
            apply: s => { s.lose(s.p + 0.02, B("LINK bumps Swift during a wobbly approach. Both are damaged. Swift falls back to Earth.", "«لينك» تصطدم بسويفت أثناء اقتراب مهتز. تضرر الاثنان، وسقط سويفت عائدًا إلى الأرض.")); } },
          { t: B("Turn it into a demonstration: fly close and photograph Swift", "نحوّلها إلى عرض تقني: نقترب ونصوّر سويفت"), good: true, why: B("What NASA really did: no rescue, but safe lessons and close-up photos for future missions.", "هذا ما فعلته ناسا فعلًا: لا إنقاذ، لكن دروسًا آمنة وصورًا قريبة للمهمات القادمة."),
            apply: s => { s.outcome = "partial"; s.lifeMult *= 0.25; s.extra.demo = true; s.say(B("LINK approaches to about 12–15 km and photographs Swift. Swift will fall, but the lessons stay.", "تقترب «لينك» حتى 12–15 كم وتصوّر سويفت. سيسقط سويفت، لكن الدروس باقية."), "warn"); } }
        ] } });
      T.push({ t: 0.6, tone: "warn", txt: s => s.extra.demo ? B("October: Swift takes its last science data and falls silent.", "أكتوبر: يجمع سويفت آخر بياناته العلمية ثم يصمت.") : null });
      T.push({ t: 1, txt: s => s.extra.demo ? B("Swift re-enters the atmosphere. Mission over.", "يعود سويفت إلى الغلاف الجوي. انتهت المهمة.") : null, tone: "warn" });
      return T;
    }
    T.push({ t: 0.1, tone: "good", txt: B("LINK holds perfectly steady. Pointing system healthy!", "«لينك» ثابتة تمامًا. نظام التوجيه سليم!") });
    if (chase) T.push({ t: 0.16, tone: "warn", txt: B("Weeks of chasing to match Swift’s orbit plane. Swift sinks lower meanwhile.", "أسابيع من المطاردة لمطابقة مستوى مدار سويفت، وسويفت يهبط في الأثناء."), run: s => { s.down += 25; } });
    if (late) T.push({ t: 0.2, tone: "warn", expr: "worried", txt: B("The late launch means Swift is already very low and the air drag is strong.", "الإطلاق المتأخر يعني أن سويفت منخفض جدًا بالفعل ومقاومة الهواء قوية."), run: s => { s.sciMult *= 0.85; } });
    T.push(evStorm(0.26, x));
    if (!lidar && !prox) T.push({ t: 0.34, decision: { id: "glare", role: "nav", label: B("Sun glare!", "وهج الشمس!"), expr: "worried",
      q: B("On final approach the Sun is right behind Swift and the cameras are blinded.", "في الاقتراب الأخير الشمس خلف سويفت مباشرة والكاميرات لا ترى."),
      opts: [
        { t: B("Back off and wait for better lighting next orbit", "نبتعد وننتظر إضاءة أفضل في الدورة القادمة"), good: true, why: B("Patience costs 90 minutes. A collision costs everything.", "الصبر يكلف 90 دقيقة. الاصطدام يكلف كل شيء."), apply: s => { s.say(B("One orbit later the Sun is behind LINK. Clear view!", "بعد دورة واحدة صارت الشمس خلف «لينك». رؤية واضحة!"), "good"); } },
        { t: B("Push on blind", "نتقدم دون رؤية"), good: false, why: B("Approaching without seeing the target is how collisions happen.", "الاقتراب دون رؤية الهدف هو كيف تحدث الاصطدامات."), apply: s => { s.sciMult *= 0.8; s.down += 10; s.say(B("Too close, too fast! Emergency abort. A second approach takes ten days.", "اقتراب قريب وسريع جدًا! إلغاء طارئ، والمحاولة الثانية تستغرق عشرة أيام."), "bad"); } }
      ] } });
    else T.push({ t: 0.34, tone: "good", txt: lidar ? B("The lidar measures the distance to Swift to the centimetre. Smooth approach.", "الليدار يقيس المسافة إلى سويفت بدقة السنتيمتر. اقتراب سلس.") : B("Rehearsed in simulation: the approach goes exactly as planned.", "تمت التجربة في المحاكاة: الاقتراب يسير كما خُطط تمامًا.") });
    if (arms3 && grab) T.push({ t: 0.45, tone: "good", expr: "party", txt: B("Three arms close around Swift. Captured on the first try! 🦾", "ثلاث أذرع تُطبق على سويفت. تم الإمساك من المحاولة الأولى! 🦾") });
    else T.push({ t: 0.45, decision: { id: "grab", role: "sci", label: B("The grab slipped!", "انزلقت القبضة!"), expr: "shocked",
      q: B("The first grab slips off Swift’s smooth surface. Try again?", "انزلقت القبضة الأولى عن سطح سويفت الأملس. نحاول مرة أخرى؟"),
      opts: [
        { t: B("Back off, re-plan and try again tomorrow", "نبتعد ونعيد التخطيط ونحاول غدًا"), good: true, why: B("A careful second attempt uses some fuel but keeps both spacecraft safe.", "المحاولة الثانية الحذرة تستهلك بعض الوقود لكنها تحافظ على المركبتين."), apply: s => { s.down += 3; s.sciMult *= arm1 ? 0.9 : 0.97; s.say(B("Second try: captured!", "المحاولة الثانية: تم الإمساك!"), "good", "party"); } },
        { t: B("Grab again right away", "نمسك فورًا مرة أخرى"), good: false, why: B("Rushing a grab on a drifting telescope risks pushing it into a tumble.", "التسرع في الإمساك بتلسكوب منجرف قد يدفعه إلى التدحرج."), apply: s => { s.sciMult *= 0.75; s.lifeMult *= 0.8; s.say(B("Captured, but the bump set Swift tumbling. Days of work to steady it.", "تم الإمساك، لكن الاصطدام جعل سويفت يتدحرج. أيام من العمل لتثبيته."), "warn"); s.down += 12; } }
      ] } });
    T.push({ t: 0.55, tone: "good", txt: electric ? B("Electric thrusters push gently. Swift climbs slowly for months.", "الدافعات الكهربائية تدفع بلطف. سويفت يصعد ببطء لأشهر.") : B("Chemical thrusters fire. Swift climbs back towards 600 km in days!", "الدافعات الكيميائية تعمل. سويفت يصعد نحو 600 كم خلال أيام!"), run: s => { if (electric && late) { s.sciMult *= 0.8; s.say(B("Too slow for such a late start: drag steals part of the gain.", "بطيئة جدًا لبداية متأخرة كهذه: المقاومة تسرق جزءًا من المكسب."), "warn"); } } });
    T.push(evOps(0.7, x));
    if (x.goal("inspect") && sel.includes("cam")) T.push({ t: 0.8, tone: "good", txt: B("Close-up photos show Swift in good shape after 21 years.", "الصور القريبة تُظهر سويفت بحالة جيدة بعد 21 عامًا.") });
    T.push({ t: 1, tone: "good", expr: "party", txt: B("Swift is saved! Years more of catching cosmic explosions. 🌟", "تم إنقاذ سويفت! سنوات أخرى من رصد الانفجارات الكونية. 🌟") });
    return T;
  },
  keys(x, sim) {
    const sel = x.pick("instr");
    return [
      { ok: !x.flag("acsNew") || x.has("hil"), pts: 30, t: B("Proved the pointing system before launch", "أثبتّ نظام التوجيه قبل الإطلاق"), why: B("A flight-proven system, or a hardware-in-the-loop test of the new one.", "نظام مجرّب في الطيران، أو اختبار النظام الجديد بالأجهزة الحقيقية.") },
      { ok: x.c.months <= deadlineOf(x.M) - 1, pts: 15, t: B("Launched with time to spare", "أطلقت مع وقت احتياطي"), why: B("Every week of delay, Swift sank lower.", "كل أسبوع تأخير كان سويفت يهبط أكثر.") },
      { ok: x.has("grab") && sel.includes("arms3"), pts: 15, t: B("Rehearsed a firm three-arm capture", "تدربت على إمساك ثابت بثلاث أذرع"), why: B("Swift has no handles: practise on a mock-up first.", "سويفت لا يملك مقابض: تدرّب على نموذج أولًا.") },
      { ok: sel.includes("lidar") || x.has("prox"), pts: 10, t: B("Prepared for Sun glare on approach", "استعددت لوهج الشمس عند الاقتراب"), why: B("Lidar or a sunlight simulation keeps the final metres safe.", "الليدار أو محاكاة ضوء الشمس تحمي الأمتار الأخيرة.") },
      { ok: x.pick("orbit") === "plane", pts: 10, t: B("Launched straight into Swift’s orbit plane", "أطلقت مباشرة في مستوى مدار سويفت"), why: B("No weeks of chasing while Swift sinks.", "دون أسابيع من المطاردة بينما يهبط سويفت.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every tool serves your goals", "كل أداة تخدم أهدافك"), why: B("Extra mass means a heavier, slower rescue.", "الوزن الزائد يعني إنقاذًا أثقل وأبطأ.") },
      { ok: x.has("tvac") && x.has("vib"), pts: 10, t: B("Ran the space and shake tests", "أجريت اختبارَي الفضاء والاهتزاز"), why: B("The real LINK passed thermal-vacuum testing at NASA Goddard.", "«لينك» الحقيقية اجتازت اختبار الفراغ الحراري في مركز غودارد.") }
    ];
  }
};
