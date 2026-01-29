import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { fetchStations, updateStationStatus, createEvent, type Station } from '@/lib/stations'
import StationPopup from '@/components/StationPopup'

const initialCenter: [number, number] = [6.9271, 79.8612] // Colombo (adjust as needed)

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
})

export default function MapPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const s = await fetchStations()
      setStations(s)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const setStatus = async (id: string, status: Station['status']) => {
    await updateStationStatus(id, status)
    load()
  }
  const addEvent = async (id: string, type: 'bait_missing'|'consumed'|'trapped') => {
    await createEvent(id, type, 1)
  }

  return (
    <div className="h-[calc(100vh-120px)]">
      {loading ? (
        <div className="p-4">Loading stations…</div>
      ) : (
        <MapContainer center={initialCenter} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations.map(s => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={markerIcon}>
              <Popup>
                <StationPopup
                  name={s.name}
                  status={s.status}
                  onSetStatus={(st) => setStatus(s.id, st)}
                  onAddEvent={(t) => addEvent(s.id, t)}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}
