/* ===================== SECOND CHANCE v2 — what happens in flight ===================== */
function evStorm(t, x) {
  const robust = !!x.flag("robust") || x.has("fault");
  return { t, decision: {
    id: "storm", role: "nav", label: B("Solar storm!", "عاصفة شمسية!"), expr: "worried",
    q: B("Space-weather alert! A big solar storm arrives in six hours. What do we do?", "تحذير من طقس الفضاء! عاصفة شمسية كبيرة تصل بعد ست ساعات. ماذا نفعل؟"),
    opts: [
      { t: B("Hide in safe mode", "ندخل الوضع الآمن"), good: true,
        why: B("Safe mode costs a few days of science but protects the electronics.", "الوضع الآمن يكلّف أيامًا قليلة من العلم لكنه يحمي الإلكترونيات."),
        apply: s => { s.sciMult *= 0.99; s.down += 3; s.say(B("Safe mode: three quiet days, then back to work.", "الوضع الآمن: ثلاثة أيام هادئة ثم نعود للعمل."), "good"); } },
      { t: B("Keep working", "نستمر في العمل"), good: robust,
        why: robust ? B("A backup brain and a tested self-repair system can handle radiation hits.", "العقل الاحتياطي ونظام الإصلاح الذاتي المختبَر يتحملان ضربات الإشعاع.")
                    : B("Nothing on board was built or tested to recover from radiation hits by itself.", "لا شيء على متن المركبة صُمم أو اختُبر ليتعافى من الإشعاع وحده."),
        apply: s => {
          if (robust) s.say(B("Radiation hits are caught and fixed automatically. No data lost!", "ضربات الإشعاع اكتُشفت وأُصلحت تلقائيًا. لم نفقد أي بيانات!"), "good");
          else { s.lifeMult *= 0.93; s.sciMult *= 0.95; s.down += 14; s.say(B("A radiation hit restarts the computer. Two weeks to recover.", "ضربة إشعاع أعادت تشغيل الحاسوب. أسبوعان للتعافي."), "bad"); }
        } }
    ] } };
}
function evOps(t, x) {
  if (x.c.ratio < 1) {
    return { t, decision: {
      id: "backlog", role: "sci", label: B("Memory full!", "الذاكرة ممتلئة!"), expr: "worried",
      q: B("The instruments make more data than the radio can send home. The memory is full!", "الأجهزة تنتج بيانات أكثر مما يستطيع الراديو إرساله. الذاكرة ممتلئة!"),
      opts: [
        { t: B("Send only the best data first", "نرسل أفضل البيانات أولًا"), good: true,
          why: B("When the radio is the bottleneck, choosing what to send is a science decision.", "عندما يكون الراديو هو العائق، فاختيار ما نرسله قرار علمي."),
          apply: s => { s.dataBoost = 0.35; s.say(B("The science team picks the best targets every day.", "فريق العلوم يختار أفضل الأهداف كل يوم."), "good"); } },
        { t: B("Keep recording everything", "نستمر في تسجيل كل شيء"), good: false,
          why: B("Data you can’t send gets overwritten. Recording more doesn’t bring more home.", "البيانات التي لا تُرسل تُمسح. التسجيل الأكثر لا يُنزّل أكثر."),
          apply: s => { s.say(B("Old data keeps getting overwritten before it can be sent.", "البيانات القديمة تُمسح قبل أن تُرسل."), "warn"); } }
      ] } };
  }
  return { t, decision: {
    id: "budget", role: "pm", label: B("Budget cut", "تخفيض الميزانية"), expr: "worried",
    q: B("Headquarters cuts the operations budget by 15%. Where do we save?", "الإدارة خفّضت ميزانية التشغيل 15%. أين نوفّر؟"),
    opts: [
      { t: B("Fewer radio contacts", "اتصالات راديو أقل"), good: true, why: B("Fair trade: a bit less data, same mission length.", "مقايضة عادلة: بيانات أقل قليلًا، ونفس مدة المهمة."),
        apply: s => { s.sciMult *= 0.93; s.say(B("Fewer contacts. Science continues a bit slower.", "اتصالات أقل. العلم مستمر بوتيرة أبطأ قليلًا."), "info"); } },
      { t: B("End the mission a bit earlier", "ننهي المهمة مبكرًا قليلًا"), good: true, why: B("Also fair: full speed now, earlier end later.", "عادلة أيضًا: سرعة كاملة الآن ونهاية أبكر لاحقًا."),
        apply: s => { s.lifeMult *= 0.9; s.say(B("Full speed for now. The mission will end a little earlier.", "سرعة كاملة الآن. ستنتهي المهمة أبكر قليلًا."), "info"); } }
    ] } };
}
function evGlitch(t) {
  return { t, decision: {
    id: "glitch", role: "sci", label: B("Instrument glitch!", "خلل في جهاز!"), expr: "worried",
    q: B("An instrument starts sending strange numbers. What now?", "أحد الأجهزة بدأ يرسل أرقامًا غريبة. ماذا الآن؟"),
    opts: [
      { t: B("Restart it and re-check the data", "نعيد تشغيله ونراجع البيانات"), good: true, why: B("A week lost, but the data stays trustworthy.", "أسبوع ضائع، لكن البيانات تبقى موثوقة."),
        apply: s => { s.sciMult *= 0.98; s.down += 7; s.say(B("Restarted and checked. Clean data again.", "أُعيد التشغيل وروجعت البيانات. عادت نظيفة."), "good"); } },
      { t: B("Ignore it and keep going", "نتجاهله ونكمل"), good: false, why: B("Bad data mixed with good data ruins trust in all of it.", "البيانات السيئة الممزوجة بالجيدة تُفسد الثقة في كلها."),
        apply: s => { s.sciMult *= 0.85; s.say(B("Weeks of data turn out to be wrong and must be thrown away.", "تبيّن أن أسابيع من البيانات خاطئة ويجب حذفها."), "bad"); } }
    ] } };
}
function evCell(t, x) {
  const spare = x.c.wh >= x.c.needWh * 1.3;
  return { t, decision: {
    id: "cell", role: "eng", label: B("Battery cell failed!", "تعطّلت خلية في البطارية!"), expr: "shocked",
    q: B("One battery cell just died. The battery is now 25% smaller. What do we do?", "توقفت إحدى خلايا البطارية، فأصبحت البطارية أصغر بنسبة 25%. ماذا نفعل؟"),
    opts: [
      { t: B("Switch instruments off in the dark", "نطفئ الأجهزة في الظلام"), good: true, why: B("Less science at night, but the spacecraft stays safe.", "علم أقل ليلًا، لكن المركبة تبقى آمنة."),
        apply: s => { s.sciMult *= 0.92; s.down += 5; s.say(B("Night-time instruments off. The battery stays healthy.", "أُطفئت الأجهزة ليلًا، وبقيت البطارية سليمة."), "good"); } },
      { t: B("Keep everything running", "نُبقي كل شيء يعمل"), good: spare,
        why: spare ? B("You launched with 30%+ spare battery, so it can take the loss.", "أطلقت ببطارية فيها احتياطي 30% أو أكثر، فهي تتحمل الخسارة.") : B("Without spare battery the spacecraft runs dry in every shadow and resets.", "دون احتياطي في البطارية تنفد الطاقة في كل ظل وتعيد المركبة التشغيل."),
        apply: s => { if (spare) s.say(B("The spare battery capacity covers the loss. Nothing changes!", "سعة البطارية الاحتياطية عوّضت الخسارة. لم يتغير شيء!"), "good");
          else { s.lifeMult *= 0.8; s.sciMult *= 0.85; s.down += 30; s.say(B("The battery runs dry in the shadow. Repeated resets cost a month.", "نفدت البطارية في الظل، وكلّفت إعادات التشغيل المتكررة شهرًا كاملًا."), "bad"); } } }
    ] } };
}
const shake = t => ({ t, tone: "warn", txt: B("Launch shaking loosens a connector that was never shake-tested. One instrument works less well.", "اهتزاز الإطلاق فكّ موصلًا لم يُختبر. أحد الأجهزة يعمل بكفاءة أقل."), run: s => { s.sciMult *= 0.85; } });
const thermal = t => ({ t, tone: "warn", txt: B("A heater acts strangely in the cold of space. A software patch fixes it, but an instrument runs colder.", "سخّان يتصرف بغرابة في برد الفضاء. تحديث برمجي أصلحه، لكن أحد الأجهزة صار أبرد."), run: s => { s.sciMult *= 0.9; } });

