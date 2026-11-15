"""Automated play-throughs of Second Chance v2. Run: python3 -I tests/play.py [--shots]"""
import sys, json, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "dist" / "index.html").as_uri()
SHOTS = ROOT / "tests" / "shots"; SHOTS.mkdir(exist_ok=True)
TAKE = "--shots" in sys.argv

DIAG = {"mco": [1, 0], "oco": [0, 1], "kepler": [2, 0], "vanguard": [2, 0], "swift": [1, 0], "sprout": [1, 2], "ruby": [0, 1]}
SC = [
  dict(name="sprout_history", m="sprout", lang="en", crew=1, mode="cadet", goal="grow", extra=["photo"],
       build=dict(instr=["green", "camera"], power="sp_s", battery="bs", thermal="thin", heater="elec", comms="r_d"),
       launch=dict(orbit="crater", launcher="cl"), tests=dict(tests=["vib"]), decide=[0, 0], expect="lost"),
  dict(name="sprout_fixed_ar", m="sprout", lang="ar", crew=2, mode="cadet", goal="grow", extra=["photo"],
       build=dict(instr=["green", "camera"], power="sp_s", battery="bl", thermal="thick", heater="pellet", comms="r_d"),
       launch=dict(orbit="plain", launcher="cl"), tests=dict(tests=["night", "grow", "vib"]), decide=[0, 0], expect="success"),
  dict(name="ruby_history", m="ruby", lang="en", crew=1, mode="cadet", goal="water", extra=["samples"],
       build=dict(instr=["rockcam", "panocam"], power="p_small", battery="b1", adcs="w6", cpu="cpu1", comms="relay"),
       launch=dict(orbit="crater", launcher="mid"), tests=dict(tests=["tvac", "vib"]), decide=[0, 1], expect="lost"),
  dict(name="ruby_fixed_ar", m="ruby", lang="ar", crew=3, mode="cadet", goal="water", extra=["samples"],
       build=dict(instr=["rockcam", "panocam"], power="p_tilt", battery="b2", adcs="w6", cpu="cpu1", comms="relay"),
       launch=dict(orbit="delta", launcher="mid"), tests=dict(tests=["dust", "tvac", "vib"]), decide=[0, 0], expect="success"),
  dict(name="vanguard_history", m="vanguard", lang="en", crew=1, mode="engineer", goal="orbit1", extra=["cells"],
       build=dict(instr=["beacon", "solarradio"], power="mercsun", tank="p_std", start="s_same", fitting="f_std"),
       launch=dict(comms="minitrack", orbit="high", launcher="tv3"), tests=dict(tests=["vib"]), decide=[0, 0], expect="lost"),
  dict(name="vanguard_fixed_ar", m="vanguard", lang="ar", crew=2, mode="engineer", goal="orbit1", extra=["cells"],
       build=dict(instr=["beacon", "solarradio"], power="mercsun", tank="p_high", start="s_same", fitting="f_wire"),
       launch=dict(comms="minitrack", orbit="high", launcher="tv3"), tests=dict(tests=["vib", "radio", "telem"]), decide=[0, 0], expect="success"),
  dict(name="swift_history", m="swift", lang="en", crew=1, mode="engineer", goal="save", extra=["inspect"],
       build=dict(instr=["arms3", "cam"], adcs="acs_new", prop="chem", power="arr400", battery="b500", cpu="cpu1", comms="sband"),
       launch=dict(orbit="plane", launcher="pegasus"), tests=dict(tests=["tvac", "vib"]), decide=[1, 0], expect="partial"),
  dict(name="swift_fixed_ar", m="swift", lang="ar", crew=1, mode="engineer", goal="save", extra=["inspect"],
       build=dict(instr=["arms3", "cam"], adcs="acs_new", prop="chem", power="arr400", battery="b500", cpu="cpu1", comms="sband"),
       launch=dict(orbit="plane", launcher="pegasus"), tests=dict(tests=["hil", "grab", "tvac", "vib", "prox"]), decide=[0, 0], expect="success"),
  dict(name="mco_history", m="mco", lang="en", crew=1, mode="engineer", wrong=True, goal="atm", extra=["relay"],
       build=dict(instr=["pmirr", "marci", "uhf"], power="wing1", battery="b450", cpu="cpu1", prop="prop1", comms="hga13"),
       launch=dict(orbit="moi226", tracking="trk1", launcher="d7425"), tests=dict(process="informal", tests=["tvac", "vib"]), decide=[0, 0], expect="lost"),
  dict(name="mco_fixed_ar", m="mco", lang="ar", crew=4, mode="cadet", goal="atm", extra=["relay"],
       build=dict(instr=["pmirr", "uhf"], power="wing2", battery="b450", cpu="cpu1", prop="prop1", comms="hga13"),
       launch=dict(orbit="moi300", tracking="trk1", launcher="d7425"), tests=dict(process="formal", tests=["tvac", "vib", "iface"]), decide=[0, 0], expect="success"),
  dict(name="oco_history", m="oco", lang="en", crew=2, mode="director", goal="co2", extra=["atrain"],
       build=dict(instr=["spec3"], power="arr900", battery="b900", cpu="cpu1", prop="hyd45", comms="xband"),
       launch=dict(orbit="atrain", launcher="taurus"), tests=dict(tests=["tvac", "vib", "cal"]), decide=[0, 0, 0], expect="lost"),
  dict(name="oco_delta", m="oco", lang="en", crew=1, mode="director", goal="co2", extra=["fluor"],
       build=dict(instr=["spec3"], power="arr900", battery="b900", cpu="cpu1", prop="hyd45", comms="xband"),
       launch=dict(orbit="atrain", launcher="delta"), tests=dict(tests=["cal"]), decide=[0, 0, 0, 0], expect="success"),
  dict(name="kepler_k2", m="kepler", lang="en", crew=1, mode="cadet", goal="earths", extra=[],
       build=dict(instr=["fp42"], power="arr1100", battery="b400", adcs="rw4", cpu="cpu1", prop="fuel1", comms="ka"),
       launch=dict(orbit="trail", launcher="d7925h"), tests=dict(tests=["tvac", "vib", "cal"]), decide=[0, 2, 0], expect="rescued"),
  dict(name="mco_director", m="mco", lang="en", crew=2, mode="director", goal="atm", extra=["relay"],
       build=dict(instr=["pmirr", "uhf"], power="wing1", battery="b450", cpu="cpu1", prop="prop1", comms="hga13"),
       launch=dict(orbit="moi226", tracking="trk1", launcher="d7925"), tests=dict(process="informal", tests=["iface"]), decide=[0, 0, 0, 0], expect="success"),
  dict(name="nile_ar", m="nile", lang="ar", crew=3, mode="engineer", goal="veg", extra=["water"],
       build=dict(bus="u6", instr=["msi"], power="deploy", battery="w40", adcs="rw3", cpu="cots", comms="xb"),
       launch=dict(ground="gs1", orbit="sso550", launcher="ride"), tests=dict(tests=["vib", "ditl", "gstest"]), decide=[0, 0], expect="success"),
]

