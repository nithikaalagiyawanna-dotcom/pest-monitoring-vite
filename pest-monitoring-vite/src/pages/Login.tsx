import { useState } from 'react'
import { signInWithEmail } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { user } = useAuth()

  if (user) return <Navigate to="/map" replace />

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmail(email)
      setSent(true)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {sent ? (
        <div className="text-green-700">Check your email for the magic link.</div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="your@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={loading || !email} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>
      )}
    </div>
  )
}
