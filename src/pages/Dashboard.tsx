import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <main>
      <h1>Panel</h1>
      <p>Sesión iniciada como {user?.email}</p>
      <button onClick={() => auth && signOut(auth)}>Salir</button>
    </main>
  )
}
