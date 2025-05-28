// app/layout/ClientLayout.js
'use client'
import Header from "@/app/layout/Header"
import { DarkModeProvider } from "./contexts/DarkModeContext"
import { AuthProvider } from "../app/contexts/UserAuthContext"

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Header />
        <div className="pt-[60px]">
          {children}
        </div>
      </DarkModeProvider>
    </AuthProvider>
  )
}