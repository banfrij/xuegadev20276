import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!auth) return
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError('No se pudo iniciar sesión.')
    }
  }

  return (
    <form onSubmit={submit}>
      <h1>Acceso</h1>
      {!auth && <p>Falta la configuración de Firebase (variables VITE_FIREBASE_*).</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit" disabled={!auth}>Entrar</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}
