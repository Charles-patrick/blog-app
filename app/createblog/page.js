'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePost() {
  const router = useRouter()

  useEffect(() => {
    // Check auth status on mount
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if(!isLoggedIn) {
      router.push('/unauthorized')
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Post Content"
          className="w-full p-2 border rounded h-40"
        />
        <button
          type="submit"
          className=" px-4 py-2 rounded "
          style={{  backgroundColor: "var(--bg)", color: "var(--text)" }}>
          Publish Post
        </button>
      </form>
    </div>
  )
}