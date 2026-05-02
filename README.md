# Skills Catalog

A full-stack Skills Catalog web application built with Next.js 14, Tailwind CSS, and TypeScript. Features a dark-themed UI with real-time search, category filtering, and skill detail pages.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects automatically to `/catalog`.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (dark theme)
- **Language:** TypeScript
- **Data:** Static JSON (`/data/skills.json`)

## Pages

| Route | Description |
|---|---|
| `/catalog` | Skills catalog with search and category filters |
| `/catalog/:skillId` | Skill detail page with copy prompt and file list |

## Features

- Real-time search by name, description, and author
- Category filter pills (Tools, Business, Development, Testing & Security, etc.)
- Live skill count updates as filters change
- Copy Prompt button with toast confirmation
- Responsive grid: 4 cols desktop, 2 tablet, 1 mobile
- Static JSON data — no database or external APIs required

## No environment variables required.
