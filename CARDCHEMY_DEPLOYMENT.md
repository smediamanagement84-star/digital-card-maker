# CardChemy Deployment Guide

Complete guide to deploying CardChemy from scratch with Supabase + Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase account (free tier works)
- Google Cloud Console account (for OAuth)

## Part 1: Set Up Supabase Backend

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name:** cardchemy (or your preferred name)
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to your users
4. Click "Create new project"
5. Wait ~2 minutes for database to provision

### Step 2: Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase_schema.sql` from your project
4. Paste into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see success messages for all tables and policies

Verify creation:
```sql
-- Run this to verify tables were created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- You should see: cards, usernames, card_views, network_connections
```

### Step 3: Configure Google OAuth

#### A. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen first if prompted:
   - User Type: **External**
   - App name: **CardChemy**
   - User support email: your email
   - Developer contact: your email
   - Add scopes: `email`, `profile`
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **CardChemy Production**
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://your-domain.vercel.app` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
     - `https://your-domain.vercel.app/auth/callback`
     - `https://*.supabase.co/auth/v1/callback` (Supabase redirect)
7. Save your **Client ID** and **Client Secret**

#### B. Configure in Supabase

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Toggle **Enable**
4. Enter:
   - **Client ID:** (from Google Cloud Console)
   - **Client Secret:** (from Google Cloud Console)
5. Click **Save**

#### C. Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add **Redirect URLs:**
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-actual-domain.vercel.app/auth/callback` (production)
3. Set **Site URL:** `https://your-actual-domain.vercel.app`

### Step 4: Get Supabase API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them for Vercel):
   - **Project URL:** `https://xxx.supabase.co`
   - **anon public key:** `eyJhbG...` (long JWT token)

Keep these secure but note that the anon key is safe to expose in client-side code.

## Part 2: Deploy to Vercel

### Step 1: Push Code to GitHub

If not already done:

```bash
cd /path/to/card-main/card-main
git init
git add .
git commit -m "Initial CardChemy deployment - migrated from Firebase to Supabase"
git branch -M main
git remote add origin https://github.com/yourusername/cardchemy.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (unless in monorepo)
   - **Build Command:** `npm run build` (should auto-detect)
   - **Output Directory:** `dist` (should auto-detect)

### Step 3: Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbG...` | Production, Preview, Development |

**Important:** All variables starting with `VITE_` are exposed to the client. Never put secrets here.

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, you'll get a URL like: `https://cardchemy-xxx.vercel.app`

### Step 5: Update OAuth Redirect URLs

Now that you have your Vercel URL:

1. Go back to **Google Cloud Console** → **Credentials**
2. Edit your OAuth Client
3. Add to **Authorized redirect URIs:**
   - `https://your-actual-vercel-url.vercel.app/auth/callback`
   - `https://your-actual-project-id.supabase.co/auth/v1/callback`
4. Save

5. Go back to **Supabase** → **Authentication** → **URL Configuration**
6. Add your Vercel URL to **Redirect URLs**

## Part 3: Verify Deployment

### Test Checklist

Visit your deployed URL and test:

- [ ] Landing page loads correctly
- [ ] Click "Sign In" → opens auth modal
- [ ] Click "Continue with Google" → redirects to Google
- [ ] Sign in with Google → redirects back to /auth/callback → redirects to /dashboard
- [ ] Dashboard loads without errors
- [ ] Can fill in card details
- [ ] Can save card (check browser console for errors)
- [ ] Visit `/d/your-slug` → card displays
- [ ] QR code generates correctly
- [ ] vCard download works
- [ ] "Add to network" button works (sign in with second account)
- [ ] Network panel shows connections

### Check Supabase Database

1. In Supabase Dashboard, go to **Table Editor**
2. View `cards` table → should see your card data
3. View `usernames` table → should see your slug mapping
4. View `network_connections` (if you tested that feature)

### Monitor Logs

- **Supabase Logs:** Dashboard → Logs → filter by auth/database
- **Vercel Logs:** Project → Deployments → click deployment → Logs tab
- **Browser Console:** F12 → Console tab for client-side errors

## Part 4: Custom Domain (Optional)

### Add Custom Domain to Vercel

1. In Vercel project → **Settings** → **Domains**
2. Click **Add**
3. Enter your domain: `cardchemy.com` or `app.yourdomain.com`
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A records to Vercel IPs (provided in dashboard)
5. Wait for DNS propagation (~5-60 minutes)
6. Vercel will automatically provision SSL certificate

### Update OAuth Redirect URLs

After custom domain is active:

1. **Google Cloud Console:**
   - Add `https://cardchemy.com` to Authorized JavaScript origins
   - Add `https://cardchemy.com/auth/callback` to Authorized redirect URIs

2. **Supabase:**
   - Add `https://cardchemy.com/auth/callback` to Redirect URLs
   - Update Site URL to `https://cardchemy.com`

## Part 5: Ongoing Maintenance

### Monitoring

- **Supabase Dashboard:** Monitor auth, database usage, API calls
- **Vercel Analytics:** Enable in project settings for visitor metrics
- **Error Tracking:** Consider adding Sentry for production errors

### Database Backups

Supabase automatically backs up your database. To manually backup:

1. Supabase Dashboard → **Database** → **Backups**
2. Click **Create backup** for manual snapshot
3. Or use `pg_dump` for local backup:

```bash
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### Scaling

Free tier limits:
- **Supabase:** 500MB database, 50k monthly active users, 2GB bandwidth
- **Vercel:** 100GB bandwidth, unlimited requests, 6000 build minutes/month

Both services auto-scale. Upgrade when needed.

### Updates

To deploy changes:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
# Vercel auto-deploys from main branch
```

## Troubleshooting

### Issue: "Failed to fetch" on API calls

**Solution:**
- Check CORS settings in Supabase (should allow your domain)
- Verify environment variables are set correctly in Vercel
- Check browser console for specific error messages

### Issue: Google OAuth redirect fails

**Solution:**
- Verify redirect URIs match exactly in Google Cloud Console
- Check Supabase redirect URLs include your domain
- Make sure Site URL is set in Supabase
- Clear browser cache/cookies and try again

### Issue: "Row Level Security policy violation"

**Solution:**
- Verify RLS policies were created (run `supabase_schema.sql` again)
- Check user is authenticated before database operations
- Review Supabase logs for specific policy that failed

### Issue: Build fails on Vercel

**Solution:**
- Check build logs for specific error
- Verify all dependencies are in `package.json`
- Make sure environment variables are set
- Try building locally: `npm run build`
- Check Node version matches (Vercel uses Node 18+ by default)

### Issue: Card not saving

**Solution:**
- Open browser DevTools → Console for errors
- Check Supabase → Logs → look for failed inserts/updates
- Verify user is authenticated (`user` object exists)
- Check RLS policies allow the operation

## Production Checklist

Before going live:

- [ ] Custom domain configured (optional but recommended)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Google OAuth tested with multiple accounts
- [ ] Database schema deployed and verified
- [ ] Environment variables set in Vercel
- [ ] All features tested in production
- [ ] Error monitoring set up (optional)
- [ ] Analytics enabled (optional)
- [ ] Backup strategy confirmed
- [ ] Terms of Service / Privacy Policy added (if collecting user data)
- [ ] Meta tags/OG images for social sharing

## Support Resources

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Google OAuth:** [developers.google.com/identity](https://developers.google.com/identity)
- **CardChemy Issues:** GitHub repository issues page

---

**Congratulations!** CardChemy is now live. Share your card at `https://your-domain.vercel.app/d/your-slug` 🎉
