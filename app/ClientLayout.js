'use client'
import Header from "@/app/layout/Header"
import { useState } from 'react'
import { DarkModeContext } from "./DarkModeContext"

export default function ClientLayout({ children }) {
  const [darkstate, setDarkState] = useState(false)
  return (
    <DarkModeContext.Provider value={{ darkstate, setDarkState }}>
      <Header darkstate={darkstate} setDarkState={setDarkState} />
      <div className="pt-[56px]"> {/* This div is to prevent the header from overlapping the content */ }
        {children}
      </div>
      
    </DarkModeContext.Provider>
  );
}