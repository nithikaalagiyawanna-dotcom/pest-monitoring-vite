# Pest Monitoring (React + Vite)

A simple, fast, and deploy-ready web app for visualizing pest monitoring bait stations on a map with Supabase auth & data.

## Stack
- React + TypeScript (Vite)
- Tailwind CSS
- React Router
- Supabase JS client
- Leaflet + React Leaflet

## Quick Start

```bash
npm i
cp .env.example .env.local
# paste your Supabase values inside .env.local
npm run dev
```

Open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel (Static)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

`vercel.json` already includes a SPA rewrite so deep-links like `/map` and `/dashboard` work.

## Supabase
Create two tables `stations` and `events` and enable RLS. Example SQL:
```sql
create table if not exists stations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  lat double precision not null,
  lng double precision not null,
  status text not null default 'ok' check (status in ('ok','bait_missing','consumed','trapped')),
  last_checked_at timestamptz
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  station_id uuid references stations (id) on delete cascade,
  type text not null check (type in ('bait_missing','consumed','trapped')),
  count integer not null default 1,
  created_at timestamptz not null default now()
);

alter table stations enable row level security;
alter table events enable row level security;

create policy "read stations" on stations for select using (true);
create policy "update stations" on stations for update using (auth.role() = 'authenticated');

create policy "read events" on events for select using (true);
create policy "insert events" on events for insert with check (auth.role() = 'authenticated');
```

## Notes
- This project is client-only (no server routes). If you need server-side logic later, add Vercel Functions or Supabase Edge Functions.
- The map centers to Colombo by default; update coordinates in `src/pages/Map.tsx`.
