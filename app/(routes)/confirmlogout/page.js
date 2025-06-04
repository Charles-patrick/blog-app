'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import { SignOutButton } from '@/app/components/sign-out-button'
const Page = () => {
  const router = useRouter()
  return (
      <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
       <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)'}}>Are you sure you want to Sign Out ?</h1>
          < SignOutButton  className="px-4 py-2 rounded w-full " style={{ backgroundColor: "var(--text)", color: "var(--bg)" }}/>
       </div>
     </div>
  )
}

export default Page