"use client"
import React from 'react'
import { useState } from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

const Header = ( {darkstate, setDarkState} ) => {
  const [ isLoggedIn , setIsLoggedin ] = useState(false)
 const toggleDarkMode = () => {
   setDarkState(!darkstate)
   if (darkstate) {
     document.documentElement.classList.remove('dark')
     document.documentElement.classList.add('light')
   } else {
     document.documentElement.classList.add('dark')
     document.documentElement.classList.remove('light')
   }
 }
//  const[ showModal , setShowModal ] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div style={{ backgroundColor: 'var(--bg)' , color: 'var(--text)' }} className='fixed top-0 w-full z-50 max-w-[1200px]' >
        <div className={`${styles.navdiv} z-100 flex justify-between align-center ` }>
          {darkstate ? 
            <Link href='/' className='overflow-hidden align-center text-2xl md:text-3xl font-extrabold  
              bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 
              text-transparent bg-clip-text tracking-wide drop-shadow-lg
              hover:bg-gradient-to-br hover:from-blue-50 hover:via-blue-100 hover:to-white'>
              MY BLOG
           </Link> :
           <Link  href='/' className=' align-center text-2xl md:text-3xl font-extrabold  
            bg-gradient-to-r from-indigo-700 via-blue-500 to-cyan-400 
            text-transparent bg-clip-text tracking-wide drop-shadow-lg
            hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-100'>
              MY BLOG
            </Link>}
          {/* DESKTOP VIEW NAVBAR RIGHT*/}
          <div className={`${styles.navright} `}>
            <ul className='flex align-center justify-center items-center'>
              <li className='px-4'><Link href='/' className='cursor-pointer'>Blog</Link ></li>
              { !isLoggedIn ? (
                 <li className='px-4'><Link href='/login' className='cursor-pointer'>Login</Link></li>
              ) : (
                 <li className='px-4'><Link href='/login' className='cursor-pointer'>Log Out</Link></li>
              ) }
               
                <li className='px-4'><button className='cursor-pointer'>About</button></li>
            </ul>
            <button>
              <img src={ darkstate ? '/sun.png' : '/moon.png'} alt="Ghost" onClick={toggleDarkMode}/>
            </button> 
          </div> 

          {/* MOBILE VIEW NAVBAR RIGHT*/}
          <div className={`${styles.hamburger}`}>
            <button className='pr-2 transition-all duration-300 hover:scale-[1.05] '>
              <img src={ darkstate ? '/sun.png' : '/moon.png'} className='-mt-[31px]' alt="Ghost" onClick={toggleDarkMode}/>
            </button> 
            <button className={` relative z-50 h-[100%]`} onClick={toggleMenu}> 
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="40px" fill="var(--text)"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
            </button>  
            

            {isOpen && 
            <div className='fixed top-[56px] left-0 w-[100%] h-[100%] z-10' style={{ backgroundColor: 'var(--bg)' , color: 'var(--text)' }} >
              <ul className='flex flex-col '>
                <li className='px-7 py-1' ><Link href='/' className='cursor-pointer rounded-md text-left px-3 block w-full py-2 hoverbtn'>Blog</Link></li>
                <li className='px-7 py-1'><Link href='/login' className='cursor-pointer rounded-md text-left px-3  block w-full py-2 hoverbtn'>Login</Link></li>
                <li className='px-7 py-1'><button className='cursor-pointer rounded-md text-left px-3 w-full py-2 hoverbtn'>About</button></li>
              </ul>
              <div className='px-6 py-2'>
                
              </div>
            </div>}
          </div>
        </div>
        
    </div>
  )
}

export default Header