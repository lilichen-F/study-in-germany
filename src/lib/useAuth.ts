import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // GitHub Pages 部署在子路徑（/study-in-germany/），redirectTo 必須帶
        // pathname，否則 Google 會導回網站根目錄造成 404
        redirectTo: `${window.location.origin}${window.location.pathname}`,
      },
    })
  const signOut = () => supabase.auth.signOut()

  return { user, loading, signInWithGoogle, signOut }
}
