import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// This endpoint is called by Vercel Cron or external cron services
// to keep Supabase active
export async function GET(request: Request) {
  try {
    // Verify the request is from a cron job (optional security)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // If CRON_SECRET is set, verify it matches
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Perform multiple light queries to keep database active
    const [projectsResult, skillsResult, experienceResult] = await Promise.all([
      supabase.from('projects').select('count', { count: 'exact', head: true }),
      supabase.from('skills').select('count', { count: 'exact', head: true }),
      supabase.from('experience').select('count', { count: 'exact', head: true }),
    ])

    const stats = {
      projects: projectsResult.count || 0,
      skills: skillsResult.count || 0,
      experience: experienceResult.count || 0,
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase keepalive successful',
      stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Cron keepalive error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export const runtime = 'edge'
