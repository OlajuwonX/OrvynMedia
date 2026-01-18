import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check initial session
    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = authApi.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function checkSession() {
    try {
      const session = await authApi.getSession()
      if (session?.user) {
        setUser(session.user)
      }
    } catch (error) {
      console.error('Error checking session:', error)
    } finally {
      setLoading(false)
    }
  }

  async function signIn(email, password) {
    const data = await authApi.signIn(email, password)
    return data
  }

  async function signOut() {
    await authApi.signOut()
    setUser(null)
  }

  // Since only one user exists and they're the admin,
  // if authenticated = admin
  const isAdmin = !!user

  const value = {
    user,
    isAdmin,
    loading,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
