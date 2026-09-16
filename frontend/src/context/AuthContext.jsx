import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
// Use relative URL for preview (vite proxy handles /api -> localhost:5000)
// In production, set VITE_API_URL to your backend URL
const API = import.meta.env.VITE_API_URL || ''

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, { email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const register = async (name, email, password) => {
    const res = await axios.post(`${API}/api/auth/register`, { name, email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, API }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
