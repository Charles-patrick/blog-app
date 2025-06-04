'use client'
import { useEffect , useState } from 'react'
import { useRouter } from 'next/navigation'
import MockData from '../../text'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useSession } from 'next-auth/react'
import { useDarkMode } from '@/app/contexts/DarkModeContext'
import Image from 'next/image'

export default function CreatePost() {
  const {darkstate} = useDarkMode
  const { data: session, status } = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const router = useRouter()


  function isValidUrl(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
    // If session is loading, show a loading state
  if (status === "loading") {
    return <div className="text-center mt-20">
      {darkstate ? (
        <Image src='/darkloader.svg' alt='Loading...' width={100} height={100} className="mx-auto my-auto" />
      ) : (
        <Image src='/lightloader.svg' alt='Loading...' width={100} height={100} className="mx-auto my-auto" />
      )}
    </div>
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
    } if (image && !isValidUrl(image)){
      alert("Please enter a valid image URL")
      return 
    } else{
      const NewPost = {
        id: Date.now(),
        title: title, 
        author: session.user.name || session.user.email,
        date: new Date().toLocaleDateString(),
        content: content,
        ...(image && { image: image })
      }
      MockData.push(NewPost)
      router.push('/')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-18 p-6">
      <h1 className="text-2xl font-bold mb-6 " style={{ color: "var(--text)"}}>
        Welcome <span className='break-all'>{session.user.name || session.user.email}</span>, Create New Post
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