ONLY = [a.split("=",1)[1] for a in sys.argv if a.startswith("--only=")]
def run():
  errors, results = [], []
  with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    for sc in SC:
      if ONLY and sc["name"] not in ONLY[0].split(","): continue
      n = sc["name"]
      page = b.new_page(viewport={"width": 1440, "height": 900})
      page.on("pageerror", lambda e, n=n: errors.append(f"{n}: PAGEERROR {e}"))
      page.on("console", lambda m, n=n: m.type == "error" and "fonts.g" not in m.text and "ERR_" not in m.text and errors.append(f"{n}: {m.text}"))
      page.goto(URL)
      shot = lambda tag, full=False: TAKE and page.screenshot(path=str(SHOTS / f"{n}_{tag}.png"), full_page=full)
      def ho():
        for _ in range(3):
          if page.locator("#ho-go").count(): page.click("#ho-go"); page.wait_for_timeout(80)
      if sc["lang"] == "ar": page.click('[data-act="lang"]')
      page.click(f'[data-act="crew"][data-n="{sc["crew"]}"]')
      if sc["crew"] > 1: page.fill("#name-0", "Ahmed"); page.fill("#name-1", "Sara")
      page.locator("#name-0").get_attribute("placeholder") or errors.append(n + ": no placeholder"); page.click(f'[data-act="mode"][data-m="{sc["mode"]}"]')
      shot("00_title")
      page.click('[data-act="start"]'); shot("01_cases")
      page.click(f'[data-act="open"][data-id="{sc["m"]}"]'); ho()
      if sc["m"] != "nile":
        page.wait_for_timeout(5500); shot("02_crash")
        page.click('[data-act="next"]'); ho()
        k = page.locator('[data-act="clue"]').count()
        for i in range(k): page.click(f'[data-act="clue"][data-i="{i}"]')
        if sc.get("wrong"): page.locator('[data-act="answer"]').nth(0 if DIAG[sc["m"]][0] != 0 else 1).click(); page.wait_for_timeout(200)
        shot("03_board", True)
        for ans in DIAG[sc["m"]]: page.click(f'[data-act="answer"][data-i="{ans}"]')
        shot("04_solved", True)
        page.click('.solved [data-act="next"]'); ho()
      else:
        page.wait_for_timeout(600); shot("02_intro"); page.click('[data-act="next"]'); ho()
      page.click(f'[data-act="goal"][data-id="{sc["goal"]}"]')
      for x in sc["extra"]: page.click(f'[data-act="extra"][data-id="{x}"]')
      shot("05_objective", True)
      page.click('[data-act="next"]'); ho()
      for slot, v in sc["build"].items():
        page.click(f'[data-act="tab"][data-id="{slot}"]')
        for o in (v if isinstance(v, list) else [v]):
          page.click(f'[data-act="place"][data-slot="{slot}"][data-opt="{o}"]')
      shot("06_build", True)
      if page.locator('[data-act="next"]').is_disabled(): errors.append(f"{n}: build next disabled: {page.locator('.missing').inner_text()}")
      page.click('[data-act="next"]'); ho()
      for slot, v in sc["launch"].items(): page.click(f'[data-act="place"][data-slot="{slot}"][data-opt="{v}"]')
      shot("07_launch", True)
      page.click('[data-act="next"]'); ho()
      for slot, v in sc["tests"].items():
        for o in (v if isinstance(v, list) else [v]): page.click(f'[data-act="place"][data-slot="{slot}"][data-opt="{o}"]')
      shot("08_tests", True)
      page.click('[data-act="to-poll"]'); ho()
      for r in range(4):
        ho()
        go = page.locator('[data-act="vote"][data-v="go"]')
        if go.count() == 0: break
        if r == 0: shot("09_poll", True)
        if go.is_disabled(): errors.append(f"{n}: GO disabled: {page.locator('.pollcard .bad').inner_text()}"); break
        go.click()
      ho()
      if page.locator('[data-act="launch"]').count() == 0: results.append((n, "NOT LAUNCHED")); page.close(); continue
      page.click('[data-act="launch"]', force=True); page.wait_for_timeout(3000); ho()
      page.wait_for_timeout(1500); shot("10_flight")
      page.click('[data-act="skip"]')
      dec = list(sc["decide"])
      for i in range(500):
        if page.locator('#done-slot button').count(): break
        if page.locator('#decision button').count():
          if i < 60: shot("11_decision")
          k = dec.pop(0) if dec else 0; btns = page.locator('#decision button'); btns.nth(min(k, btns.count() - 1)).click()
        page.wait_for_timeout(50)
      page.wait_for_timeout(300); shot("12_flight_end")
      page.click('#done-slot button'); page.wait_for_timeout(700)
      out = page.evaluate("design().result")
      shot("13_closed", True)
      results.append((n, out["outcome"], out["total"], out["stars"], "chal %d/%d" % (sum(1 for c in out["ch"] if c["ok"]), len(out["ch"])), "team", out["team"], "uptime", out["telemetry"]["uptime"], "OK" if out["outcome"] == sc["expect"] else "EXPECTED " + sc["expect"]))
      page.click('[data-act="retry"]'); ho()
      if "objective" not in page.evaluate("stepsFor(mission())[design().step]"): errors.append(f"{n}: retry did not go to objective")
      page.close()
    b.close()
  for r in results: print(r)
  print("ERRORS:", json.dumps(errors, indent=1, ensure_ascii=False) if errors else "none")

run()
