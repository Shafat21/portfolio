# Supabase Keepalive Setup

## Problem
Supabase free tier pauses databases after 7 days of inactivity. This prevents database pausing.

## Solution Implemented

### 1. API Endpoints ✅

**`/api/keepalive`** - Simple keepalive endpoint
- Runs a light query on the database
- Can be called manually or by external services
- Returns success status and timestamp

**`/api/cron`** - Cron job endpoint
- More comprehensive health check
- Returns statistics (project count, skills count, etc.)
- Optional authentication with `CRON_SECRET`

### 2. Vercel Cron Job ✅

**File:** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 */12 * * *"
    }
  ]
}
```

**Schedule:** Every 12 hours
**Path:** `/api/cron`

### 3. Client-Side Hook ✅

**File:** `hooks/useSupabaseKeepalive.ts`

A React hook that pings the database every 6 hours when users visit your site.

## Setup Instructions

### Option 1: Vercel Cron (Recommended)

**Requirements:** Vercel Pro plan or Hobby plan with cron enabled

1. ✅ `vercel.json` already created
2. Deploy to Vercel
3. Vercel will automatically run `/api/cron` every 12 hours

**Advantages:**
- Automatic
- Reliable
- No external services needed

### Option 2: External Cron Service (Free Alternative)

Use services like:
- [cron-job.org](https://cron-job.org) - Free
- [EasyCron](https://www.easycron.com) - Free tier available
- [UptimeRobot](https://uptimerobot.com) - Free monitoring

**Setup:**

1. Sign up for the service
2. Add a new cron job:
   - **URL:** `https://your-domain.com/api/keepalive`
   - **Schedule:** Every 12 hours (or daily)
   - **Method:** GET

**With Authentication (Optional):**

1. Add to `.env`:
   ```env
   CRON_SECRET=your-secret-key-here
   ```

2. Configure cron service to send header:
   ```
   Authorization: Bearer your-secret-key-here
   ```

### Option 3: Client-Side Hook

Add to your root layout or homepage:

```typescript
// app/layout.tsx or app/page.tsx
import { useSupabaseKeepalive } from '@/hooks/useSupabaseKeepalive'

export default function Layout({ children }) {
  // This will ping the database every 6 hours when users visit
  useSupabaseKeepalive()

  return children
}
```

**Advantages:**
- No external service needed
- Free
- Works automatically when users visit

**Disadvantages:**
- Requires user traffic
- Won't work if no one visits for 7 days

## Testing

### Test the Keepalive Endpoint

```bash
# Local
curl http://localhost:3000/api/keepalive

# Production
curl https://your-domain.com/api/keepalive
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database is active",
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

### Test the Cron Endpoint

```bash
# Without auth
curl https://your-domain.com/api/cron

# With auth (if CRON_SECRET is set)
curl -H "Authorization: Bearer your-secret-key" https://your-domain.com/api/cron
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Supabase keepalive successful",
  "stats": {
    "projects": 17,
    "skills": 9,
    "experience": 3
  },
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

## How It Works

### Query Strategy
The keepalive endpoints run lightweight queries:
- `SELECT count` queries (very fast)
- `LIMIT 1` queries (minimal data transfer)
- Only touches existing tables

### Frequency
- **Vercel Cron:** Every 12 hours
- **Client Hook:** Every 6 hours (when site is open)
- **External Cron:** Customizable (recommended: 12-24 hours)

### Why This Works
Supabase considers a database "active" when queries are executed. These lightweight queries:
- Don't add significant cost
- Keep database awake
- Prevent the 7-day inactivity timeout

## Monitoring

### Check if Cron is Working (Vercel)

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to "Cron" or "Logs"
4. Look for `/api/cron` executions

### Check Supabase Status

1. Go to Supabase Dashboard
2. Select your project
3. Check "Database" → Activity
4. Should see regular query activity

## Troubleshooting

### Cron Not Running
- **Vercel:** Check if cron feature is enabled for your plan
- **External Service:** Verify URL is correct and accessible
- **Check Logs:** Look for error messages

### Database Still Pausing
- **Increase Frequency:** Run cron every 6 hours instead of 12
- **Add Client Hook:** Use `useSupabaseKeepalive` in your app
- **Upgrade Plan:** Consider Supabase Pro (no auto-pause)

### Authentication Errors
- Verify `CRON_SECRET` is set in environment variables
- Check Authorization header format
- Test without auth first to debug

## Cost Considerations

### Free Tier Limits
- Supabase: 500MB database, 2GB bandwidth
- Vercel: Cron available on Hobby plan
- These keepalive queries use minimal resources

### Typical Usage
- Each keepalive: ~1KB data transfer
- 2x per day: ~730KB per year
- Well within free tier limits

## Alternatives

### 1. Supabase Pro Plan ($25/month)
- No auto-pause
- Better performance
- More resources

### 2. Manual Wake-Up
- Visit `/api/keepalive` manually
- Use browser bookmark
- Set phone reminder

### 3. GitHub Actions (Free)
```yaml
# .github/workflows/keepalive.yml
name: Supabase Keepalive
on:
  schedule:
    - cron: '0 */12 * * *'
jobs:
  keepalive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: curl https://your-domain.com/api/keepalive
```

## Recommended Setup

**Best Practice:**
1. ✅ Deploy to Vercel with `vercel.json` (automatic cron)
2. ✅ Add client-side hook to homepage
3. ✅ Set up external cron as backup (cron-job.org)

This triple approach ensures your database stays active!

## Files Created

- ✅ `app/api/keepalive/route.ts` - Simple keepalive endpoint
- ✅ `app/api/cron/route.ts` - Cron endpoint with stats
- ✅ `vercel.json` - Vercel cron configuration
- ✅ `hooks/useSupabaseKeepalive.ts` - React hook
- ✅ `SUPABASE_KEEPALIVE.md` - This guide

## Summary

Your Supabase database will now stay active through:
1. Vercel Cron (every 12 hours) - Primary
2. Client-side pings (when users visit) - Secondary
3. External cron service (optional) - Backup

**No more database pausing! 🎉**
