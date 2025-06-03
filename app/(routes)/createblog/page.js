'use client'
import { useEffect , useState } from 'react'
import { useRouter } from 'next/navigation'
import MockData from '../../text'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useSession } from 'next-auth/react'

export default function CreatePost() {
  const { data: session, status } = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const router = useRouter()

  // If session is loading, show a loading state
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>
  }

  // If not authenticated, redirect or show a message
  if (!session || !session.user) {
    return <div className="text-center mt-20">You must be signed in to create a post.</div>
    // Or: router.push('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !content) {
      alert("Title and content are required")
      return
    } else {
      const NewPost = {
        id: Date.now(),
        title: title,
        author: session.user.name || 'Anonymous',
        date: new Date().toLocaleDateString(),
        content: content,
        ...(image && { image: image })
      }
      MockData.push(NewPost)
      router.push('/')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text)"}}>
        Welcome {session.user.name || session.user.email}, Create New Post
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Post Title" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text" 
          placeholder="Post Image URL (optional)" 
          onChange={(e) => setImage(e.target.value)} 
        />
        <textarea
          placeholder="Post Content"
          className="w-full p-2 border rounded h-40"
          style={{borderColor: "var(--border-line)", backgroundColor: "var(--bg)", color: "var(--text)"  }}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type='submit'>
          Create Post
        </Button>
      </form>
    </div>
  )
}