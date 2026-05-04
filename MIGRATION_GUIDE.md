# Migration Guide: Firebase → Supabase + EliteCard → CardChemy

## What Changed

### 🔄 Complete Technology Migration
**FROM:** Firebase Auth + Firestore + Firebase Storage
**TO:** Supabase Auth + PostgreSQL + Vercel Blob

### 🎨 Brand Refresh
**FROM:** EliteCard
**TO:** CardChemy (Transform your professional presence into digital gold)

## Breaking Changes

### 1. Authentication
- **Old:** Firebase Auth with `user.uid`, `user.displayName`, `user.photoURL`
- **New:** Supabase Auth with `user.id`, `user.user_metadata.full_name`, `user.user_metadata.avatar_url`

### 2. Database Structure
- **Old:** Firestore collections (`cards`, `usernames`, `users/{uid}/connections`)
- **New:** PostgreSQL tables with snake_case columns (`cards`, `usernames`, `network_connections`)

### 3. Data Format
- **Old:** `camelCase` field names
- **New:** `snake_case` column names (e.g., `userType` → `user_type`)

### 4. Environment Variables
**Old:**
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

**New:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## For Users

### Important Notes
- **Existing users will need to re-authenticate** (can't migrate Firebase sessions to Supabase)
- **All data from old Firebase instance needs manual export/import**
- **No automatic data migration** - fresh start with new database

### What to Do
1. Sign in again with Google OAuth (your Google account is the same)
2. Recreate your card (if you had one before)
3. Your old card data is not automatically transferred

## For Developers

### Setup New Infrastructure

#### 1. Create Supabase Project
```bash
# 1. Go to https://supabase.com
# 2. Click "New Project"
# 3. Choose organization, name: "cardchemy" or similar
# 4. Wait for database to provision (~2 minutes)
```

#### 2. Run Database Schema
```bash
# In Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Click "New Query"
# 3. Paste contents of supabase_schema.sql
# 4. Click "Run"
```

#### 3. Configure Google OAuth
```bash
# In Supabase Dashboard:
# 1. Go to Authentication → Providers
# 2. Enable "Google"
# 3. Add your Google OAuth credentials
# 4. Add authorized redirect URLs:
#    - http://localhost:3000/auth/callback (development)
#    - https://your-domain.vercel.app/auth/callback (production)
```

#### 4. Get API Keys
```bash
# In Supabase Dashboard:
# 1. Go to Settings → API
# 2. Copy "Project URL" (VITE_SUPABASE_URL)
# 3. Copy "anon public" key (VITE_SUPABASE_ANON_KEY)
```

#### 5. Configure Environment Variables

**Local Development (.env.local):**
```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Production (Vercel):**
```bash
# Go to Vercel project settings
# Navigate to Environment Variables
# Add:
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Key Code Changes

#### Auth Pattern
**Before (Firebase):**
```typescript
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  console.log(user.uid, user.displayName);
});
```

**After (Supabase):**
```typescript
import { supabase } from './supabase';

supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user;
  console.log(user.id, user.user_metadata.full_name);
});
```

#### Database Query Pattern
**Before (Firestore):**
```typescript
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const q = query(collection(db, 'cards'), where('uid', '==', userId));
const snap = await getDocs(q);
const cards = snap.docs.map(d => d.data());
```

**After (Supabase):**
```typescript
import { supabase } from './supabase';

const { data: cards, error } = await supabase
  .from('cards')
  .select('*')
  .eq('uid', userId);
```

#### Database Insert Pattern
**Before (Firestore):**
```typescript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

await addDoc(collection(db, 'cards'), {
  name: 'John Doe',
  createdAt: serverTimestamp()
});
```

**After (Supabase):**
```typescript
const { data, error } = await supabase
  .from('cards')
  .insert({
    name: 'John Doe',
    created_at: new Date().toISOString()
  });
```

### Data Migration (if needed)

If you need to migrate existing Firebase data:

#### 1. Export from Firebase
```typescript
// Run this script to export Firebase data
import { db } from './old-firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

async function exportCards() {
  const snap = await getDocs(collection(db, 'cards'));
  const cards = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  fs.writeFileSync('cards-export.json', JSON.stringify(cards, null, 2));
}
```

#### 2. Transform Data Format
```typescript
// Convert camelCase to snake_case
const transformed = cards.map(card => ({
  uid: card.uid,
  user_type: card.userType,
  theme_id: card.themeId,
  // ... map all fields
}));
```

#### 3. Import to Supabase
```typescript
import { supabase } from './supabase';

async function importCards(cards) {
  for (const card of cards) {
    await supabase.from('cards').insert(card);
  }
}
```

### Testing Checklist

After migration:

- [ ] Sign in with Google works
- [ ] Can create new card
- [ ] Can edit existing card
- [ ] Can view card at `/d/:slug`
- [ ] Can add card to network
- [ ] Network panel shows connections
- [ ] QR code generation works
- [ ] vCard download works
- [ ] Photo upload works (base64)
- [ ] All themes display correctly
- [ ] Mobile responsive
- [ ] OAuth redirect works in production

### Rollback Plan

If you need to rollback:

1. Revert to previous commit (before migration)
2. Restore Firebase environment variables
3. Redeploy to Vercel

```bash
git revert HEAD
git push origin main
# Update Vercel env vars back to Firebase
vercel --prod
```

## Benefits of New Stack

### Supabase vs Firebase
- ✅ PostgreSQL (more powerful queries, joins, full SQL)
- ✅ Built-in Row Level Security
- ✅ Better free tier (500MB database, 50k monthly active users)
- ✅ Real-time subscriptions included
- ✅ No vendor lock-in (can self-host)
- ✅ Simpler pricing model

### Developer Experience
- ✅ Type-safe queries with TypeScript
- ✅ Standard SQL instead of Firestore queries
- ✅ Better local development with Docker
- ✅ Migration system for schema changes
- ✅ Built-in auth with multiple providers

## Support

If you encounter issues:

1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test Google OAuth credentials
5. Review RLS policies in Supabase

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Migration completed:** 2026-05-04
**Version:** CardChemy v1.0
**Stack:** React 19 + Supabase + Vercel
