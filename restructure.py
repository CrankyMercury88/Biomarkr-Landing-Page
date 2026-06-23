import os, re, shutil, sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'
os.chdir(ROOT)

# old .html  ->  (folder name, clean url)
MOVES = {
    'inflammation.html': ('inflammation', '/inflammation'),
    'technology.html':   ('technology',   '/technology'),
    'cytokine.html':     ('cytokines',    '/cytokines'),
    'faq.html':          ('faq',          '/faq'),
    'practice.html':     ('use-cases',    '/use-cases'),
}

SKIP = ('http://','https://','/','#','mailto:','tel:','data:')

def absolutize(html):
    """Prepend / to relative src/href values so the page works from any folder depth."""
    def repl(m):
        attr, q, val = m.group(1), m.group(2), m.group(3)
        if val.startswith(SKIP):
            return m.group(0)
        return f'{attr}={q}/{val}{q}'
    return re.sub(r'\b(src|href)=(["\'])([^"\']+)\2', repl, html)

STUB = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url={url}">
<link rel="canonical" href="https://biomarkr.health{url}">
<title>Redirecting…</title>
</head>
<body><p>This page has moved to <a href="{url}">{url}</a>.</p></body>
</html>
"""

# 1) Home: stays at root, just fix its relative paths to absolute.
with open('index.html', encoding='utf-8') as f:
    html = f.read()
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(absolutize(html))
print("fixed paths  : index.html (stays at root, serves /)")

# 2) Move the five subpages into folders as index.html, fix paths, leave a redirect stub.
for old, (folder, url) in MOVES.items():
    with open(old, encoding='utf-8') as f:
        html = f.read()
    os.makedirs(folder, exist_ok=True)
    with open(os.path.join(folder, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(absolutize(html))
    os.remove(old)
    with open(old, 'w', encoding='utf-8') as f:   # redirect stub at the OLD path
        f.write(STUB.format(url=url))
    print(f"moved + stub : {old:<20} -> {folder}/index.html   (serves {url})")

# 3) Patch the shared nav/footer file: rewrite every .html link to its clean URL.
NAV_FIX = {
    "'index.html'": "'/'",          '"index.html"': '"/"',
    "'technology.html'": "'/technology'",
    "'inflammation.html'": "'/inflammation'",
    "'practice.html'": "'/use-cases'",
    "'cytokine.html'": "'/cytokines'",  '"cytokine.html"': '"/cytokines"',
    "'faq.html'": "'/faq'",             '"faq.html"': '"/faq"',
}
with open('chrome.jsx', encoding='utf-8') as f:
    js = f.read()
for a, b in NAV_FIX.items():
    js = js.replace(a, b)
with open('chrome.jsx', 'w', encoding='utf-8') as f:
    f.write(js)
print("patched nav  : chrome.jsx (all menu/footer/logo links -> clean URLs)")
