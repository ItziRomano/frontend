import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      // Aquí podrías cargar los datos del usuario si lo necesitas
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password)
      setUser(user)
      setToken(token)
      navigate('/tasks')
    } catch (error) {
      throw error
    }
  }

  const register = async (email, password, firstName, lastName) => {
    try {
      const { user, token } = await authService.register(email, password, firstName, lastName)
      setUser(user)
      setToken(token)
      navigate('/tasks')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    navigate('/login')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)