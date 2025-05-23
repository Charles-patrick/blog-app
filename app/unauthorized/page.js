'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Unauthorized() {
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-6">You must be logged in to view this page</p>
      <Link 
        href="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  )
}