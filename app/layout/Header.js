"use client"
import React from 'react'
import { useState } from 'react'

const Header = () => {
 const [darkstate, setDarkState] = useState(false)
 const toggleDarkMode = () => {
   setDarkState(!darkstate)
   if (darkstate) {
     document.documentElement.classList.remove('dark')
     document.documentElement.classList.add('light')
   } else {
     document.documentElement.classList.add('dark')
     document.documentElement.classList.remove('light')
   }
   console.log(darkstate)
   console.log(document.documentElement.classList)
 }

  return (
    <div style={{  color: 'var(--text)' }}>
        <div className="flex justify-between py-7 px-15" >
          {darkstate ? 
            <div className='text-2xl md:text-3xl font-extrabold  
              bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 
              text-transparent bg-clip-text tracking-wide drop-shadow-lg
              hover:bg-gradient-to-br hover:from-blue-50 hover:via-blue-100 hover:to-white'>
              WEEZYS BLOG
           </div> :
           <div className='text-2xl md:text-3xl font-extrabold  
  bg-gradient-to-r from-indigo-700 via-blue-500 to-cyan-400 
  text-transparent bg-clip-text tracking-wide drop-shadow-lg
  hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-100'>
              WEEZYS BLOG
            </div>
          }

          <div className='flex '>
            <ul className='flex align-center justify-center items-center'>
              <li className='px-4'>Blog</li>
              <li className='px-4'>Projects</li>
              <li className='px-4'>About</li>
              <li className='px-4'>Newsletter</li>
            </ul>
            <button>
              <img src={ darkstate ? '/sun.png' : '/moon.png'} alt="Ghost" onClick={toggleDarkMode}/>
            </button>
          </div>
        </div>
        <div className='px-15'>
            <div className='text-center font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl border-t border-b  pt-3 pb-5' style={{ borderColor: "var(--border-line)"}} > THE BLOG </div>
        </div>
    </div>
  )
}

export default Header