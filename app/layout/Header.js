"use client"
import React from 'react'
import { useState , useEffect} from 'react'
import styles from './Header.module.css'
import Link from 'next/link'  
import { useDarkMode } from '../contexts/DarkModeContext'
import { useRouter , usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
// import { login, logout } from '@/lib/actions/auth'


const Header = () => {
  const {data : session, status} = useSession()
  const router = useRouter()
  // const pathname = usePathname()
   const { darkstate, setDarkState } = useDarkMode();

  //  darkstate value that only changes when darkstate is called 
    useEffect(() => {
    if (darkstate) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [darkstate])

      const navAuthBtn = !session ? (
          <li className={`px-4 mx-2 `}>
            <button onClick={() => (  router.push('/'))} >Login</button>
          </li>
      ) : (
          <li className={`px-4 mx-2 `}> 
            <button onClick={() =>  (signOut())} >Log Out </button>
          </li>
      ) 

      const navAuthBtnMobile = !session ? (
            <li className={`px-7 mx-2 '}`}>
              <button onClick={() => (router.push('/'))} className='cursor-pointer rounded-md text-left px-3 block w-full py-2 hoverbtn'>Login</button>
            </li>
        ) : (
            <li className={'px-6 mx-2'}> 
              <button onClick={() =>  (signOut(),  router.push('/'))} className='cursor-pointer rounded-md text-left px-2 block w-full py-2 hoverbtn'>   Sign Out </button>
            </li>
        )
 
 const toggleDarkMode = () => {
   setDarkState(!darkstate)
 }
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
             BLOG
           </Link> :
           <Link  href='/' className=' align-center text-2xl md:text-3xl font-extrabold  
            bg-gradient-to-r from-indigo-700 via-blue-500 to-cyan-400 
            text-transparent bg-clip-text tracking-wide drop-shadow-lg
            hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-100'>
             BLOG
            </Link>}
          {/* DESKTOP VIEW NAVBAR RIGHT*/}
          <div className={`${styles.navright} `}>
            <ul className='flex align-center justify-center items-center'>
              <li className={`px-4 mx-2 `}><button onClick={() => router.push('/')}  className={`cursor-pointer`}>Blog</button ></li>
              {/* <li><Authbutton /></li> */}
              { navAuthBtn } 
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
                <li className='px-7 py-1' ><button onClick={() => { router.push('/'); setIsOpen(false); }} className='cursor-pointer rounded-md text-left px-3 block w-full py-2 hoverbtn'>Blog</button></li>
                {navAuthBtnMobile}
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