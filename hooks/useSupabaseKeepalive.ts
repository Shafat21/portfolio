import { useEffect } from 'react'

/**
 * Hook to keep Supabase database active
 * Pings the keepalive endpoint periodically to prevent database pausing
 */
export function useSupabaseKeepalive() {
  useEffect(() => {
    // Ping every 6 hours (21600000 ms)
    const PING_INTERVAL = 6 * 60 * 60 * 1000

    const pingDatabase = async () => {
      try {
        const response = await fetch('/api/keepalive')
        const data = await response.json()

        if (data.success) {
          console.log('[Keepalive] Database is active:', data.timestamp)
        } else {
          console.warn('[Keepalive] Database ping failed:', data.error)
        }
      } catch (error) {
        console.error('[Keepalive] Error pinging database:', error)
      }
    }

    // Initial ping
    pingDatabase()

    // Set up interval
    const intervalId = setInterval(pingDatabase, PING_INTERVAL)

    // Cleanup
    return () => clearInterval(intervalId)
  }, [])
}
