// context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

// 1. Create Context
const AuthContext = createContext()

// 2. Create Provider Component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ username , setUsername ] = useState('')


  // Check localStorage when app loads
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn')
    const savedUsername = localStorage.getItem('username')
    setIsLoggedIn(savedLogin === 'true')
    setUsername( savedUsername || '')
  }, [])

  // Login function
  const login = (usernameValue) => {
    setIsLoggedIn(true)
    setUsername(usernameValue)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username' , usernameValue)
  }

  // Logout function
  const logout = () => {
    setIsLoggedIn(false)
    setUsername('')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
  }

  // 3. Provide the values to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, username , login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 4. Create custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext)
}