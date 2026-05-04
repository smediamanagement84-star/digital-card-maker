# CardChemy

Transform your professional presence into digital gold. Create beautiful, shareable digital business cards in under 2 minutes. Perfect for students, professionals, and event networking. Built with React 19 + Supabase + Vercel.

**Production URL:** https://cardchemy.vercel.app (or your-custom-domain.vercel.app)
**GitHub:** https://github.com/smediamanagement84-star/cardchemy
**Status:** Production Ready v1.0 - Powered by Supabase & Vercel

## Features

- One-click Google Sign-In
- Custom card themes
- QR code generation
- vCard export (download contacts)
- Public shareable URLs (/d/your-slug)
- Mobile-optimized and responsive
- Real-time preview
- Photo uploads
- Social links integration

## Stack

- **Frontend:** React 19, React Router 7, TypeScript, Tailwind v4, Motion
- **Auth:** Supabase Auth (Google OAuth with automatic redirects)
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **Storage:** Vercel Blob (for future photo uploads) + Base64 (current)
- **Build:** Vite 6 with code-splitting
- **Hosting:** Vercel (auto-deploy from `main` branch)

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build    # production build into dist/
```

## Project layout

```
src/
  App.tsx              # auth context + router
  supabase.ts          # Supabase init, auth helpers
  components/
    Landing.tsx        # marketing hero + sample link
    AuthModal.tsx      # Google OAuth flow
    AuthCallback.tsx   # OAuth redirect handler
    Dashboard.tsx      # authenticated card editor
    CardView.tsx       # public profile at /d/:slug
    Navbar.tsx
    NetworkPanel.tsx   # user connections/network
supabase_schema.sql    # PostgreSQL schema with RLS policies
vercel.json            # build config, security headers, SPA rewrites
```

## Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide and architecture
- **[FEATURES.md](FEATURES.md)** - Comprehensive feature list and specifications
- **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Full QA checklist (150+ tests)
- **[HACKATHON_DEMO.md](HACKATHON_DEMO.md)** - Demo script and presentation guide

## Quick Start

### Local Development
```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # TypeScript type checking
npm run build    # Production build
```

### Deploy to Vercel
```bash
vercel          # Preview deployment
vercel --prod   # Production deployment
```

Or push to `main` branch for automatic deployment.

## Database Security

Cards are publicly readable by slug, writable only by their owner. Row Level Security (RLS) policies enforce that users can only modify their own cards. Slug uniqueness is enforced via UNIQUE constraint. See `supabase_schema.sql` for complete schema and policies.

## Environment Variables

Create a `.env.local` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Vercel Blob (for future photo uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

## Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, run the contents of `supabase_schema.sql`
3. Go to Authentication → Providers → Enable Google OAuth
4. Add your production URL to allowed redirect URLs

### 2. Configure Environment Variables
1. Copy Supabase URL and anon key from project settings
2. Add to `.env.local` for local development
3. Add to Vercel environment variables for production

### 3. Deploy to Vercel
```bash
vercel          # Preview deployment
vercel --prod   # Production deployment
```

Or connect your GitHub repo to Vercel for automatic deployments.
