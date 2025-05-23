'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const Page = () => {
  const [ username , setUsername ] = useState('')
  const [ password , setPassword ] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    if( username && password) {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/createblog')
  }}
  return (
    <>
    <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
        <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
          <h1 className='text-xl'>LOGIN TO CREATE YOUR BLOG</h1>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className="pt-5 pb-5 w-full">
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                  className="rounded-md px-3 py-2 mb-4 border border-solid focus:outline-none transition-colors w-full"
                  style={{
                    borderColor: "var(--border-line)",
                    backgroundColor: "var(--bg)",
                    color: "var(--text)"
                  }}
                />
              </label>
              <label className="pb-1 w-full inline-block">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="rounded-md px-3 py-2 mb-4 border border-solid focus:outline-none transition-colors w-full"
                  style={{
                    borderColor: "var(--border-line)",
                    backgroundColor: "var(--bg)",
                    color: "var(--text)"
                  }}
                />
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