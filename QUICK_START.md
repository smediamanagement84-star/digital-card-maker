# CardChemy Quick Start Guide

## 🎯 You're Almost There!

The migration from Firebase to Supabase + EliteCard to CardChemy is **COMPLETE**.

All code has been updated, tested, and is ready to deploy.

## ⚡ Deploy in 15 Minutes

### Step 1: Create Supabase Account (2 min)
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create new project called "cardchemy"
4. Save your database password

### Step 2: Set Up Database (3 min)
1. In Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Open `supabase_schema.sql` from this project
4. Copy all content and paste into SQL Editor
5. Click "Run" → Database ready! ✅

### Step 3: Configure Google OAuth (5 min)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth credentials (see `CARDCHEMY_DEPLOYMENT.md` for details)
3. In Supabase → Authentication → Providers → Enable Google
4. Paste your Google Client ID and Secret
5. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://*.supabase.co/auth/v1/callback`

### Step 4: Deploy to Vercel (5 min)
1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "CardChemy v1.0 - Ready for production"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables:
   - `VITE_SUPABASE_URL` = (from Supabase Settings → API)
   - `VITE_SUPABASE_ANON_KEY` = (from Supabase Settings → API)
5. Click "Deploy"

### Step 5: Test (2 min)
1. Visit your Vercel URL
2. Click "Sign In"
3. Authenticate with Google
4. Create your card
5. Share it! 🎉

## 📁 Project Structure

```
card-main/
├── src/
│   ├── supabase.ts           # ← Supabase configuration
│   ├── components/
│   │   ├── AuthCallback.tsx  # ← OAuth handler
│   │   ├── Dashboard.tsx     # ← Updated for Supabase
│   │   └── ...
│   └── ...
├── supabase_schema.sql        # ← Run this in Supabase
├── CARDCHEMY_DEPLOYMENT.md    # ← Detailed deployment guide
├── MIGRATION_GUIDE.md         # ← Technical migration details
└── .env.example               # ← Environment variables template
```

## 🔧 Local Development

### Setup
```bash
# 1. Create .env.local
cp .env.example .env.local

# 2. Add your Supabase credentials to .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

# 3. Install dependencies (if not already done)
npm install

# 4. Start development server
npm run dev
```

### Available Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # TypeScript type checking
```

## ✅ What's Changed

### Technology
- ✅ Firebase → Supabase (PostgreSQL + Auth)
- ✅ Firestore → PostgreSQL with Row Level Security
- ✅ Firebase Auth → Supabase OAuth
- ✅ Stronger type safety with TypeScript

### Branding
- ✅ EliteCard → CardChemy
- ✅ Updated all UI text and meta tags
- ✅ New tagline: "Transform your professional presence into digital gold"

### Features (All Working)
- ✅ Google OAuth sign-in
- ✅ Create & edit digital business cards
- ✅ Student & professional profiles
- ✅ 14+ theme options
- ✅ QR code generation
- ✅ vCard download
- ✅ Network/connections feature
- ✅ Public shareable URLs (`/d/your-slug`)
- ✅ Mobile responsive & PWA ready

## 📚 Need More Details?

- **Deployment:** See `CARDCHEMY_DEPLOYMENT.md`
- **Migration Info:** See `MIGRATION_GUIDE.md`
- **Technical Details:** See `MIGRATION_COMPLETE.md`
- **Environment Variables:** See `.env.example`

## 🆘 Troubleshooting

### Build Errors
```bash
# Clean rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Auth Not Working
1. Check environment variables are set in Vercel
2. Verify Google OAuth redirect URLs match exactly
3. Check Supabase redirect URLs include your domain

### Database Errors
1. Make sure `supabase_schema.sql` was run successfully
2. Check Supabase logs for specific errors
3. Verify RLS policies were created

## 🎉 You're Done!

CardChemy is ready to launch. Follow the 5 steps above and you'll be live in 15 minutes.

**Questions?** Check the detailed guides or Supabase/Vercel documentation.

---

**Built with:** React 19 + TypeScript + Tailwind CSS + Supabase + Vercel

**Version:** 1.0.0

**License:** Apache 2.0
