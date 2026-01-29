import { supabase } from './supabaseClient'

export async function signInWithEmail(email: string) {
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error
  return true
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export function getSession() {
  return supabase.auth.getSession()
}

export function onAuthStateChange(callback: (event: string) => void) {
  const { data: sub } = supabase.auth.onAuthStateChange((event) => callback(event))
  return () => sub.subscription.unsubscribe()
}
