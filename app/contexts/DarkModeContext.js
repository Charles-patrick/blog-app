// contexts/DarkModeContext.js
'use client'
import { createContext, useContext, useState } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [darkstate, setDarkState] = useState(false) 

  return (
    <DarkModeContext.Provider value={{ darkstate, setDarkState }}>
      {children}
    </DarkModeContext.Provider>
  )
}

// Fix the hook to return properly
export const useDarkMode = () => useContext(DarkModeContext)