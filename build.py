import pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
css = (src / "styles.css").read_text()
order = ["data.js", "art.js", "stage.js", "logic.js", "missions2.js", "missions3.js", "engine.js", "scenes.js", "orbi.js", "ui.js", "report.js"]
js = "\n".join((src / f).read_text() for f in order)
html = f"""<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Second Chance: Space Mission Rescue</title>
<meta name="description" content="Real NASA missions failed. Investigate, redesign the spacecraft and fly it again with Orbi, your robot assistant. 1 to 4 players, all ages, English and Arabic.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='17' r='12' fill='%23C9C2FF' stroke='%231B1650' stroke-width='2'/%3E%3Crect x='9' y='12' width='14' height='9' rx='4' fill='%231B1650'/%3E%3Ccircle cx='13' cy='16.5' r='1.8' fill='%233DDBA4'/%3E%3Ccircle cx='19' cy='16.5' r='1.8' fill='%233DDBA4'/%3E%3Ccircle cx='16' cy='3' r='2' fill='%23FFC83D'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
<div id="app"></div>
<div id="orbi"></div>
<div id="overlay" hidden></div>
<script>
{js}
</script>
</body>
</html>
"""
out = root / "dist" / "index.html"
out.write_text(html)
print(out, len(html))
