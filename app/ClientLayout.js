'use client'
import Header from "@/app/layout/Header"
import { useState } from 'react'

export default function ClientLayout({ children }) {
  const [darkstate, setDarkState] = useState(false)
  return (
    <>
      <Header darkstate={darkstate} setDarkState={setDarkState} />
      {children}
    </>
  );
}