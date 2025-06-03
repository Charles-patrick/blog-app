'use client'
import React from 'react'
import Link from 'next/link'
import Button from '@/app/components/Button'
import {useRouter} from 'next/navigation'
const Page = () => {
  const router = useRouter()
  return (
      <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
       <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)'}}>Are you sure you want to logout ?</h1>
          <Button 
            onClick={() => { logout(); router.push('/'); }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Logout
          </Button>
       </div>
     </div>
  )
}

export default Page