const LOGIC = {
mco: {
  timeline(x) {
    const T = [];
    const single = x.pick("power") === "wing1";
    const iface = x.has("iface"), enhanced = !!x.flag("enhanced"), formal = !!x.flag("formal"), reserve = !!x.flag("reserve");
    const target = (x.opt("orbit") || {}).alt || 226;
    const err = single ? 169 : 25;
    if (iface) T.push({ t: 0.005, tone: "good", expr: "party", txt: B("Team-to-team test: one file is in pounds, navigation expects newtons! Fixed in one day. 🎉", "اختبار البيانات بين الفرق: ملف بالرطل والملاحة تتوقع النيوتن! أُصلح في يوم واحد. 🎉") });
    T.push({ t: 0.02, tone: "good", txt: B(`Liftoff! The ${L(x.opt("launcher").n)} roars off from Cape Canaveral.`, `انطلاق! صاروخ ${L(x.opt("launcher").n)} يهدر من كيب كانافيرال.`) });
    if (!x.has("vib")) T.push(shake(0.06));
    T.push({ t: 0.1, txt: B("Cruise to Mars: about nine and a half months.", "الرحلة إلى المريخ: نحو تسعة أشهر ونصف.") });
    T.push({ t: 0.2, tone: single ? "warn" : "good", txt: single
      ? B("The single wing catches sunlight unevenly. Small thrusters fire 10–14 times more often than planned.", "الجناح الواحد يتلقى ضوء الشمس بشكل غير متوازن. الدافعات الصغيرة تعمل أكثر من المخطط بـ 10 إلى 14 مرة.")
      : B("Two balanced wings keep the push of sunlight even. Thruster firings stay rare.", "الجناحان المتوازنان يجعلان دفع ضوء الشمس متساويًا. الدافعات نادرًا ما تعمل.") });
    if (!x.has("tvac")) T.push(thermal(0.3));
    T.push(evStorm(0.4, x));
    if (!iface) {
      if (enhanced) {
        T.push({ t: 0.56, tone: "warn", expr: "worried", txt: B("Extra tracking pays off: the navigators see the closest approach getting lower every day.", "التتبع الإضافي أفاد: الملاحون يرون أقرب نقطة تنخفض كل يوم.") });
        if (formal) T.push({ t: 0.64, tone: "good", expr: "party", txt: B("A formal report starts a team review. Found it: pounds instead of newtons! A 5th correction burn fixes the path.", "تقرير رسمي أطلق مراجعة جماعية. وجدناه: رطل بدل نيوتن! حرق تصحيحي خامس أصلح المسار."),
          run: s => { s.extra.fixed = true; if (!reserve) { s.lifeMult *= 0.88; s.say(B("That extra burn used fuel planned for science.", "الحرق الإضافي استهلك وقودًا كان مخصصًا للعلم."), "warn"); } } });
        else T.push({ t: 0.64, tone: "bad", expr: "worried", txt: B("A navigator sends a worried e-mail… it never reaches a formal review. No correction is made.", "أرسل ملاح رسالة قلقة… لكنها لم تصل لمراجعة رسمية. لم يُجرَ أي تصحيح.") });
      } else T.push({ t: 0.6, txt: B("Normal tracking shows nothing alarming. The error is hiding in the data.", "التتبع العادي لا يُظهر شيئًا مقلقًا. الخطأ مختبئ في البيانات.") });
    }
    T.push({ t: 0.8,
      txt: s => { const peri = (!iface && !s.extra.fixed) ? target - err : target; s.extra.peri = peri;
        return B(`Arriving at Mars! Planned closest approach: ${target} km. Actual: ${peri} km.`, `الوصول إلى المريخ! أقرب نقطة مخططة: ${target} كم. الفعلية: ${peri} كم.`); },
      run: s => { const p = s.extra.peri;
        if (p < 80) s.lose(0.82, B(`At ${p} km the orbiter hits the air of Mars, below the 80 km it can survive. Signal lost…`, `على ارتفاع ${p} كم يصطدم المسبار بهواء المريخ، تحت 80 كم التي يتحملها. انقطعت الإشارة…`));
        else if (p < 110) { s.outcome = "partial"; s.lifeMult *= 0.6; s.sciMult *= 0.8; s.say(B("Too low, but alive! The heat damages the solar wing. The mission will be shorter.", "منخفض جدًا لكنه حي! الحرارة أتلفت الجناح الشمسي، وستكون المهمة أقصر."), "warn"); }
        else s.say(B("Perfect capture into Mars orbit! 🎉", "دخول مثالي إلى مدار المريخ! 🎉"), "good", "party"); } });
    T.push(evOps(0.88, x));
    if (x.goal("relay") && x.pick("instr").includes("uhf")) T.push({ t: 0.93, tone: "good", txt: B("December 1999: we listen on UHF as the Mars Polar Lander arrives.", "ديسمبر 1999: نستمع على UHF بينما يصل مسبار القطب المريخي.") });
    T.push({ t: 1, tone: "good", txt: s => s.outcome === "partial" ? B("The mission ends early, with part of the science.", "انتهت المهمة مبكرًا بجزء من العلم.") : B("Mars mapped! The data reaches scientists on Earth.", "تم رسم خريطة المريخ! البيانات وصلت للعلماء على الأرض.") });
    return T;
  },
  keys(x) {
    const alt = (x.opt("orbit") || {}).alt || 0;
    return [
      { ok: x.has("iface"), pts: 30, t: B("Tested the data between teams", "اختبرت البيانات بين الفرق"), why: B("This test finds a pounds-vs-newtons mix-up before launch.", "هذا الاختبار يكشف خلط الرطل بالنيوتن قبل الإطلاق.") },
      { ok: !!x.flag("formal"), pts: 15, t: B("Gave worries a formal path", "جعلت للمخاوف طريقًا رسميًا"), why: B("In 1999 the worry stayed in an e-mail.", "في 1999 بقي القلق في رسالة بريد.") },
      { ok: !!x.flag("enhanced"), pts: 10, t: B("Paid for extra tracking", "دفعت مقابل تتبع إضافي"), why: B("More tracking reveals a hidden error in time.", "تتبع أكثر يكشف الخطأ المخفي في الوقت المناسب.") },
      { ok: x.pick("power") === "wing2", pts: 10, t: B("Balanced the solar wings", "وازنت الأجنحة الشمسية"), why: B("Fewer thruster firings give an error less to multiply.", "دفعات أقل تجعل الخطأ يتضاعف أقل.") },
      { ok: alt >= 300, pts: 10, t: B("Kept a safety margin at Mars", "تركت هامش أمان عند المريخ"), why: B("A 170 km error is deadly from 226 km and survivable from 300+.", "خطأ 170 كم قاتل من 226 كم ونجاة من 300 كم فأكثر.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every instrument serves your question", "كل جهاز يخدم سؤالك"), why: B("Extra instruments only add mass, power and cost.", "الأجهزة الزائدة تضيف وزنًا وطاقة وتكلفة فقط.") },
      { ok: x.has("tvac") && x.has("vib"), pts: 10, t: B("Ran the space and shake tests", "أجريت اختبارَي الفضاء والاهتزاز"), why: B("They catch problems that only appear in space or at launch.", "يكشفان مشاكل لا تظهر إلا في الفضاء أو عند الإطلاق.") }
    ];
  }
},
oco: {
  timeline(x) {
    const T = [];
    const taurus = !!x.flag("taurus"), audit = x.has("audit"), Lr = x.opt("launcher");
    if (taurus && audit) T.push({ t: 0.005, tone: "good", expr: "party", txt: B("Metal re-test: the nose-cone joint is weaker than its certificate says! Replaced. Launch moves two months. 🎉", "إعادة اختبار المعدن: وصلة المقدمة أضعف مما تقوله الشهادة! استُبدلت، وتأجل الإطلاق شهرين. 🎉") });
    if (Lr.id === "ride") T.push({ t: 0.008, txt: B("Six months waiting for a shared ride…", "ستة أشهر من انتظار الرحلة المشتركة…") });
    T.push({ t: 0.02, tone: "good", txt: B(`Liftoff of the ${L(Lr.n)} from Vandenberg!`, `انطلاق ${L(Lr.n)} من فاندنبرغ!`) });
    if (taurus && !audit) {
      T.push({ t: 0.06, tone: "bad", expr: "shocked", txt: B("Three minutes in: “Open the nose cone!” …It doesn’t open.", "بعد ثلاث دقائق: «افتح المقدمة!» …لم تنفتح.") });
      T.push({ t: 0.09, run: s => s.lose(0.09, B("Too heavy to reach orbit. The satellite falls into the ocean near Antarctica.", "ثقيل جدًا ليصل للمدار. القمر يسقط في المحيط قرب القطب الجنوبي.")) });
      return T;
    }
    T.push({ t: 0.07, tone: "good", expr: "party", txt: B("Nose cone opens! Orbit reached! 🎉", "انفتحت المقدمة! وصلنا إلى المدار! 🎉") });
    if (!x.has("vib")) T.push(shake(0.1));
    if (x.pick("orbit") === "atrain") T.push({ t: 0.14, tone: "good", txt: B("We join the A-Train, minutes behind our neighbours.", "انضممنا إلى القطار A بفارق دقائق عن جيراننا.") });
    if (x.pick("orbit") === "iss400") T.push({ t: 0.14, tone: "warn", txt: B("This tilted orbit never passes over the far north or south. Part of the map stays blank.", "هذا المدار المائل لا يمر فوق أقصى الشمال والجنوب. جزء من الخريطة يبقى فارغًا.") });
    if (!x.has("tvac")) T.push(thermal(0.22));
    if (!x.has("cal")) T.push({ t: 0.3, tone: "warn", txt: B("Without calibration, the CO₂ numbers drift. Months of fixing.", "بدون معايرة، أرقام الكربون تنحرف. شهور من الإصلاح."), run: s => { s.sciMult *= 0.88; } });
    T.push(evStorm(0.42, x));
    T.push(evOps(0.6, x));
    const sel = x.pick("instr");
    if (sel.includes("spec3")) T.push({ t: 0.72, tone: "good", txt: B("The oxygen band measures pressure and flags clouds by itself!", "نطاق الأكسجين يقيس الضغط ويكشف السحب وحده!") });
    else if (!sel.includes("ctx")) T.push({ t: 0.72, tone: "warn", txt: B("Clouds spoil many readings, and nothing on board can tell which.", "السحب تفسد قراءات كثيرة ولا شيء يكشفها."), run: s => { s.sciMult *= 0.9; } });
    if (x.goal("fluor") && sel.includes("spec3")) T.push({ t: 0.82, tone: "good", expr: "party", txt: B("Bonus: we can see the faint glow of plants at work! 🌱", "مكافأة: نرى توهج النباتات الخافت وهي تعمل! 🌱") });
    T.push({ t: 1, tone: "good", txt: B("Two years of CO₂ maps delivered to climate scientists!", "سنتان من خرائط الكربون وصلت لعلماء المناخ!") });
    return T;
  },
  keys(x) {
    const taurus = !!x.flag("taurus");
    return [
      { ok: !taurus || x.has("audit"), pts: 35, t: B("Closed the nose-cone risk", "أغلقت خطر المقدمة"), why: B("A different rocket, or re-testing the metal instead of trusting certificates.", "صاروخ آخر، أو إعادة اختبار المعدن بدل الثقة في الشهادات.") },
      { ok: x.pick("instr").includes("spec3"), pts: 15, t: B("Kept the oxygen band", "احتفظت بنطاق الأكسجين"), why: B("It makes the CO₂ numbers much more precise.", "يجعل أرقام الكربون أدق بكثير.") },
      { ok: x.c.ratio >= 1, pts: 10, t: B("The radio keeps up with the data", "الراديو يواكب البيانات"), why: B("Data you can’t send is lost science.", "البيانات التي لا تُرسل علم ضائع.") },
      { ok: x.has("cal"), pts: 10, t: B("Calibrated the spectrometer", "عايرت المطياف"), why: B("Precision is the whole point.", "الدقة هي الهدف كله.") },
      { ok: x.pick("orbit") !== "iss400", pts: 10, t: B("Covered the whole globe", "غطيت الكرة الأرضية كلها"), why: B("A pole-to-pole orbit sees every latitude.", "المدار من قطب لقطب يرى كل خطوط العرض.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every instrument serves your question", "كل جهاز يخدم سؤالك"), why: B("Extras only add mass and cost.", "الإضافات تزيد الوزن والتكلفة فقط.") },
      { ok: x.has("tvac") && x.has("vib"), pts: 10, t: B("Ran the space and shake tests", "أجريت اختبارَي الفضاء والاهتزاز"), why: B("Cheap insurance.", "تأمين رخيص.") }
    ];
  }
},
kepler: {
  timeline(x) {
    const T = [];
    const fl = (x.opt("adcs") || {}).flags || {};
    const wheelTest = x.has("wheel"), extraFuel = !!x.flag("extraFuel"), orbit = x.pick("orbit");
    if (wheelTest && fl.wheels === 4 && !fl.bearings) T.push({ t: 0.005, tone: "good", expr: "party", txt: B("The long wheel test finds friction growing in two wheels. Swapped before launch! 🎉", "اختبار العجلات الطويل كشف احتكاكًا يزداد في عجلتين. استُبدلتا قبل الإطلاق! 🎉") });
    T.push({ t: 0.02, tone: "good", txt: B(`Liftoff of the ${L(x.opt("launcher").n)}, March 2009!`, `انطلاق ${L(x.opt("launcher").n)}، مارس 2009!`) });
    if (!x.has("vib")) T.push(shake(0.05));
    T.push({ t: 0.08, tone: orbit === "leo" ? "warn" : "info", txt: orbit === "leo"
      ? B("Close to Earth, our planet blocks the stars every 90 minutes. The data is full of gaps.", "قرب الأرض، كوكبنا يحجب النجوم كل 90 دقيقة. البيانات مليئة بالفجوات.")
      : B("The telescope stares at 100,000 stars in Cygnus and Lyra.", "التلسكوب يحدق في 100,000 نجم في الدجاجة والقيثارة.") });
    if (!x.has("tvac")) T.push(thermal(0.14));
    if (!x.has("cal")) T.push({ t: 0.18, tone: "warn", txt: B("Without calibration, sensor noise hides the smallest planets for a year.", "بدون معايرة، ضجيج المستشعر يخفي أصغر الكواكب لعام."), run: s => { s.sciMult *= 0.9; } });
    T.push({ t: 0.24, tone: "good", expr: "party", txt: B("First planets found! Small planets are everywhere! 🪐", "أول الكواكب اكتُشفت! الكواكب الصغيرة في كل مكان! 🪐") });
    T.push(evStorm(0.32, x));
    if (fl.wheels === 6) {
      T.push({ t: 0.44, tone: "warn", txt: B("Year 3: a wheel breaks. A spare spins up. No problem!", "السنة 3: عجلة تتعطل. الاحتياطية تعمل. لا مشكلة!") });
      T.push({ t: 0.54, tone: "good", txt: B("Year 4: another wheel breaks. Four still spinning!", "السنة 4: عجلة أخرى تتعطل. ما زالت أربع تدور!"), run: s => { s.lifeMult *= 1.12; } });
    } else if (fl.bearings || wheelTest) {
      T.push({ t: 0.5, tone: "good", txt: fl.bearings ? B("Super bearings keep all four wheels healthy!", "المحامل المحسنة تحافظ على العجلات الأربع!") : B("Year 4: one wheel breaks. Three left: still enough!", "السنة 4: عجلة تتعطل. بقيت ثلاث: ما زالت كافية!"), run: s => { s.lifeMult *= 1.1; } });
    } else {
      T.push({ t: 0.44, tone: "warn", expr: "worried", txt: B("July 2012: wheel #2 breaks. Three left: still enough.", "يوليو 2012: العجلة 2 تتعطل. بقيت ثلاث: ما زالت كافية.") });
      T.push({ t: 0.54, tone: "bad", expr: "shocked", txt: B("May 2013: wheel #4 breaks! With two wheels, Kepler can’t hold still.", "مايو 2013: العجلة 4 تتعطل! بعجلتين لا يستطيع كبلر الثبات.") });
      T.push({ t: 0.56, decision: {
        id: "rescue", role: "eng", label: B("Two wheels left!", "بقيت عجلتان!"), expr: "think",
        q: B("Two wheels, a healthy telescope, a little fuel. What does the team do?", "عجلتان، وتلسكوب سليم، وقليل من الوقود. ماذا يفعل الفريق؟"),
        opts: [
          { t: B("Switch it off and save the data", "نطفئه ونحفظ البيانات"), good: false, why: B("You keep the data, but give up a working telescope.", "تحتفظ بالبيانات لكنك تتخلى عن تلسكوب يعمل."),
            apply: s => { s.outcome = "partial"; s.lifeMult *= 0.85; s.say(B("Kepler is switched off. Four years of data are saved.", "أُطفئ كبلر. حُفظت أربع سنوات من البيانات."), "warn"); } },
          { t: B("Hold it steady with thrusters", "نثبّته بالدافعات"), good: false, why: B("It works for a few months, then the fuel is gone.", "تعمل لبضعة أشهر ثم ينفد الوقود."),
            apply: s => { s.outcome = "partial"; s.lifeMult *= 0.9; s.say(B("Thrusters hold it for a few months… then the tank is empty.", "الدافعات ثبتته لبضعة أشهر… ثم فرغ الخزان."), "warn"); } },
          { t: B("Balance it on sunlight!", "نوازنه على ضوء الشمس!"), good: true, why: B("The K2 trick: sunlight on the panel becomes the third wheel.", "حيلة K2: ضوء الشمس على اللوح يصبح العجلة الثالثة."),
            apply: s => { s.outcome = "rescued"; s.extra.k2 = true; s.lifeMult *= extraFuel ? 1.3 : 1.2;
              s.say(B("Engineers line the panel up with the Sun. Sunlight becomes the third wheel. K2 begins! ☀️", "المهندسون وجّهوا اللوح نحو الشمس. ضوء الشمس صار العجلة الثالثة. بدأت K2! ☀️"), "good", "party"); } }
        ] } });
    }
    T.push(evOps(0.7, x));
    T.push({ t: 0.86, tone: "good", txt: s => s.extra.k2 ? B("K2 finds planets, exploding stars, star clusters and even asteroids!", "K2 يكتشف كواكب ونجومًا متفجرة وعناقيد نجمية وحتى كويكبات!") : null });
    T.push({ t: 1, tone: "good", txt: s => s.extra.k2 ? B("The fuel finally runs out. Kepler retires a hero.", "نفد الوقود أخيرًا. تقاعد كبلر بطلًا.") : (s.outcome === "partial" ? B("The mission ends.", "انتهت المهمة.") : B("Mission complete! The planet list goes to astronomers worldwide.", "اكتملت المهمة! قائمة الكواكب ذهبت لعلماء الفلك حول العالم.")) });
    return T;
  },
  keys(x, sim) {
    const fl = (x.opt("adcs") || {}).flags || {};
    const safe = fl.wheels === 6 || fl.bearings || x.has("wheel") || (sim && sim.extra.k2);
    return [
      { ok: !!safe, pts: 30, t: B("Ready for wheel failures", "مستعد لتعطل العجلات"), why: B("Spares, better bearings, a long test, or the sunlight trick.", "عجلات احتياطية، أو محامل أفضل، أو اختبار طويل، أو حيلة ضوء الشمس.") },
      { ok: x.pick("orbit") !== "leo", pts: 15, t: B("Picked a quiet orbit away from Earth", "اخترت مدارًا هادئًا بعيدًا عن الأرض"), why: B("Non-stop views make tiny dips visible.", "الرؤية المستمرة تجعل الانخفاضات الصغيرة مرئية.") },
      { ok: x.pick("instr").includes("fp42"), pts: 10, t: B("Flew the giant camera", "أطلقت الكاميرا العملاقة"), why: B("More stars, more planets.", "نجوم أكثر، كواكب أكثر.") },
      { ok: x.c.ratio >= 1, pts: 10, t: B("The radio keeps up with the data", "الراديو يواكب البيانات"), why: B("Every pixel left behind is a planet not found.", "كل بكسل لم يُرسل كوكب لم يُكتشف.") },
      { ok: x.has("cal"), pts: 10, t: B("Calibrated the camera", "عايرت الكاميرا"), why: B("You can’t find a 0.01% dip without knowing your noise.", "لا يمكنك إيجاد انخفاض 0.01% دون معرفة الضجيج.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every instrument serves your question", "كل جهاز يخدم سؤالك"), why: B("No room for extras on this rocket.", "لا مكان للإضافات على هذا الصاروخ.") },
      { ok: x.has("tvac") && x.has("vib"), pts: 10, t: B("Ran the space and shake tests", "أجريت اختبارَي الفضاء والاهتزاز"), why: B("They catch what bench tests miss.", "يكشفان ما تفوته اختبارات المختبر.") }
    ];
  }
},
nile: {
  timeline(x) {
    const T = [];
    const Lr = x.opt("launcher"), orbit = x.pick("orbit"), sel = x.pick("instr");
    T.push({ t: 0.02, tone: "good", txt: Lr.id === "issdep" ? B("Your CubeSat rides to the space station, then gets pushed out into space!", "الكيوب سات يصعد إلى محطة الفضاء ثم يُدفع إلى الفضاء!") : B(`Launch on the ${L(Lr.n)}! Your CubeSat is free in space.`, `الإطلاق على ${L(Lr.n)}! الكيوب سات حر في الفضاء.`) });
    if (!x.has("vib")) T.push({ t: 0.06, tone: "warn", txt: B("Launch shaking cracks a solar panel wire. A little less power.", "الاهتزاز شرخ سلك لوح شمسي. طاقة أقل قليلًا."), run: s => { s.sciMult *= 0.9; } });
    if (!x.has("gstest")) T.push({ t: 0.1, tone: "bad", expr: "worried", txt: B("First pass over Cairo: silence! The station was never tested. Two weeks lost fixing it.", "أول مرور فوق القاهرة: صمت! المحطة لم تُختبر. ضاع أسبوعان لإصلاحها."), run: s => { s.lifeMult *= 0.93; s.down += 14; } });
    else T.push({ t: 0.1, tone: "good", expr: "party", txt: B("First pass over Cairo: “Hello Earth!” Clear signal! 🎉", "أول مرور فوق القاهرة: «مرحبًا يا أرض!» إشارة واضحة! 🎉") });
    if (!x.has("ditl")) { const slow = x.pick("comms") === "uhf";
      T.push({ t: 0.16, tone: "bad", expr: "shocked", txt: slow ? B("Day 3: the radio restarts every time the camera turns on! The fix uploads slowly over UHF: three months lost.", "اليوم 3: الراديو يعيد التشغيل كلما اشتغلت الكاميرا! الإصلاح يُرفع ببطء عبر UHF: ضاعت ثلاثة أشهر.") : B("Day 3: the radio restarts every time the camera turns on! A software fix takes six weeks.", "اليوم 3: الراديو يعيد التشغيل كلما اشتغلت الكاميرا! الإصلاح البرمجي يستغرق ستة أسابيع."),
        run: s => { s.outcome = "partial"; s.sciMult *= slow ? 0.45 : 0.6; s.down += slow ? 90 : 42; } }); }
    if (x.flag("rough") && sel.length) T.push({ t: 0.22, tone: "warn", txt: B("Magnets alone can’t hold the camera steady. Many pictures are blurry.", "المغناطيسات وحدها لا تثبّت الكاميرا. صور كثيرة مهزوزة.") });
    if (!x.has("tvac")) T.push(thermal(0.26));
    T.push(evStorm(0.32, x));
    T.push({ t: 0.42, tone: "good", expr: "party", txt: B("First clear picture of the Nile Delta! 📸", "أول صورة واضحة لدلتا النيل! 📸") });
    T.push(evOps(0.55, x));
    if (x.c.ratio < 0.5) T.push({ t: 0.66, tone: "warn", txt: B("Most pictures never make it down: each pass is only a few minutes.", "معظم الصور لا تصل: كل مرور دقائق قليلة فقط.") });
    if (orbit === "iss400") T.push({ t: 0.85, txt: B("Air drag slowly pulls the CubeSat down. It burns up safely: no space junk.", "مقاومة الهواء تسحب القمر ببطء. يحترق بأمان: بلا حطام.") });
    T.push({ t: 1, tone: "good", txt: B("Data delivered to Egyptian farmers, water planners and scientists!", "البيانات وصلت للمزارعين ومخططي المياه والعلماء في مصر!") });
    return T;
  },
  keys(x) {
    const imagers = x.pick("instr").length > 0;
    return [
      { ok: x.c.goalsMet.length > 0 && x.c.goalsMet[0].met, pts: 20, t: B("Cameras match your question", "الكاميرات تناسب سؤالك"), why: B("Question first, hardware second.", "السؤال أولًا، ثم الأجهزة.") },
      { ok: !x.flag("rough") || !imagers, pts: 15, t: B("Steady enough for pictures", "ثابت بما يكفي للتصوير"), why: B("Magnets alone can’t hold a camera still.", "المغناطيسات وحدها لا تثبّت الكاميرا.") },
      { ok: x.has("ditl"), pts: 15, t: B("Tested everything together", "اختبرت كل شيء معًا"), why: B("CubeSat 101: parts can pass alone and fail together.", "دليل الكيوب سات: القطع قد تنجح منفردة وتفشل معًا.") },
      { ok: x.has("gstest"), pts: 15, t: B("Tested the ground station", "اختبرت المحطة الأرضية"), why: B("CubeSat 101: a weak ground station is a mission killer.", "دليل الكيوب سات: المحطة الضعيفة تقتل المهمة.") },
      { ok: x.c.ratio >= 1, pts: 10, t: B("The radio keeps up with the cameras", "الراديو يواكب الكاميرات"), why: B("Imaging CubeSats are limited by data.", "أقمار التصوير الصغيرة محدودة بالبيانات.") },
      { ok: x.pick("orbit") === "sso550", pts: 10, t: B("Chose an orbit that lasts", "اخترت مدارًا يدوم"), why: B("At 400 km drag ends the mission in 1–2 years.", "عند 400 كم تنهي المقاومة المهمة خلال سنة أو سنتين.") },
      { ok: x.c.off.length === 0, pts: 10, t: B("Every camera serves your question", "كل كاميرا تخدم سؤالك"), why: B("In a CubeSat every centimetre counts.", "في الكيوب سات كل سنتيمتر مهم.") },
      { ok: x.has("tvac") && x.has("vib"), pts: 5, t: B("Ran the space and shake tests", "أجريت اختبارَي الفضاء والاهتزاز"), why: B("Cheap insurance for a cheap satellite.", "تأمين رخيص لقمر رخيص.") }
    ];
  }
}
};
