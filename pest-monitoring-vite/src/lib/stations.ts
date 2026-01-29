import { supabase } from './supabaseClient'

export type Station = {
  id: string
  name: string
  lat: number
  lng: number
  status: 'ok' | 'bait_missing' | 'consumed' | 'trapped'
  last_checked_at: string | null
}

export async function fetchStations(): Promise<Station[]> {
  const { data, error } = await supabase
    .from('stations')
    .select('id, name, lat, lng, status, last_checked_at')
    .order('name', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createEvent(stationId: string, type: 'bait_missing' | 'consumed' | 'trapped', count = 1) {
  const { error } = await supabase
    .from('events')
    .insert({ station_id: stationId, type, count })
  if (error) throw error
}

export async function updateStationStatus(stationId: string, status: Station['status']) {
  const { error } = await supabase
    .from('stations')
    .update({ status })
    .eq('id', stationId)
  if (error) throw error
}
