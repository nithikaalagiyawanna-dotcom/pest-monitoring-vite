import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { signOut } from '@/lib/auth'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-3 bg-slate-800 text-white flex items-center justify-between">
        <div className="font-semibold">Pest Monitoring</div>
        <nav className="flex gap-4 items-center">
          {user && (
            <>
              <Link to="/map" className="hover:underline">Map</Link>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <button onClick={() => signOut()} className="ml-2 bg-slate-700 px-3 py-1 rounded">Logout</button>
            </>
          )}
          {!user && <Link to="/login" className="hover:underline">Login</Link>}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="p-3 text-center text-sm text-slate-500">© 2026 Lumine Creation</footer>
    </div>
  )
}
