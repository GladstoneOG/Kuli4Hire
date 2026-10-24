# Kuli4Hire — Prototype

P2P marketplace connecting clients with skilled tradespeople and builders in Indonesia/Southeast Asia, with escrow protection and location-based discovery.

## Features Built
- **Superprof-style Discovery**: Instant search by Trade Category (Tukang Bangunan, Cat, Las, Ledeng, Listrik, Mandor) and Location.
- **Radius & Rate Filtering**: Live distance filter (2–25 km), daily rate slider, minimum rating, and KTP verification filter.
- **Dual View**: Toggle between responsive Grid View and interactive Map View with pin selection.
- **Worker Profiles**: Daily rates, skill tags, tool inventory, past project portfolio photos, and verified reviews.
- **Escrow Booking Flow**: Live calculator (labor cost + 10% platform fee), simulated QRIS & BCA Virtual Account payment modal.
- **Escrow Dashboard**: Track ongoing jobs, inspect escrow deposit amounts, and trigger 90% net payout release upon completion.
- **Post a Job**: Broadcast project requests to nearby workers.
- **Join as Tradesperson**: Fast onboarding for workers to list their trade, rates, and KTP.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel
1. Push repository to GitHub.
2. Import project in [Vercel](https://vercel.com).
3. Framework preset: `Next.js` (Zero configuration needed).

## Supabase Schema
The SQL schema for PostgreSQL with PostGIS distance matching is located at `supabase/schema.sql`. Paste it directly into the Supabase SQL Editor when ready to connect real data.
