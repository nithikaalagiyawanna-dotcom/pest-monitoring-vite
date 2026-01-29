type Props = {
  name: string
  status: 'ok' | 'bait_missing' | 'consumed' | 'trapped'
  onSetStatus: (s: Props['status']) => void
  onAddEvent: (type: 'bait_missing' | 'consumed' | 'trapped') => void
}

export default function StationPopup({ name, status, onSetStatus, onAddEvent }: Props) {
  return (
    <div className="space-y-2">
      <div className="font-medium">{name}</div>
      <div className="text-sm">Status: <span className="font-mono">{status}</span></div>
      <div className="flex gap-2 flex-wrap">
        <button className="bg-emerald-600 text-white px-2 py-1 rounded" onClick={() => onSetStatus('ok')}>OK</button>
        <button className="bg-amber-600 text-white px-2 py-1 rounded" onClick={() => onSetStatus('consumed')}>Consumed</button>
        <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onSetStatus('bait_missing')}>Bait Missing</button>
        <button className="bg-indigo-600 text-white px-2 py-1 rounded" onClick={() => onAddEvent('trapped')}>+ Trapped</button>
      </div>
    </div>
  )
}
