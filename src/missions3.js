/* ===================== SECOND CHANCE — Cadet stories: Lunar Sprout & Rover Ruby =====================
   Made-up missions for younger players. The stories are invented; every lesson comes from real NASA experience. */
MISSIONS.push(
/* ----------------------------- Lunar Sprout ----------------------------- */
{
  id: "sprout", no: 7, story_only: true, title: B("Lunar Sprout", "برعم القمر"), years: B("A made-up story · 2031", "قصة خيالية · 2031"), stamp: B("FROZEN", "تجمّد"),
  scene: "moon", craft: "lander", badge: { name: B("Moon Gardener", "بستاني القمر"), color: "#3DDBA4", glyph: "🌱" },
  teaser: B("A tiny greenhouse grew the first plant on the Moon… until the long, freezing lunar night came.", "دفيئة صغيرة أنبتت أول نبتة على القمر… حتى جاء ليل القمر الطويل المتجمد."),
  env: { budget: 40, deadline: 14, base: 9, eclipseH: 2, dod: 0.5, solar: 1, days: 90, money: 0, mass: 0, refSci: 70 },
  critical: ["battery", "power"],
  criticalWhy: B("A night on the Moon lasts about two Earth weeks. No sunlight, and terribly cold.", "الليل على القمر يدوم نحو أسبوعين أرضيين: بلا شمس، وبرد شديد."),
  fixed: { m: 80, p: 30, cost: 10 },
  story: {
    crash: [
      B("This is a made-up story, but the Moon is real! Our little lander touches down at sunrise.", "هذه قصة خيالية، لكن القمر حقيقي! مركبتنا الصغيرة تهبط مع شروق الشمس."),
      B("Inside its greenhouse a seed sprouts: the first plant ever grown on the Moon! 🌱", "داخل دفيئتها تنبت بذرة: أول نبتة تنمو على القمر على الإطلاق! 🌱"),
      B("Then the Sun sets… the night is so long and cold that everything freezes. The lander goes silent.", "ثم تغرب الشمس… والليل طويل وبارد جدًا فيتجمد كل شيء، وتصمت المركبة.")
    ],
    clues: [
      { ic: "tvac", t: B("Thermometer log", "سجل الحرارة"), body: B("Daytime: about +120°C.\nNight-time: about −130°C!\nHeater stopped on night 3.", "النهار: نحو +120 درجة.\nالليل: نحو −130 درجة!\nتوقف السخّان في الليلة الثالثة."), orbi: B("Brrr! The Moon is hotter than an oven by day and colder than a freezer by night.", "برررر! القمر أسخن من الفرن نهارًا وأبرد من الفريزر ليلًا."), expr: "shocked" },
      { ic: "clipboard", t: B("Moon calendar", "تقويم القمر"), body: B("One day on the Moon ≈ 2 Earth weeks of sunlight.\nThen ≈ 2 Earth weeks of night.", "يوم واحد على القمر ≈ أسبوعان من ضوء الشمس.\nثم ≈ أسبوعان من الليل."), orbi: B("Two whole weeks of dark! That’s a very long night.", "أسبوعان كاملان من الظلام! هذا ليل طويل جدًا."), expr: "worried" },
      { ic: "battery", t: B("Battery chart", "رسم البطارية"), body: B("Battery full at sunset.\nEmpty after 3 days of night.\nThe heater needs power all night long.", "البطارية ممتلئة عند الغروب.\nفارغة بعد 3 أيام من الليل.\nالسخّان يحتاج طاقة طوال الليل."), orbi: B("The battery ran out long before morning.", "نفدت البطارية قبل الصباح بكثير."), expr: "worried" },
      { ic: "clipboard", t: B("Designer’s note", "ملاحظة المصمم"), body: B("“We used a thin blanket to save weight.”", "«استخدمنا غطاء رقيقًا لنوفّر الوزن.»"), orbi: B("A thin blanket on the coldest night ever? Hmm…", "غطاء رقيق في أبرد ليلة؟ همم…"), expr: "think" },
      { ic: "globe", t: B("Map of the Moon’s south pole", "خريطة القطب الجنوبي للقمر"), body: B("Some mountain peaks near the pole get sunlight most of the time.", "بعض قمم الجبال قرب القطب يصلها ضوء الشمس معظم الوقت."), orbi: B("Places with almost no night! Interesting…", "أماكن بلا ليل تقريبًا! مثير…"), expr: "happy" }
    ],
    diagnose: [
      { q: B("Why did the plant freeze?", "لماذا تجمدت النبتة؟"), correct: 1, opts: [
        { t: B("It didn’t get enough water", "لم تحصل على ماء كافٍ"), no: B("Look at the thermometer and the battery clues.", "انظر إلى أدلة الحرارة والبطارية.") },
        { t: B("The long night was too cold, and the battery and blanket weren’t enough", "الليل الطويل كان باردًا جدًا، والبطارية والغطاء لم يكفيا") },
        { t: B("A meteor hit the greenhouse", "نيزك أصاب الدفيئة"), no: B("Nothing hit it. It got cold.", "لم يصبها شيء. لقد بردت.") } ],
        yes: B("Yes! The heater needed power for two weeks, but the battery lasted three days.", "نعم! السخّان احتاج طاقة لأسبوعين، لكن البطارية دامت ثلاثة أيام.") },
      { q: B("Which idea could keep the plant warm?", "أي فكرة يمكن أن تُبقي النبتة دافئة؟"), correct: 2, opts: [
        { t: B("Paint the lander black", "طلاء المركبة بالأسود"), no: B("Black paint doesn’t help when there’s no sunlight at all.", "الطلاء الأسود لا يفيد حين لا توجد شمس أصلًا.") },
        { t: B("Land on the Moon’s equator", "الهبوط على خط استواء القمر"), no: B("The equator still has two-week nights.", "خط الاستواء أيضًا لياليه أسبوعان.") },
        { t: B("A thick blanket, a bigger battery, or a sunny mountain peak", "غطاء سميك، أو بطارية أكبر، أو قمة جبل مشمسة") } ],
        yes: B("Great thinking, Moon gardener! Now let’s build it better.", "تفكير رائع يا بستاني القمر! هيا نبنيها أفضل.") }
    ]
  },
  hints: {
    objective: B("Do you want to grow a plant, or measure the Moon’s hot and cold?", "هل تريد إنبات نبتة، أم قياس حرارة القمر وبرودته؟"),
    build: B("Think about the long night: blanket, battery, heater. Watch the battery meter!", "فكّر في الليل الطويل: غطاء، وبطارية، وسخّان. راقب عدّاد البطارية!"),
    launch: B("Remember the map clue: some peaks almost never get dark.", "تذكّر دليل الخريطة: بعض القمم لا تُظلم تقريبًا."),
    tests: B("Which test makes a pretend Moon night on Earth?", "أي اختبار يصنع ليلًا قمريًا مزيفًا على الأرض؟")
  },
  goals: {
    primary: [
      { id: "grow", n: B("Grow the first plant on the Moon", "إنبات أول نبتة على القمر"), d: B("Will a seed sprout in Moon gravity?", "هل تنبت بذرة في جاذبية القمر؟"), tags: ["plant"], req: [{ t: B("Keep the greenhouse warm and lit for a whole lunar day and night", "إبقاء الدفيئة دافئة ومضاءة طوال يوم وليل قمريين"), v: "Test" }] },
      { id: "temps", n: B("Measure the Moon’s hot and cold", "قياس حرارة القمر وبرودته"), d: B("Record day and night temperatures.", "تسجيل حرارة النهار والليل."), tags: ["temp"], req: [{ t: B("Record temperatures every hour, day and night", "تسجيل الحرارة كل ساعة ليلًا ونهارًا"), v: "Test" }] }
    ],
    secondary: [
      { id: "photo", n: B("Send home a photo of the sprout", "إرسال صورة البرعم إلى الأرض"), d: B("Everyone wants to see it!", "الجميع يريد رؤيتها!"), tags: ["photo"], req: [{ t: B("Send a clear colour photo", "إرسال صورة ملونة واضحة"), v: "Demonstration" }] },
      { id: "ice", n: B("Look for ice in the soil", "البحث عن الجليد في التربة"), d: B("Water ice could help future astronauts.", "جليد الماء قد يساعد رواد الفضاء مستقبلًا."), tags: ["ice"], req: [{ t: B("Dig and test the soil", "حفر التربة وفحصها"), v: "Test" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Science kit", "عدة العلوم"), short: B("Science", "العلوم"), tab: "🔬",
      opts: [
        { id: "green", ic: "cells", n: B("Mini greenhouse with seeds", "دفيئة صغيرة مع بذور"), m: 6, p: 15, cost: 4, data: 0.2, sci: 40, tags: ["plant"], d: B("A sealed box with water, light and seeds.", "صندوق محكم فيه ماء وضوء وبذور.") },
        { id: "probe", ic: "tvac", n: B("Temperature probes", "مجسّات الحرارة"), m: 1, p: 2, cost: 1, data: 0.05, sci: 25, tags: ["temp"], d: B("Measure the ground and the air above it.", "تقيس الأرض والهواء فوقها.") },
        { id: "camera", ic: "camera", n: B("Colour camera", "كاميرا ملونة"), m: 2, p: 5, cost: 1.5, data: 1, sci: 15, tags: ["photo"], d: B("Pictures of the sprout and the Moon.", "صور للبرعم وللقمر.") },
        { id: "drill", ic: "audit", n: B("Little soil drill", "مثقاب تربة صغير"), m: 8, p: 20, cost: 3, data: 0.1, sci: 20, tags: ["ice"], d: B("Digs 20 cm down to look for ice.", "يحفر 20 سم بحثًا عن الجليد.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Solar panels", "الألواح الشمسية"), short: B("Solar", "طاقة"), tab: "☀️",
      opts: [
        { id: "sp_s", ic: "array", n: B("Small solar panel", "لوح شمسي صغير"), m: 6, gen: 80, cost: 1, flags: { wings: 1 }, hist: true, d: B("Enough in daylight.", "يكفي في النهار.") },
        { id: "sp_l", ic: "arraybig", n: B("Big solar panel", "لوح شمسي كبير"), m: 10, gen: 140, cost: 2, flags: { wings: 2, big: true }, d: B("Charges the battery faster.", "يشحن البطارية أسرع.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      opts: [
        { id: "bs", ic: "battery", icp: 1, n: B("Small battery", "بطارية صغيرة"), m: 5, wh: 300, cost: 1, hist: true, d: B("Lasts a few days of night.", "تدوم بضعة أيام من الليل.") },
        { id: "bl", ic: "battery", icp: 4, n: B("Giant battery", "بطارية عملاقة"), m: 25, wh: 1400, cost: 4, flags: { bigBat: true }, d: B("Heavy, but lasts much longer.", "ثقيلة، لكنها تدوم أطول بكثير.") }
      ] },
    { id: "thermal", kind: "thermal", phase: "craft", role: "eng", label: B("Blanket (insulation)", "الغطاء العازل"), short: B("Blanket", "الغطاء"), tab: "🧣",
      opts: [
        { id: "thin", ic: "clipboard", n: B("Thin blanket", "غطاء رقيق"), m: 1, cost: 0.2, hist: true, d: B("Light. Fine for daytime.", "خفيف. يكفي نهارًا.") },
        { id: "thick", ic: "chipshield", n: B("Thick space blanket", "غطاء فضائي سميك"), m: 6, cost: 1, flags: { thick: true }, d: B("Many shiny layers that keep the heat in.", "طبقات لامعة كثيرة تحبس الدفء.") }
      ] },
    { id: "heater", kind: "heater", phase: "craft", role: "eng", label: B("Heater", "السخّان"), short: B("Heater", "السخّان"), tab: "🔥",
      opts: [
        { id: "elec", ic: "fault", n: B("Electric heater", "سخّان كهربائي"), m: 1, p: 10, cost: 0.3, hist: true, d: B("Uses battery power to stay warm.", "يستخدم طاقة البطارية ليبقى دافئًا.") },
        { id: "pellet", ic: "tank", n: B("Warm heater pellets", "حبيبات تدفئة"), m: 3, cost: 6, mo: 2, flags: { pellets: true }, d: B("Tiny pellets that stay warm for years with no battery. Expensive and slow to get.", "حبيبات صغيرة تبقى دافئة لسنوات بلا بطارية. غالية وبطيئة التوفير.") }
      ] },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio", "الراديو"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "r_s", ic: "antenna", n: B("Small radio", "راديو صغير"), m: 2, p: 6, cost: 0.6, rate: 0.6, d: B("Enough for numbers.", "يكفي للأرقام.") },
        { id: "r_d", ic: "dish", icp: 0, n: B("Radio dish", "طبق راديو"), m: 4, p: 10, cost: 1.2, rate: 3, d: B("Fast enough for photos.", "سريع بما يكفي للصور.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Landing spot", "مكان الهبوط"),
      opts: [
        { id: "crater", ic: "leo", n: B("Edge of a deep crater", "حافة فوهة عميقة"), cost: 0, hist: true, d: B("Interesting rocks, but shadows come early.", "صخور مثيرة، لكن الظلال تأتي مبكرًا.") },
        { id: "plain", ic: "trail", n: B("Flat plain near the equator", "سهل منبسط قرب خط الاستواء"), cost: 0, d: B("Easy, safe landing. Two-week nights.", "هبوط سهل وآمن. ليالٍ لأسبوعين.") },
        { id: "peak", ic: "l2", n: B("Sunny peak near the south pole", "قمة مشمسة قرب القطب الجنوبي"), cost: 3, d: B("Sunlight most of the time! A trickier landing.", "شمس معظم الوقت! لكن الهبوط أصعب.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Ride to the Moon", "الرحلة إلى القمر"),
      opts: [
        { id: "cl", ic: "delta", n: B("Shared Moon lander ride", "رحلة مشتركة على مركبة هبوط"), cap: 150, cost: 8, hist: true, d: B("Your lander rides with others.", "مركبتك تسافر مع أخرى.") },
        { id: "big", ic: "atlas", n: B("Your own Moon rocket", "صاروخ قمري خاص بك"), cap: 400, cost: 18, d: B("Lots of room, lots of money.", "مساحة كبيرة ومال كثير.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      opts: [
        { id: "night", ic: "tvac", n: B("Pretend Moon-night test", "اختبار ليل القمر المزيف"), cost: 1.5, mo: 1, d: B("Keep the lander in a freezing vacuum chamber for two weeks.", "إبقاء المركبة في غرفة مفرغة متجمدة لأسبوعين.") },
        { id: "grow", ic: "cells", n: B("Plant growing test", "اختبار نمو النبات"), cost: 0.8, mo: 1, d: B("Grow seeds in the greenhouse on Earth first.", "إنبات البذور في الدفيئة على الأرض أولًا.") },
        { id: "land", ic: "cal", n: B("Landing camera test", "اختبار كاميرا الهبوط"), cost: 0.8, mo: 0.5, d: B("Teach the lander to spot and avoid big rocks.", "تعليم المركبة رؤية الصخور الكبيرة وتجنبها.") },
        T_VIB(0.5, 0.5)
      ] }
  ],
  history: {
    rows: [],
    story: B("Lunar Sprout is a made-up mission, but its problem is real. A day on the Moon lasts about two Earth weeks, and so does the night, when temperatures fall far below freezing. Many Moon landers have stopped working when their first lunar night arrived. Real missions survive the night with thick insulation, big batteries, tiny long-lasting heater units, or by landing on peaks near the poles that get sunlight most of the time.",
      "برعم القمر مهمة خيالية، لكن مشكلتها حقيقية. يدوم اليوم على القمر نحو أسبوعين أرضيين، وكذلك الليل الذي تنخفض فيه الحرارة كثيرًا تحت التجمد. توقفت مركبات هبوط قمرية كثيرة عن العمل حين جاء ليلها القمري الأول. والمهمات الحقيقية تنجو من الليل بعزل سميك، وبطاريات كبيرة، ووحدات تدفئة صغيرة طويلة العمر، أو بالهبوط على قمم قرب القطبين يصلها ضوء الشمس معظم الوقت."),
    lesson: B("Design for the hardest moment of the mission, not the easiest.", "صمّم لأصعب لحظة في المهمة، لا لأسهلها."),
    source: B("Made-up story. Moon facts: NASA Moon science pages.", "قصة خيالية. حقائق القمر: صفحات علوم القمر في ناسا.")
  }
},

/* ----------------------------- Rover Ruby ----------------------------- */
{
  id: "ruby", no: 8, story_only: true, title: B("Rover Ruby", "المركبة روبي"), years: B("A made-up story · 2033", "قصة خيالية · 2033"), stamp: B("ASLEEP", "نائمة"),
  scene: "marsground", craft: "rover", badge: { name: B("Dust Buster", "صائد الغبار"), color: "#F26B3A", glyph: "🌪️" },
  teaser: B("A happy solar rover explored Mars… until a giant dust storm covered its panels.", "مركبة شمسية سعيدة استكشفت المريخ… حتى غطّت عاصفة غبار عملاقة ألواحها."),
  env: { budget: 120, deadline: 26, base: 20, eclipseH: 1.5, dod: 0.5, solar: 0.43, days: 700, money: 0, mass: 0, refSci: 80 },
  critical: ["power"],
  criticalWhy: B("Mars gets less than half of Earth’s sunlight, and dust storms can block most of it for weeks.", "يصل المريخ أقل من نصف ضوء الشمس الذي يصل الأرض، وعواصف الغبار قد تحجب معظمه لأسابيع."),
  fixed: { m: 120, p: 40, cost: 30 },
  story: {
    crash: [
      B("This is a made-up story. Rover Ruby lands on Mars and drives off to explore. Vroom! 🚙", "هذه قصة خيالية. المركبة روبي تهبط على المريخ وتنطلق للاستكشاف. فرررم! 🚙"),
      B("Months later, a huge dust storm wraps the whole planet. The sky turns dark orange.", "بعد أشهر تلفّ عاصفة غبار ضخمة الكوكب كله، وتصبح السماء برتقالية داكنة."),
      B("Dust covers Ruby’s solar panels. Her power drops… and she falls asleep forever.", "الغبار يغطي ألواح روبي الشمسية، فتنخفض طاقتها… وتنام إلى الأبد.")
    ],
    clues: [
      { ic: "cal", t: B("Power chart", "رسم الطاقة"), body: B("Landing day: 100%.\nAfter 6 months: 70% (dusty panels).\nDuring the storm: 10%.", "يوم الهبوط: 100%.\nبعد 6 أشهر: 70% (ألواح مغبرة).\nأثناء العاصفة: 10%."), orbi: B("Power kept dropping, and then the storm took almost all of it.", "الطاقة ظلت تنخفض، ثم أخذت العاصفة كلها تقريبًا."), expr: "worried" },
      { ic: "camera", t: B("Selfie of Ruby", "صورة سيلفي لروبي"), body: B("The panels are covered with red dust.", "الألواح مغطاة بغبار أحمر."), orbi: B("Her panels look like a dusty car windscreen!", "ألواحها تبدو كزجاج سيارة مغبر!"), expr: "shocked" },
      { ic: "globe", t: B("Mars weather report", "نشرة طقس المريخ"), body: B("Dust-storm season. Sometimes storms cover the whole planet for weeks.", "موسم العواصف الترابية. أحيانًا تغطي العواصف الكوكب كله لأسابيع."), orbi: B("Storms everywhere, for weeks. That’s a lot of shade.", "عواصف في كل مكان لأسابيع. هذا ظل كثير."), expr: "worried" },
      { ic: "clipboard", t: B("Design plan", "خطة التصميم"), body: B("Panels: just big enough.\nCleaning: none.\nSpare power: almost zero.", "الألواح: كبيرة بالكاد بما يكفي.\nالتنظيف: لا يوجد.\nالطاقة الاحتياطية: صفر تقريبًا."), orbi: B("No spare power and no way to clean. Uh-oh.", "لا طاقة احتياطية ولا طريقة للتنظيف. أوه لا."), expr: "think" },
      { ic: "fault", t: B("Last message from Ruby", "آخر رسالة من روبي"), body: B("“My battery is low and it’s getting dark.”", "«بطاريتي منخفضة والظلام يزداد.»"), orbi: B("Oh, Ruby… Let’s make sure the next rover is ready for storms.", "آه يا روبي… لنتأكد أن المركبة القادمة جاهزة للعواصف."), expr: "worried" }
    ],
    diagnose: [
      { q: B("Why did Ruby fall asleep?", "لماذا نامت روبي؟"), correct: 0, opts: [
        { t: B("Dust blocked the sunlight on her panels and she had no spare power", "الغبار حجب الشمس عن ألواحها ولم تكن لديها طاقة احتياطية") },
        { t: B("Her wheels got stuck", "عجلاتها علقت"), no: B("Her wheels were fine. Check the power chart.", "عجلاتها كانت سليمة. راجع رسم الطاقة.") },
        { t: B("Martians unplugged her", "المريخيون فصلوا قابسها"), no: B("Ha! No Martians found yet. Look at the selfie.", "ها! لم نجد مريخيين بعد. انظر إلى السيلفي.") } ],
        yes: B("Exactly! A solar rover needs a plan for dust.", "بالضبط! المركبة الشمسية تحتاج خطة للغبار.") },
      { q: B("Which idea could help a rover survive dust storms?", "أي فكرة تساعد المركبة على النجاة من العواصف الترابية؟"), correct: 1, opts: [
        { t: B("Drive faster", "القيادة بسرعة أكبر"), no: B("Driving uses more power, not less!", "القيادة تستهلك طاقة أكثر لا أقل!") },
        { t: B("Bigger or tilting panels, nuclear power, or sleeping through the storm", "ألواح أكبر أو مائلة، أو طاقة نووية، أو النوم خلال العاصفة") },
        { t: B("Paint the panels red", "طلاء الألواح بالأحمر"), no: B("Paint would block even more light.", "الطلاء سيحجب ضوءًا أكثر.") } ],
        yes: B("Super! Time to build a storm-proof rover.", "رائع! حان وقت بناء مركبة لا تهزمها العواصف.") }
    ]
  },
  hints: {
    objective: B("What should Ruby discover: ancient water, or amazing pictures?", "ماذا يجب أن تكتشف روبي: ماءً قديمًا أم صورًا مذهلة؟"),
    build: B("Power is the big danger here. Keep lots of spare power for storms!", "الطاقة هي الخطر الأكبر هنا. احتفظ بطاقة احتياطية كثيرة للعواصف!"),
    launch: B("Some places on Mars are windy, and wind can blow dust off panels.", "بعض أماكن المريخ عاصفة، والرياح قد تنفض الغبار عن الألواح."),
    tests: B("Which test throws dust at the rover on Earth?", "أي اختبار يرمي الغبار على المركبة على الأرض؟")
  },
  goals: {
    primary: [
      { id: "water", n: B("Find signs of ancient water", "إيجاد آثار ماء قديم"), d: B("Rocks can tell us if rivers once flowed.", "الصخور تخبرنا إن كانت الأنهار قد جرت يومًا."), tags: ["rocks"], req: [{ t: B("Study rocks up close with a camera and a drill", "دراسة الصخور عن قرب بكاميرا ومثقاب"), v: "Test" }] },
      { id: "pano", n: B("Take a giant Mars panorama", "التقاط صورة بانورامية عملاقة للمريخ"), d: B("A 360° picture for everyone on Earth.", "صورة 360 درجة لكل الناس على الأرض."), tags: ["pano"], req: [{ t: B("Send a full 360° colour panorama", "إرسال بانوراما ملونة كاملة 360 درجة"), v: "Demonstration" }] }
    ],
    secondary: [
      { id: "devils", n: B("Watch dust devils", "مراقبة دوامات الغبار"), d: B("Little whirlwinds that dance across Mars.", "زوابع صغيرة ترقص عبر المريخ."), tags: ["weather"], req: [{ t: B("Record wind and dust every day", "تسجيل الرياح والغبار يوميًا"), v: "Analysis" }] },
      { id: "samples", n: B("Collect rock samples", "جمع عينات صخرية"), d: B("Store them for a future trip home.", "حفظها لرحلة عودة مستقبلية."), tags: ["rocks"], req: [{ t: B("Seal at least 5 samples in tubes", "حفظ 5 عينات على الأقل في أنابيب"), v: "Inspection" }] }
    ]
  },
  slots: [
    { id: "instr", kind: "instr", phase: "craft", role: "sci", multi: true, label: B("Science tools", "أدوات العلوم"), short: B("Science", "العلوم"), tab: "🔬",
      opts: [
        { id: "rockcam", ic: "bigcam", n: B("Close-up rock camera", "كاميرا الصخور المقرّبة"), m: 4, p: 10, cost: 5, data: 1, sci: 30, tags: ["rocks"], hist: true, d: B("Sees tiny grains in rocks.", "ترى الحبيبات الصغيرة في الصخور.") },
        { id: "drill", ic: "audit", n: B("Rock drill", "مثقاب الصخور"), m: 12, p: 40, cost: 8, data: 0.2, sci: 25, tags: ["rocks"], d: B("Powerful, but hungry for electricity.", "قوي، لكنه يحتاج كهرباء كثيرة.") },
        { id: "panocam", ic: "camera", n: B("Panorama mast camera", "كاميرا الصاري البانورامية"), m: 3, p: 8, cost: 4, data: 2, sci: 30, tags: ["pano"], hist: true, d: B("Spins around for 360° pictures.", "تدور لتلتقط صورًا 360 درجة.") },
        { id: "wx", ic: "radio", n: B("Weather station", "محطة طقس"), m: 2, p: 3, cost: 2, data: 0.1, sci: 15, tags: ["weather"], d: B("Wind, temperature and dust.", "الرياح والحرارة والغبار.") }
      ] },
    { id: "power", kind: "power", phase: "craft", role: "eng", label: B("Power", "الطاقة"), short: B("Power", "طاقة"), tab: "☀️",
      opts: [
        { id: "p_small", ic: "wing2", n: B("Just-enough solar panels", "ألواح شمسية بالكاد كافية"), m: 15, gen: 260, cost: 4, hist: true, flags: { wings: 2 }, d: B("Light and cheap. No spare power.", "خفيفة ورخيصة. بلا طاقة احتياطية.") },
        { id: "p_big", ic: "arraybig", n: B("Extra-big solar panels", "ألواح شمسية كبيرة جدًا"), m: 25, gen: 420, cost: 7, flags: { wings: 2, big: true }, d: B("Lots of spare power for dusty days.", "طاقة احتياطية كثيرة للأيام المغبرة.") },
        { id: "p_tilt", ic: "deploy", n: B("Tilting panels that shake off dust", "ألواح مائلة تنفض الغبار"), m: 22, gen: 320, cost: 9, flags: { wings: 2, tilt: true }, d: B("They tip and shake to slide the dust off.", "تميل وتهتز ليتساقط الغبار.") },
        { id: "p_rtg", ic: "tank", n: B("Nuclear power box", "صندوق طاقة نووية"), m: 45, gen: 250, cost: 30, mo: 4, flags: { rtg: true }, d: B("Works day and night, dust or no dust, like Curiosity. Very expensive.", "يعمل ليلًا ونهارًا مع الغبار أو بدونه مثل كيوريوسيتي. مكلف جدًا.") }
      ] },
    { id: "battery", kind: "battery", phase: "craft", role: "eng", label: B("Battery", "البطارية"), short: B("Battery", "بطارية"), tab: "🔋",
      opts: [
        { id: "b1", ic: "battery", icp: 2, n: B("Battery, 400 Wh", "بطارية 400 واط·ساعة"), m: 8, wh: 400, cost: 1.5, hist: true, d: B("For a normal night.", "لليل عادي.") },
        { id: "b2", ic: "battery", icp: 4, n: B("Battery, 800 Wh", "بطارية 800 واط·ساعة"), m: 14, wh: 800, cost: 2.5, d: B("Extra for stormy nights.", "إضافية لليالي العاصفة.") }
      ] },
    { id: "adcs", kind: "adcs", phase: "craft", role: "eng", label: B("Wheels", "العجلات"), short: B("Wheels", "عجلات"), tab: "🛞",
      opts: [
        { id: "w4", ic: "wheels", icp: 4, n: B("Four wheels", "أربع عجلات"), m: 10, p: 8, cost: 2, d: B("Simple and light.", "بسيطة وخفيفة.") },
        { id: "w6", ic: "wheels", icp: 6, n: B("Six wheels on rocking legs", "ست عجلات على أرجل متأرجحة"), m: 16, p: 10, cost: 4, hist: true, flags: { six: true }, d: B("Climbs over rocks like real Mars rovers.", "تتسلق الصخور مثل مركبات المريخ الحقيقية.") }
      ] },
    { id: "cpu", kind: "cpu", phase: "craft", role: "eng", label: B("Robot brain", "العقل الإلكتروني"), short: B("Brain", "عقل"), tab: "🧠", opts: CPU_OPTS(3, 5) },
    { id: "comms", kind: "comms", phase: "craft", role: "nav", label: B("Radio", "الراديو"), short: B("Radio", "راديو"), tab: "📡",
      opts: [
        { id: "dte", ic: "dish", icp: 1, n: B("Talk straight to Earth", "تواصل مباشر مع الأرض"), m: 6, p: 20, cost: 2, rate: 0.8, d: B("Slow but simple.", "بطيء لكنه بسيط.") },
        { id: "relay", ic: "antenna", n: B("Talk through a Mars orbiter", "تواصل عبر قمر يدور حول المريخ"), m: 3, p: 8, cost: 3, rate: 4, hist: true, d: B("Fast! Real rovers send most data this way.", "سريع! المركبات الحقيقية ترسل معظم بياناتها هكذا.") }
      ] },
    { id: "orbit", kind: "orbit", phase: "launch", role: "nav", label: B("Landing site", "موقع الهبوط"),
      opts: [
        { id: "crater", ic: "moi226", n: B("Dusty crater floor", "قاع فوهة مغبر"), cost: 0, hist: true, d: B("Safe and flat, but dust settles everywhere.", "آمن ومنبسط، لكن الغبار يستقر في كل مكان.") },
        { id: "delta", ic: "moi300", n: B("Old river delta", "دلتا نهر قديم"), cost: 2, sciM: 1.15, d: B("The best rocks for finding ancient water!", "أفضل الصخور لإيجاد الماء القديم!") },
        { id: "windy", ic: "moi400", n: B("Windy high plain", "سهل مرتفع عاصف"), cost: 1, flags: { windy: true }, d: B("Strong winds sometimes blow dust off the panels.", "رياح قوية تنفض أحيانًا الغبار عن الألواح.") }
      ] },
    { id: "launcher", kind: "launcher", phase: "launch", role: "pm", label: B("Rocket", "الصاروخ"),
      opts: [
        { id: "mid", ic: "delta9", n: B("Medium rocket", "صاروخ متوسط"), cap: 380, cost: 30, hist: true, d: B("Enough for a small rover.", "يكفي لمركبة صغيرة.") },
        { id: "heavy", ic: "atlas", n: B("Heavy rocket", "صاروخ ثقيل"), cap: 900, cost: 45, d: B("Room for a big rover.", "مساحة لمركبة كبيرة.") }
      ] },
    { id: "tests", kind: "tests", phase: "verify", role: "pm", multi: true, label: B("Tests before launch", "اختبارات قبل الإطلاق"),
      opts: [
        { id: "dust", ic: "audit", n: B("Dust storm chamber test", "اختبار غرفة العاصفة الترابية"), cost: 3, mo: 1, d: B("Blow fake Mars dust at the rover and measure the power.", "نفخ غبار مريخي مزيف على المركبة وقياس الطاقة.") },
        { id: "yard", ic: "wheeltest", n: B("Driving test in a Mars yard", "اختبار القيادة في ساحة مريخية"), cost: 2, mo: 1, d: B("Drive over rocks and sand on Earth.", "القيادة فوق الصخور والرمال على الأرض.") },
        T_TVAC(3, 1), T_VIB(2, 0.5)
      ] }
  ],
  history: {
    rows: [],
    story: B("Rover Ruby is a made-up mission, but her problem is real. NASA’s solar-powered Opportunity rover went silent in 2018 during a planet-wide dust storm, and the InSight lander ended in 2022 when dust covered its solar panels. Newer rovers like Curiosity and Perseverance use nuclear power, which works day and night and doesn’t care about dust.",
      "المركبة روبي مهمة خيالية، لكن مشكلتها حقيقية. صمتت مركبة ناسا «أوبورتيونيتي» العاملة بالطاقة الشمسية عام 2018 خلال عاصفة غبار غطّت الكوكب، وانتهت مهمة مسبار «إنسايت» عام 2022 عندما غطى الغبار ألواحه الشمسية. أما المركبات الأحدث مثل «كيوريوسيتي» و«بيرسيفيرانس» فتستخدم طاقة نووية تعمل ليلًا ونهارًا ولا يهمها الغبار."),
    lesson: B("Keep spare power, and plan for the weather of the world you’re visiting.", "احتفظ بطاقة احتياطية، وخطط لطقس العالم الذي تزوره."),
    source: B("Made-up story. Real facts: NASA Opportunity, InSight and Perseverance mission pages.", "قصة خيالية. حقائق حقيقية: صفحات مهمات ناسا أوبورتيونيتي وإنسايت وبيرسيفيرانس.")
  }
}
);
LEVEL_CASES.cadet = ["sprout", "ruby", "mco", "kepler", "oco", "nile"];
Object.assign(TAGNAME, { plant: B("plant growing", "إنبات النبات"), temp: B("temperatures", "درجات الحرارة"), photo: B("photos", "الصور"), ice: B("ice", "الجليد"), rocks: B("ancient water rocks", "صخور الماء القديم"), pano: B("panorama", "البانوراما"), weather: B("weather", "الطقس") });

LOGIC.sprout = {
  timeline(x) {
    const T = [];
    const pellets = !!x.flag("pellets"), peak = x.pick("orbit") === "peak", thick = !!x.flag("thick"), big = !!x.flag("bigBat");
    const nightTest = x.has("night"), landTest = x.has("land"), sel = x.pick("instr");
    let survive = pellets || peak || (big && thick);
    if (nightTest && !survive) T.push({ t: 0.004, tone: "good", expr: "party", txt: B("Pretend Moon-night test: the greenhouse froze in the chamber! Engineers add a thick blanket and a giant battery. 🎉", "اختبار ليل القمر المزيف: تجمدت الدفيئة في الغرفة! أضاف المهندسون غطاء سميكًا وبطارية عملاقة. 🎉"), run: s => { s.extra.saved = true; } });
    T.push({ t: 0.02, tone: "good", txt: B("Liftoff! Next stop: the Moon. 🌙", "انطلاق! المحطة التالية: القمر. 🌙") });
    if (!x.has("vib")) T.push(shake(0.05));
    if (peak && !landTest) T.push({ t: 0.08, decision: { id: "boulder", role: "nav", label: B("Big rocks ahead!", "صخور كبيرة أمامنا!"), expr: "shocked",
      q: B("The landing spot on the peak is full of boulders! What do we do?", "مكان الهبوط على القمة مليء بالصخور الكبيرة! ماذا نفعل؟"),
      opts: [
        { t: B("Hover and look for a flatter spot", "نحوم ونبحث عن مكان أكثر انبساطًا"), good: true, why: B("Using a little fuel to find a safe spot is always worth it.", "استهلاك قليل من الوقود لإيجاد مكان آمن يستحق دائمًا."), apply: s => s.say(B("Found a flat patch. Gentle touchdown! 🎉", "وجدنا بقعة منبسطة. هبوط لطيف! 🎉"), "good", "party") },
        { t: B("Land right now", "نهبط الآن"), good: false, why: B("Landing on a boulder can tip a lander over.", "الهبوط على صخرة قد يقلب المركبة."), apply: s => { s.sciMult *= 0.7; s.say(B("Bump! The lander lands tilted. The solar panel points the wrong way.", "ارتطام! هبطت المركبة مائلة، واللوح الشمسي يشير إلى الاتجاه الخطأ."), "bad"); } }
      ] } });
    else T.push({ t: 0.08, tone: "good", expr: "party", txt: B("Touchdown on the Moon! 🎉", "هبطنا على القمر! 🎉") });
    T.push({ t: 0.16, tone: "good", txt: sel.includes("green") ? B("The Sun rises. Inside the greenhouse, a tiny sprout pops up! 🌱", "تشرق الشمس، وداخل الدفيئة يطلّ برعم صغير! 🌱") : B("The Sun rises. The instruments wake up and start measuring.", "تشرق الشمس، وتستيقظ الأجهزة وتبدأ القياس.") });
    if (!x.has("grow") && sel.includes("green")) T.push({ t: 0.22, tone: "warn", txt: B("Some seeds don’t sprout: the greenhouse was never tested on Earth.", "بعض البذور لم تنبت: الدفيئة لم تُختبر على الأرض."), run: s => { s.sciMult *= 0.85; } });
    T.push(evStorm(0.3, x));
    T.push({ t: 0.45, tone: "warn", expr: "worried", txt: B("Sunset… the long lunar night begins. It gets very, very cold.", "غروب… يبدأ ليل القمر الطويل، ويصبح الجو باردًا جدًا جدًا.") });
    T.push({ t: 0.55, run: s => {
      if (survive || s.extra.saved) s.say(peak ? B("On the sunny peak the night is short. The plant stays cosy! ☀️", "على القمة المشمسة الليل قصير، والنبتة تبقى دافئة! ☀️") : B("The blanket and heater keep the greenhouse warm all night! 🌱", "الغطاء والسخّان أبقيا الدفيئة دافئة طوال الليل! 🌱"), "good", "party");
      else if (thick || big) { s.outcome = "partial"; s.sciMult *= 0.4; s.say(B("The lander survives, but the greenhouse freezes. The sprout is gone. 🥶", "نجت المركبة، لكن الدفيئة تجمدت وذهب البرعم. 🥶"), "bad", "worried"); }
      else s.lose(0.56, B("Night 3: the battery is empty, the heater stops, and everything freezes. The lander goes silent. 🥶", "الليلة الثالثة: فرغت البطارية وتوقف السخّان، وتجمد كل شيء. صمتت المركبة. 🥶"));
    } });
    T.push({ t: 0.75, tone: "good", txt: B("Sunrise again! The lander wakes up for a second Moon day.", "شروق جديد! تستيقظ المركبة ليوم قمري ثانٍ.") });
    if (x.goal("photo") && sel.includes("camera")) T.push({ t: 0.85, tone: "good", expr: "party", txt: B("Click! A photo of the first Moon plant reaches Earth. 📸", "تِك! صورة أول نبتة على القمر تصل إلى الأرض. 📸") });
    T.push({ t: 1, tone: "good", txt: B("Mission complete! Scientists learn how plants grow on the Moon.", "اكتملت المهمة! تعلّم العلماء كيف تنمو النباتات على القمر.") });
    return T;
  },
  keys(x) {
    const ok = !!x.flag("pellets") || x.pick("orbit") === "peak" || (!!x.flag("bigBat") && !!x.flag("thick"));
    return [
      { ok: ok || x.has("night"), pts: 30, t: B("Ready for the long Moon night", "مستعد لليل القمر الطويل"), why: B("Thick blanket + big battery, heater pellets, or a sunny peak.", "غطاء سميك + بطارية كبيرة، أو حبيبات تدفئة، أو قمة مشمسة.") },
      { ok: x.has("night"), pts: 15, t: B("Tested a pretend Moon night", "اختبرت ليلًا قمريًا مزيفًا"), why: B("Test the hardest moment before you fly.", "اختبر أصعب لحظة قبل أن تطير.") },
      { ok: x.pick("orbit") !== "peak" || x.has("land"), pts: 15, t: B("Landed safely", "هبطت بأمان"), why: B("A tricky landing spot needs a landing camera test.", "مكان الهبوط الصعب يحتاج اختبار كاميرا الهبوط.") },
      { ok: x.has("grow") || !x.pick("instr").includes("green"), pts: 10, t: B("Tested the greenhouse on Earth", "اختبرت الدفيئة على الأرض"), why: B("Make sure seeds sprout before sending them to the Moon.", "تأكد أن البذور تنبت قبل إرسالها إلى القمر.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every tool helps your question", "كل أداة تساعد سؤالك"), why: B("Extra tools are extra weight.", "الأدوات الزائدة وزن زائد.") },
      { ok: x.has("vib"), pts: 10, t: B("Did the shake test", "أجريت اختبار الاهتزاز"), why: B("Rockets shake a lot!", "الصواريخ تهتز كثيرًا!") }
    ];
  }
};

LOGIC.ruby = {
  timeline(x) {
    const T = [];
    const rtg = !!x.flag("rtg"), tilt = !!x.flag("tilt"), big = x.pick("power") === "p_big", windy = !!x.flag("windy");
    const dustTest = x.has("dust"), six = !!x.flag("six");
    const margin = x.c.gen > 0 ? (x.c.gen - x.c.load) / x.c.load : 0;
    if (dustTest && !rtg && !tilt && !big) T.push({ t: 0.004, tone: "good", expr: "party", txt: B("Dust chamber test: the panels lose most of their power under fake dust! Engineers add a shake-off mechanism. 🎉", "اختبار غرفة الغبار: الألواح فقدت معظم طاقتها تحت الغبار المزيف! أضاف المهندسون آلية لنفض الغبار. 🎉"), run: s => { s.extra.tiltAdded = true; } });
    T.push({ t: 0.02, tone: "good", txt: B("Liftoff! Seven months to Mars. 🚀", "انطلاق! سبعة أشهر إلى المريخ. 🚀") });
    if (!x.has("vib")) T.push(shake(0.05));
    T.push({ t: 0.1, tone: "good", expr: "party", txt: B("Touchdown on Mars! Ruby rolls off and takes her first picture. 🚙", "هبطنا على المريخ! روبي تنطلق وتلتقط أول صورة. 🚙") });
    if (!x.has("yard") && !six) T.push({ t: 0.16, tone: "warn", txt: B("A wheel slips on a rock. Ruby needs three days to wiggle free.", "انزلقت عجلة على صخرة، واحتاجت روبي ثلاثة أيام لتتحرر."), run: s => { s.down += 3; } });
    if (x.pick("orbit") === "delta") T.push({ t: 0.22, tone: "good", txt: B("Layered rocks in the old river delta: water once flowed here! 💧", "صخور متعددة الطبقات في الدلتا القديمة: جرى الماء هنا يومًا! 💧") });
    T.push(evStorm(0.3, x));
    T.push({ t: 0.45, tone: "warn", expr: "worried", txt: B("A giant dust storm wraps the whole planet. The sky turns dark orange. 🌪️", "عاصفة غبار عملاقة تلف الكوكب كله، والسماء تصبح برتقالية داكنة. 🌪️") });
    if (rtg) T.push({ t: 0.5, tone: "good", expr: "party", txt: B("The nuclear power box doesn’t care about dust. Ruby keeps working! ⚡", "صندوق الطاقة النووية لا يهتم بالغبار. روبي تواصل العمل! ⚡") });
    else if (tilt) T.push({ t: 0.5, tone: "good", expr: "party", txt: B("Ruby tilts and shakes her panels. Whoosh, the dust slides off! ✨", "روبي تميل ألواحها وتهزها. ووش، انزلق الغبار! ✨") });
    else T.push({ t: 0.5, decision: { id: "dust", role: "eng", label: B("Power dropping!", "الطاقة تنخفض!"), expr: "worried",
      q: B("The storm blocks most of the sunlight. Ruby’s battery is getting low. What should she do?", "العاصفة تحجب معظم ضوء الشمس، وبطارية روبي تنخفض. ماذا تفعل؟"),
      opts: [
        { t: B("Sleep: switch off everything except the heater and wait", "تنام: تطفئ كل شيء إلا السخّان وتنتظر"), good: true, why: B("Saving power is the best way through a storm.", "توفير الطاقة هو أفضل طريقة لعبور العاصفة."),
          apply: s => { if (big || margin >= 0.3 || s.extra.tiltAdded) { s.down += 60; s.say(B("Ruby sleeps for two months… and wakes up when the sky clears! 😴➡️😀", "نامت روبي شهرين… واستيقظت حين صفت السماء! 😴➡️😀"), "good", "party"); }
            else { s.outcome = "partial"; s.lifeMult *= 0.5; s.down += 90; s.say(B("Ruby survives, but with so little spare power she can only work half as much afterwards.", "نجت روبي، لكن مع طاقة احتياطية قليلة جدًا لا تستطيع العمل إلا بنصف طاقتها بعد ذلك."), "warn"); } } },
        { t: B("Keep driving to finish the job", "تواصل القيادة لتنهي العمل"), good: false, why: B("Driving drains the battery when there’s no sunlight to recharge it.", "القيادة تستنزف البطارية حين لا توجد شمس لإعادة شحنها."),
          apply: s => { if (big) { s.lifeMult *= 0.7; s.sciMult *= 0.85; s.say(B("Big panels keep Ruby alive, just barely. She loses a lot of time recovering.", "الألواح الكبيرة أبقت روبي حية بصعوبة، وخسرت وقتًا طويلًا في التعافي."), "warn"); }
            else s.lose(s.p + 0.02, B("The battery runs flat in the dark storm. Ruby falls asleep… forever. 💤", "فرغت البطارية في ظلام العاصفة. نامت روبي… إلى الأبد. 💤")); } }
      ] } });
    if (windy && !rtg) T.push({ t: 0.66, tone: "good", expr: "party", txt: B("A dust devil whooshes past and cleans Ruby’s panels for free! 🌪️✨", "مرّت دوامة غبار ونظفت ألواح روبي مجانًا! 🌪️✨"), run: s => { s.sciMult *= 1.05; } });
    T.push(evOps(0.72, x));
    T.push({ t: 1, tone: "good", txt: B("Two Earth years on Mars! Ruby’s discoveries fill the science books.", "عامان أرضيان على المريخ! اكتشافات روبي تملأ كتب العلوم.") });
    return T;
  },
  keys(x) {
    const ready = !!x.flag("rtg") || !!x.flag("tilt") || x.pick("power") === "p_big" || x.has("dust");
    return [
      { ok: ready, pts: 30, t: B("Ready for dust storms", "مستعد لعواصف الغبار"), why: B("Big or tilting panels, nuclear power, or a dust test that finds the problem.", "ألواح كبيرة أو مائلة، أو طاقة نووية، أو اختبار غبار يكشف المشكلة.") },
      { ok: x.has("dust"), pts: 15, t: B("Tested the rover in a dust chamber", "اختبرت المركبة في غرفة الغبار"), why: B("Mars dust is the solar rover’s biggest enemy.", "غبار المريخ أكبر أعداء المركبات الشمسية.") },
      { ok: !!x.flag("six") || x.has("yard"), pts: 10, t: B("Ready for rocky ground", "مستعد للأرض الصخرية"), why: B("Six rocking wheels, or a driving test on Earth.", "ست عجلات متأرجحة، أو اختبار قيادة على الأرض.") },
      { ok: x.pick("comms") === "relay", pts: 10, t: B("Sent data through an orbiter", "أرسلت البيانات عبر قمر مداري"), why: B("Real Mars rovers send most of their data this way.", "مركبات المريخ الحقيقية ترسل معظم بياناتها هكذا.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every tool helps your question", "كل أداة تساعد سؤالك"), why: B("Extra tools use extra power.", "الأدوات الزائدة تستهلك طاقة زائدة.") },
      { ok: x.has("vib") && x.has("tvac"), pts: 10, t: B("Did the space and shake tests", "أجريت اختبارَي الفضاء والاهتزاز"), why: B("Mars is cold and rockets shake.", "المريخ بارد والصواريخ تهتز.") }
    ];
  }
};
