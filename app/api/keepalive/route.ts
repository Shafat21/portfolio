import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// This endpoint keeps Supabase active by running a simple query
export async function GET() {
  try {
    // Simple query to keep the database active
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Keepalive query failed:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Database is active',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Keepalive error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Allow GET requests without authentication
export const runtime = 'edge'
