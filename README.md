# فرقة العاشرة — Interactive Leadership Presentation

Premium cinematic presentation for Scout troop leadership.

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Controls

- `→` / `↓` / `Space` / `PageDown` — next
- `←` / `↑` / `Backspace` / `PageUp` — previous
- `T` — Table of Contents
- `1`–`4` — jump to major sections
- Mouse wheel — secondary navigation (thresholded)
- Click TOC items / mini section links — jump

## Edit content

All presentation text lives in:

`src/content/presentation.ts`

- `presentationTitle` — leave empty until finalized
- `closingStatement` — leave empty until finalized
- SWOT, Vision, Plan, Cadre — edit only there

## Stack

- React + TypeScript + Vite
- Framer Motion
- IBM Plex Sans Arabic + Outfit
