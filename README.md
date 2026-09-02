# OKLCH Ramp Studio

Generate perceptual colour ramps in OKLCH. Any number of shades from 50 to 950,
every step clamped to sRGB, every step contrast-checked, exportable as JSON.

**[Live demo](https://YOUR-USERNAME.github.io/oklch-ramp-studio/)**

A single self-contained HTML file. No build step, no dependencies, no network
calls except Google Fonts.

## What it does

Enter a brand colour and it produces a full tonal ramp built on the real sRGB
gamut boundary, computed per lightness and hue rather than looked up in a fixed
band.

- **Any step count** — 2 to 50. The canonical label sets are used for 5, 9 and
  11 steps; other counts interpolate evenly across 50 → 950.
- **sRGB only** — each step's chroma is binary-searched to the gamut boundary,
  so no value can spill into Display-P3. The header badge re-verifies every step
  on each render.
- **Contrast built in** — APCA `Lc` and WCAG 2 ratios against white, black and a
  colour of your choosing, with a direction toggle (APCA is polarity-sensitive).
- **Exports** — JSON, compact JSON, CSS custom properties, Tailwind v4 `@theme`,
  and Figma design tokens. Full JSON round-trips losslessly back into the tool.

## Two generators

**V1** centres the ramp on your seed's lightness and spreads outward.

**V2** treats step 500 as the primary: it is pinned to the most chroma available
at any lightness that still clears your contrast bar against white or black,
while keeping the lightness ladder balanced.

Worth knowing about V2: at AAA (7:1) there is a dead zone between roughly
**L 0.464 and L 0.670** where neither white nor black text passes. Step 500 is
therefore always placed outside it — in practice on the dark side, with white
text, which also keeps the ladder balanced across every hue.

## Why not a fixed "optimal chroma" range

The sRGB ceiling depends on both lightness and hue, so a hue-blind band is wrong
in both directions. At hue 207° nothing above `C 0.146` exists at *any*
lightness, making a 25% cap unreachable; at hue 330° the gamut runs to
`C 0.317`, making the same cap needlessly strict. At `L 0.10`, hue 207°, the real
ceiling is `C 0.017` — a colour at `C 0.30` is not slightly over, it is roughly
seventeen times over. Everything the built-in advisor reports is measured against
the boundary for the actual lightness and hue in use.

## Running it

Open `index.html` in a browser. That is all.

To publish on GitHub Pages: Settings → Pages → deploy from branch, root folder.

## Development

`index.html` is generated from `src/artifact-body.html` by `build.js`. The source
omits the `<!doctype>`/`<head>` skeleton because it is also published as a hosted
artifact where that wrapper is injected automatically; the build script adds the
standalone equivalent.

```
node build.js
```

Edit the source, not `index.html`.

## Licence

MIT
