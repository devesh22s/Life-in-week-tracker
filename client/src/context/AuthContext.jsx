// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    // Your login logic
    setUser({ email }) // For now, just simulate login
  }

  const register = async (email, password) => {
    // Your register logic
    setUser({ email }) // Simulate register
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Correctly exported hook
export const useAuth = () => useContext(AuthContext)
