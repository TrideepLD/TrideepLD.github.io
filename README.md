# your-username.github.io

A single-page, terminal/cyber-styled resume site: black background, acid-lime
green (#39FF14) accents, sticky tab navigation, ambient audio with a mute
toggle, and a "boot sequence" intro screen.

## Files

```
index.html      structure & content
style.css       all styling (colors, layout, animations)
script.js       boot sequence, tab switching, mute toggle, skills carousel
assets/
  ambient.mp3   placeholder ambient loop (synthesized — swap for your own)
```

## Running it locally

Just open `index.html` in a browser, or serve the folder so relative paths
behave the same as on GitHub Pages:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Create a repo named `your-username.github.io` (replace with your actual
   GitHub username).
2. Copy these files into the repo root (so `index.html` is at the top level).
3. Commit and push to the `main` branch.
4. In the repo's **Settings → Pages**, set the source to `main` /
   `(root)` if it isn't already detected automatically.
5. Your site will be live at `https://your-username.github.io/` within a
   few minutes.

## What to customize

- **Name / title** — search for `ALEX_MORGAN` / `ALEX` / `_MORGAN` in
  `index.html` (logo, page `<title>`, boot screen text, footer).
- **Projects** — three `<article class="card">` blocks inside
  `#projects`. Each has a tag (`[ PROJECT_01 ]`), title, tech chips,
  paragraphs, a bullet list, and footer links. Add/remove `<article>`
  blocks freely — the grid adjusts automatically.
- **Experience** — three `<article class="timeline-entry">` blocks inside
  `#experience`, each with a date range, title, paragraph, and bullets.
- **Skills carousel** — `.skill-card` blocks inside `#skills-track`. Each
  is a category (title + list). Add more cards and the left/right arrows
  will keep working — `script.js` calculates scroll distance dynamically.
- **Tools marquee** — the scrolling strip of `.tool-badge` items near the
  bottom of the Tools & Skills panel. **The badge list is duplicated once**
  in the HTML so the loop is seamless — if you add/remove tools, edit
  **both** copies identically.
- **Footer / contact links** — update the `mailto:`, GitHub, and LinkedIn
  URLs in the `<footer class="site-footer">` block.
- **Adding new sections** — to add a 4th tab (e.g. "Writing" or
  "Education"):
  1. Add a new `<button class="tab" data-target="your-id">` in `.tabs`.
  2. Add a new `<section id="your-id" class="panel">` inside `<main>`.
  No JS changes needed — the tab/panel switching is generic.

## Audio

`assets/ambient.mp3` is a synthesized placeholder ambient drone (~24s,
loops). Replace it with your own track:

- Keep the filename `assets/ambient.mp3`, **or**
- Update the `<source src="...">` path inside the `<audio id="bg-audio">`
  tag in `index.html`.

Browsers block autoplay-with-sound until the user interacts with the page —
that's why audio starts only after the "ENTER_SITE" click on the boot
screen. The mute icon (top right) toggles `audio.muted` and swaps between
the sound-on / sound-off icons.

## Accessibility / motion

- All interactive elements (tabs, arrows, mute button, enter button) are
  real `<button>`/`<a>` elements with visible focus states.
- `prefers-reduced-motion` disables the marquee scroll, panel fade-ins, and
  the blinking cursor for users who request reduced motion.
