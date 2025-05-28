'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Input from '@/app/components/Input'
import { useAuth} from '@/app/contexts/UserAuthContext'

const Page = () => {
  const { isloggedin , login } = useAuth()
  const [ username , setUsername ] = useState('')
  const [ password , setPassword ] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if( username && password) {
      login(username)
      router.push('/createblog')
  }else {
      alert("Please fill in all fields")
  }}
  return (
    <>
    <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
        <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
          <h1 className='text-xl'>LOGIN TO CREATE YOUR BLOG</h1>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className="pt-5 pb-5 w-full">
                Username:
              <Input type="text" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <label className="pb-1 w-full inline-block">
                Password:
                <Input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            <p className='pb-3 italic'>Dont have an account yet ? <Link href='/signup'>Sign Up</Link></p>
            <input  type='submit' className='p-2 rounded md' style={{ background: "var(--text)" , color: "var(--bg)"}} />
          </form>
        </div>
    </div>
    </>
  )
}

export default Page