'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/app/components/Button'

export default function Unauthorized() {
  const router = useRouter()

  return (
      <div style={{ color: 'var(--text)' }} >
        <div style={{ display: "grid", placeItems: "center" , textAlign: "center",   minHeight: "90vh" }}className="">
          <div className=" p-6 shadow-md rounded-md ">
            <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
            <p className="mb-6">You must be logged in to view this page</p>
            <Button onClick = {() => router.push("/")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" > Go to Login </Button>
          </div>
        </div>
      </div>
  )
}