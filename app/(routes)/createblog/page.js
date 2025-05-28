'use client'
import { useEffect , useState} from 'react'
import { useRouter } from 'next/navigation'
import MockData from '../../text'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useAuth } from '../../contexts/UserAuthContext'

export default function CreatePost() {
  const { isLoggedIn , username } = useAuth()
  const router = useRouter()
  // const [ username , setUsername ] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image , setImage ] = useState('')

  // useEffect(() => {
  //   // Check auth status on mount
  //   const isLoggedIn = localStorage.getItem('isLoggedIn')
  //   if(!isLoggedIn) {
  //     router.push('/unauthorized')
  //   }
  // }, [])

 const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !content) {
      alert("Title and content are required")
      return
    }else {
      const NewPost ={
        id: Date.now(),
        title: title,
        author: username,
        date: new Date().toLocaleDateString(),
        content: content,
        ...(image && { image: image })
      }
      MockData.push(NewPost) // Add new post to MockData
      console.log("Post created:", NewPost)
      router.push('/')
    }
 }

  return (
   <>
   { isLoggedIn ? (
     <div className="max-w-2xl mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text)"}}> Welcome {username} , Create New Post</h1>
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
        <Button 
        type='submit'>
          Create Post
        </Button>
      </form>
    </div>
   ) : (
     <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
       <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
         <h1 className='text-xl mb-5'>You need to be logged in to create a post</h1>
         <Button onClick={() => router.push('/login')}>Login</Button>
       </div>
     </div>
   )}
   </>
  )
}