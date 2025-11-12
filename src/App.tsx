import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Auth } from './Auth'
import { CustomerList } from './CustomerList'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })
    return () => subscription?.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return user ? <CustomerList user={user} onLogout={handleLogout} /> : <Auth onAuthChange={setUser} />
}

export default App
