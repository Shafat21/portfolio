# Supabase Keepalive - Quick Start Guide

## ✅ What Was Added

Your portfolio now has **3 layers of protection** against Supabase database pausing:

### 1. Vercel Cron Job (Automatic) 🤖
- **File:** `vercel.json`
- **Runs:** Every 12 hours
- **Endpoint:** `/api/cron`
- **Status:** ✅ Ready (activates when deployed to Vercel)

### 2. Client-Side Hook (User-Activated) 👥
- **File:** `hooks/useSupabaseKeepalive.ts`
- **Active:** When users visit your homepage
- **Frequency:** Every 6 hours
- **Status:** ✅ Integrated in `app/page.tsx`

### 3. API Endpoints (Manual/External) 🔧
- **File:** `app/api/keepalive/route.ts`
- **Usage:** Manual or external cron services
- **Status:** ✅ Available at `/api/keepalive`

## 🚀 Setup (Choose One or More)

### Option 1: Vercel Cron (Recommended - Automatic)

**Requirements:** Deploy to Vercel

```bash
# Just deploy - it's automatic!
vercel --prod
```

That's it! Vercel will automatically run `/api/cron` every 12 hours.

### Option 2: External Cron Service (Free Alternative)

**Use:** [cron-job.org](https://cron-job.org) (free)

1. Sign up at cron-job.org
2. Create new cron job:
   - **URL:** `https://your-domain.com/api/keepalive`
   - **Schedule:** Every 12 hours
   - **Method:** GET
3. Save and activate

### Option 3: Client-Side Only (Already Active!)

✅ Already integrated in your homepage!

When users visit your site, it will automatically ping the database every 6 hours.

## 🧪 Testing

### Test Locally

```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2: Test endpoints
curl http://localhost:3000/api/keepalive
curl http://localhost:3000/api/cron
```

### Test in Production

```bash
# After deploying
curl https://your-domain.com/api/keepalive
curl https://your-domain.com/api/cron
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database is active",
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

## 📊 How It Works

### Lightweight Queries
Each keepalive makes minimal queries:
```typescript
// Just counts records - very fast!
supabase.from('projects').select('count', { count: 'exact', head: true })
```

### Frequency Schedule
- **Vercel Cron:** Every 12 hours (automatic)
- **Client Hook:** Every 6 hours (when site is open)
- **External Cron:** Your choice (recommend 12-24 hours)

### Data Usage
- **Per keepalive:** ~1KB
- **Daily:** ~2KB (2 pings)
- **Yearly:** ~730KB (well within free tier)

## 🎯 Recommended Setup

**Best Approach (Triple Protection):**

1. ✅ Deploy to Vercel → Automatic cron
2. ✅ Homepage hook → Active (already done!)
3. ✅ External cron → Backup via cron-job.org

This ensures your database **never pauses**!

## 📁 Files Created

```
portfolio/
├── app/
│   ├── page.tsx (✅ Updated with hook)
│   └── api/
│       ├── keepalive/route.ts (✅ New)
│       └── cron/route.ts (✅ New)
├── hooks/
│   └── useSupabaseKeepalive.ts (✅ New)
├── vercel.json (✅ New - Cron config)
├── SUPABASE_KEEPALIVE.md (✅ Detailed guide)
└── KEEPALIVE_QUICK_START.md (✅ This file)
```

## ✅ Build Status

**Build:** ✅ Successful

New routes added:
- `/api/keepalive` - Simple ping endpoint
- `/api/cron` - Comprehensive health check

## 🔒 Optional: Add Authentication

Secure your cron endpoint:

```env
# Add to .env
CRON_SECRET=your-random-secret-key-here
```

Then call with header:
```bash
curl -H "Authorization: Bearer your-random-secret-key-here" \
  https://your-domain.com/api/cron
```

## 🎊 You're Done!

Your Supabase database will now:
- ✅ Stay active automatically
- ✅ Never pause due to inactivity
- ✅ Cost nothing extra (free tier compatible)
- ✅ Work reliably 24/7

**No more "database paused" errors!** 🎉

## Need Help?

See [SUPABASE_KEEPALIVE.md](SUPABASE_KEEPALIVE.md) for:
- Troubleshooting
- Advanced configuration
- Alternative methods
- Monitoring tips
