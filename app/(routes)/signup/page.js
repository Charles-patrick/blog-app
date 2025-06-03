'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/app/components/Input'
import Button from '@/app/components/Button'

const Page = () => {
  const router = useRouter()
  const HandleSubmit = (e) => {
    e.preventDefault()
    router.push('/login')
  }


  return (
    <>
    <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
        <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
          <h1 className='text-xl'>SIGNUP TO CREATE YOUR BLOG</h1>
          <form className='flex flex-col' onSubmit={HandleSubmit}>
            <label className="pt-5 pb-5 w-full">
                Username:
                <Input  placeholder="Choose your Username"/>
              </label>
              <label className="pb-4 w-full inline-block">
                Password:
                <Input type="password" placeholder="Enter your Password"/>
              </label>
              <label className="pb-1 w-full inline-block">
                Confirm Password:
                <Input type="password" placeholder="Enter your Password"/>
              </label>
            <p className='pb-3 italic'>Dont have an account yet ? <Link href='/signup'>Sign Up</Link></p>
            <Button type='submit'>Create Account</Button>
          </form>
        </div> 
    </div>
    </>
  )
}

export default Page