# OpenSpot Frontend

Next.js App Router + TypeScript + Tailwind dashboard for real-time parking availability.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

- **`app/`** — Next.js App Router
  - `layout.tsx` — Root layout and metadata
  - `page.tsx` — Dashboard page (garage state, tabs, parking cards)
  - `globals.css` — Tailwind and CSS variables (e.g. UT red, page background)
- **`components/`** — React components
  - `HeaderCard.tsx` — Logo, title, subtitle, tagline
  - `GarageTabs.tsx` — Grand / Sykes / West tab selector
  - `ParkingCard.tsx` — Reusable student/faculty card (icon, status, count, progress bar)
  - `StatusBadge.tsx` — “Available” / “Nearly full” / “Full” pill
  - `LastUpdatedCard.tsx` — “Last Updated: …” with clock icon
  - `TrendsButton.tsx` — “View Parking Trends” CTA
- **`lib/`** — Data and helpers
  - `types.ts` — `Garage`, `GarageId`, `ParkingCounts`, `ParkingStatus`
  - `data.ts` — Mock garage data; replace with API calls later
  - `utils.ts` — `getAvailablePercent`, `getStatus`, `formatTime`

## Environment setup

### Local

Create `frontend/.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Vercel

In the Vercel project settings for this frontend, add these environment variables for both `Preview` and `Production`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

After changing Vercel environment variables, trigger a redeploy so the new values are available to the app.

## Connecting a backend

- Swap `getGarageData(selectedGarage)` in `app/page.tsx` for a `fetch` (or React Query) to your API.
- Optionally add polling or Supabase real-time so “Last Updated” and counts stay in sync.
