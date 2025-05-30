// app/layout/ClientLayout.js
'use client'
import Header from "@/app/layout/Header"
import { DarkModeProvider } from "./contexts/DarkModeContext"
import { AuthProvider } from "../app/contexts/UserAuthContext"
import { SessionProvider } from "next-auth/react"

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <SessionProvider>
        <DarkModeProvider>
          <Header />
          <div className="pt-[60px]">
            {children}
          </div>
        </DarkModeProvider>
      </SessionProvider>
    </AuthProvider> 
  )
}