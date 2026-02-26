# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for your portfolio with Supabase authentication and database.

## 1. Supabase Setup

### Step 1: Create Tables in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `lib/supabase/schema.sql`
4. Click **Run** to create all tables and policies

### Step 2: Create Your First Admin User

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Enter your email and password
4. After creating the user, copy the user's UUID
5. Go to **SQL Editor** and run:

```sql
INSERT INTO admin_users (id, email, role)
VALUES ('YOUR_USER_UUID_HERE', 'your-email@example.com', 'admin');
```

Replace `YOUR_USER_UUID_HERE` with the actual UUID from step 4.

### Step 3: Enable Row Level Security (RLS)

The schema file already includes RLS policies. Verify they're enabled:

1. Go to **Database** > **Tables**
2. For each table, click the table name
3. Ensure "RLS enabled" is checked

### Step 4: Storage Setup (Optional)

If you want to upload images:

1. Go to **Storage**
2. Create a new bucket called `project-images`
3. Set up policies:
   - Public read access
   - Authenticated admin write access

## 2. Environment Variables

Your `.env` file should already be configured with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yrdayxeixupvhkilrdcd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Access the Admin Dashboard

### Login

1. Start your development server: `pnpm dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Enter your admin credentials (email and password you created in Step 2)

### Dashboard Features

After logging in, you'll have access to:

- **Dashboard** - Overview of all content
- **Projects** - Manage portfolio projects
- **Testimonials** - Manage client testimonials
- **Education** - Manage education history
- **Experience** - Manage work experience
- **Skills** - Manage skills and proficiencies

## 4. Remaining Admin Pages to Create

I've created the following pages:
- ✅ Projects management
- ✅ Testimonials management
- ⏳ Education management (to be created)
- ⏳ Experience management (to be created)
- ⏳ Skills management (to be created)

### To create the remaining pages:

Follow the same pattern as Projects and Testimonials:

1. Create `app/admin/dashboard/[section]/page.tsx` (list page)
2. Create `app/admin/dashboard/[section]/[Section]Dialog.tsx` (edit/create dialog)

The structure is consistent across all sections.

## 5. Migrating Existing Data

To migrate your existing hardcoded projects to the database:

1. Log into the admin dashboard
2. Manually add each project, OR
3. Use the SQL Editor in Supabase to bulk insert:

```sql
INSERT INTO projects (title, description, tech_stack, link, icon_name, type, category, featured, pinned)
VALUES
  ('Al Quran Institute', 'Educational platform for Quran studies...', 'Next.js, Tailwind, Express, API', 'https://alquraninstitute.net/', 'BookOpen', 'live', 'Web', true, true),
  -- Add more projects...
;
```

## 6. Updating Frontend Components

After setting up the database, update your frontend components to fetch from Supabase instead of using hardcoded data:

### Example: Update Projects.tsx

```tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true })

      setProjects(data || [])
    }

    fetchProjects()
  }, [])

  // Rest of your component...
}
```

## 7. Security Notes

- ⚠️ **Never commit `.env` or `.env.local` to git** (already in .gitignore)
- ⚠️ The service role key has full database access - keep it secret
- ⚠️ Only use service role key in server-side code or admin operations
- ✅ RLS policies protect your data from unauthorized access
- ✅ Admin verification happens in middleware

## 8. Deployment

When deploying to Vercel:

1. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Deploy: `vercel --prod`

## 9. Troubleshooting

### Can't login?
- Verify user exists in Authentication > Users
- Verify user exists in admin_users table
- Check browser console for errors

### RLS Policy Error?
- Ensure admin_users table has your user ID
- Verify RLS policies are enabled
- Check policy conditions

### Data not showing?
- Check Supabase logs in Dashboard > Logs
- Verify data exists in tables
- Check browser console for errors

## Next Steps

1. ✅ Run the SQL schema to create tables
2. ✅ Create your admin user
3. ✅ Test login at `/admin/login`
4. ⏳ Create remaining admin pages (education, experience, skills)
5. ⏳ Migrate existing data
6. ⏳ Update frontend components to fetch from Supabase
7. ⏳ Deploy to production

## File Structure

```
app/
├── admin/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── projects/
│       │   ├── page.tsx
│       │   └── ProjectDialog.tsx
│       ├── testimonials/
│       │   ├── page.tsx
│       │   └── TestimonialDialog.tsx
│       ├── education/ (to be created)
│       ├── experience/ (to be created)
│       └── skills/ (to be created)
lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   ├── database.types.ts
│   └── schema.sql
middleware.ts
.env.local.example
```
