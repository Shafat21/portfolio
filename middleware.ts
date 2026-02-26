import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from './lib/supabase/database.types'

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: req,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: req,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path is /admin/* (except /admin/login), redirect to login
  if (!session && req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // If user is signed in and tries to access /admin/login, redirect to dashboard
  if (session && req.nextUrl.pathname === '/admin/login') {
    // Verify they're an admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (adminData) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    } else {
      // Not an admin, sign them out
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // Verify admin access for protected routes
  if (session && req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (!adminData) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*']
}
