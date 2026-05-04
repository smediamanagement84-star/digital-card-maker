# Digital Card Maker

Create beautiful, shareable digital business cards in under 2 minutes. Perfect for students, professionals, and event networking. Built with React 19 + Firebase + Vite.

**Production URL:** https://card-main-drab.vercel.app
**GitHub:** https://github.com/smediamanagement84-star/digital-card-maker
**Status:** Production Ready - KU Hackathon 2026

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
- **Auth:** Firebase Auth (Google Sign-In with popup/redirect)
- **Database:** Cloud Firestore (`cards/{id}` + `usernames/{slug}`)
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
  firebase.ts          # Firebase init, Google/phone helpers
  components/
    Landing.tsx        # marketing hero + sample link
    AuthModal.tsx      # Google + phone OTP flow
    Dashboard.tsx      # authenticated card editor
    CardView.tsx       # public profile at /d/:slug
    Navbar.tsx
firestore.rules        # owner-only writes, public reads, slug uniqueness
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

## Firestore Security

Cards are publicly readable by slug, writable only by their owner. Slug uniqueness is enforced via atomic writes to a separate `usernames` collection. See `firestore.rules` for complete rules.
