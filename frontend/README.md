# OpenSpot Frontend

Next.js App Router + TypeScript + Tailwind dashboard for real-time parking availability.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `frontend/.env.local`:

```env
# Backend API (live Grand student counts)
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# Supabase Auth (browser — use the anon key only)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

For Vercel, add the same variables (`NEXT_PUBLIC_*`) on the frontend project.

## Authentication

Email/password auth uses Supabase Auth from the browser (`@supabase/supabase-js`). Routes:

- `/login` — sign in with email and password
- `/signup` — register with full name, email, password

The dashboard live parking fetch (`getGarageStatus` / `NEXT_PUBLIC_API_URL`) is unchanged and does not go through Supabase for parking data.

## Project layout

- **`app/`** — Next.js App Router
  - `layout.tsx` — Root layout, fonts, global `AuthProvider`
  - `page.tsx` — Dashboard (live Grand student row + mock where applicable)
  - `login/page.tsx`, `signup/page.tsx` — auth screens
  - `globals.css` — Tailwind and CSS variables (e.g. UT red, page background)
- **`components/`** — UI including `auth/` for Supabase session UI
- **`lib/`** — Data helpers, `supabase.ts` client, validation and auth error helpers
