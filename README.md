# Learning Academies Platform

A single platform hosting two independent mastery academies.

## Programs

1. **ERP Developer Mastery Academy** — original developer training (unchanged)
2. **Product Owner Mastery Academy** — separate Product Ownership / Agile / Scrum program

Open **http://localhost:5180/** and choose a program on the selection screen.

## Progress storage (independent)

| Program | localStorage key |
|---------|------------------|
| ERP Developer Mastery Academy | `erp-academy-progress` |
| Product Owner Mastery Academy | `po-academy-progress` |
| Selected program (gate only) | `academy-selected-program` |

Switching programs does **not** clear either academy's progress.

## Quick Start

```powershell
cd e:\Platform\erp-dev-academy
npm install
npm run dev
```

> Port **5180** (not 5173).

## Build

```powershell
npm run build
npm run preview
```

## Structure

- `src/` — original ERP Developer Academy (curriculum, pages, store, tools)
- `src/po/` — Product Owner Academy (separate curriculum, pages, store, i18n)
- `src/erp/ErpApp.tsx` — ERP route shell
- `src/po/PoApp.tsx` — PO route shell
- `src/programs/` — program selection screen and switcher
