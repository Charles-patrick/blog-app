import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <>
    <div className='flex justify-center items-center min-h-screen' style={{ minHeight: "90vh" }}  >
        <div className='shadow-lg p-8 md:p-10 rounded-md ' style={{ color: 'var(--text)' , backgroundColor: 'var(--bg)' }}>
          <h1 className='text-xl'>SIGNUP TO CREATE YOUR BLOG</h1>
          <form className='flex flex-col'>
            <label className="pt-5 pb-5 w-full">
                Username:
                <input
                  type="text"
                  placeholder="Choose your Username"
                  className="rounded-md px-3 py-2 mb-4 border border-solid focus:outline-none transition-colors w-full"
                  style={{
                    borderColor: "var(--border-line)",
                    backgroundColor: "var(--bg)",
                    color: "var(--text)"
                  }}
                />
              </label>
              <label className="pb-4 w-full inline-block">
                Password:
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="rounded-md px-3 py-2 mb-4 border border-solid focus:outline-none transition-colors w-full"
                  style={{
                    borderColor: "var(--border-line)",
                    backgroundColor: "var(--bg)",
                    color: "var(--text)"
                  }}
                />
              </label>
              <label className="pb-1 w-full inline-block">
                Confirm Password:
                <input
                  type="password"
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
            <input type='submit' className='p-2 rounded md' style={{ background: "var(--text)" , color: "var(--bg)"}} />
          </form>
        </div>
    </div>
    </>
  )
}

export default page