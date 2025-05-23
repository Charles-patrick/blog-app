// context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

// 1. Create Context
const AuthContext = createContext()

// 2. Create Provider Component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check localStorage when app loads
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn')
    setIsLoggedIn(savedLogin === 'true')
  }, [])

  // Login function
  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
  }

  // Logout function
  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  // 3. Provide the values to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 4. Create custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext)
}