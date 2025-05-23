'use client'
import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
// import { blogPosts } from '@/app/layout/Blogtext'
import { useDarkMode } from './contexts/DarkModeContext'
import Link from 'next/link'
import axios from 'axios'
import MockData from '@/app/text'
import { useAuth } from './contexts/UserAuthContext'

function Home() {
  const { darkstate, setDarkState } = useDarkMode();
  const [ showFilter , setShowFilter ] = useState(false)
  const [blogPosts, setBlogPost] = useState([])
  const [ isLoading , setIsLoading] = useState(false)
  const { isLoggedIn , login , logout } = useAuth()


  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchPost = async () => {  
  //     await axios.get('https://my.api.mockaroo.com/users.json?key=5233b6a0')
  //     .then((res) => {
  //       setBlogPost(res.data)
  //     })
  //     .catch((error) => {
  //     console.error("API Error:", error.response?.data || error.message);
  //     // Show user-friendly error message
  //     alert('Failed to load posts. Please try again later.');
  //     })
  //     .finally(() =>
  //       setIsLoading(false)
  //     )
  //   }
  //   fetchPost()
  // }, [])

  //search and filter
  const [sortByRecent, setSortByRecent] = useState(false)
  const [sortByOldest, setSortByOldest] = useState(false)
  const [ searchQuery, setSearchQuery ] = useState('') 
  const  keys  = ['title', 'author', 'content']
  const search = (posts) => {
    return posts.filter((post) =>
      keys.some((key) => post[key].toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // Parse date strings into Date objects for comparison
  const parseDate = (dateStr) => {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

  const filteredPosts = search(blogPosts)
  // Sort posts based on state
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = parseDate(a.date)
    const dateB = parseDate(b.date)
    if (sortByRecent) return dateB - dateA
    if (sortByOldest) return dateA - dateB
    return 0
  })
  const Newestfilter = () => {
    setSortByRecent(!sortByRecent)
    setSortByOldest(false)
    setShowFilter(false)
    setCurrentPage(1)
  }

  const Oldestfilter = () => {
    setSortByOldest(!sortByOldest)
    setSortByRecent(false)
    setShowFilter(false)
    setCurrentPage(1)

  }


  // Paginate posts
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 8
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Simple page numbers: previous, current, next
  const pageNumbers = []
  if (currentPage > 1) pageNumbers.push(currentPage - 1)
  pageNumbers.push(currentPage)
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1)

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
  }



  return (
    <div className='homebody mx-auto'>
      <div className=''>
            <div className='text-center  font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl border-b  pt-3 pb-5' style={{ borderColor: "var(--border-line)" ,color: 'var(--text)'}} > THE BLOG </div>
      </div>
      {/* Blog Header */}
      <div className='flex justify-between  items-center mt-[20px]'>
        <div>
          <h1 className="font-bold mb-4 text-2xl  " style={{ color: "var(--text)"}}>Blog Posts</h1>
        </div>
        <div className='flex items-center justify-center'>
          <input
            type="text"
            placeholder="Search posts..."
            className="w-[140px] sm:w-[300px] p-2 mb-6 border rounded-md"
            style={{ borderColor: 'var(--text)' , color: 'var(--text)' }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
            <div className='relative'>
                <button  style={{ marginTop: '-25px' }} onClick={() => setShowFilter(!showFilter)} >
                <img src={ darkstate ? '/filter-dark.png' : '/filter-light.png'} alt='filter' className='cursor-pointer w-10 h-10 font-thin'  />                  
              </button>
              <div className={` ${showFilter ? '' : 'hidden'} absolute bg-white shadow-md rounded-md p-4 mt-2 right-0`} style={{ color: "var(--text)" , backgroundColor: 'var(--bg)'}} >
                <ul className='w-30'>
                  <li><button className='px-0 py-1 cursor-pointer' onClick={Newestfilter}>Filter by newest </button></li>
                  <li><button className='px-0 py-1 cursor-pointer' onClick={Oldestfilter}>Filter by oldest </button></li>
                  <li><button className='px-0 py-1 cursor-pointer' >Filter by popular </button></li>
                </ul>
              </div>
            </div>
        </div>
      </div>
      {/* Blog Posts */}
      {isLoading ? (
      <div className="flex justify-center items-center" style={{ minHeight: "400px", width: '100%' }}>
        <div className="flex justify-center items-center w-full" style={{ maxHeight: "300px" }}>
          {darkstate ? (
            <img 
              src="/456.svg" 
              alt="Loading..."
              className="mx-auto my-auto"
            />
          ) : (
            <img 
              src="/123.svg" 
              alt="Loading..."
              className="mx-auto my-auto"
            />
          )}   
        </div> 
      </div>
    ) : (searchQuery && currentPosts.length > 0 ? (
      <div className="flex justify-center items-center" style={{ minHeight: "400px", width: '100%' }}>
        <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>No searches found.</span>
      </div>
    ) : (
      <div className="grid md:grid-cols-4 sm:grid-cols-2 s:grid-cols-1 gap-6">
        {currentPosts.map(post => (
          <article key={post.id} className="px-0 py-0 shadow-md rounded-md">
            <Link href={`/${post.id}`} className="text-left w-full rounded-md pb-6 transition-all duration-300 hover:scale-[1.02] ">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-tl-md rounded-tr-md" />
              <div className='pl-2'>
                <p style={{ color: "var(--blog-names)"}} className='pt-3 pb-1'>{post.author} . {post.date}</p>
                <h2 className="text-xl font-bold pt-2 pb-3" style={{ color: "var(--text)"}} >{post.title}</h2>
                <p className="text-gray-600 pt-1 pb-5" >{post.content}</p>
              </div>
            </Link>
          </article>
        ))}
        {MockData.map( post => (
          <article key={post.id} className="px-0 py-0 shadow-md rounded-md">
            <Link href={`/${post.id}`} className="text-left w-full rounded-md pb-6 transition-all duration-300 hover:scale-[1.02] ">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-tl-md rounded-tr-md" />
              <div className='pl-2'>
                <p style={{ color: "var(--blog-names)"}} className='pt-3 pb-1'>{post.author} . {post.date}</p>
                <h2 className="text-xl font-bold pt-2 pb-3" style={{ color: "var(--text)"}} >{post.title}</h2>
                <p className="text-gray-600 pt-1 pb-5" >{post.content}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    ))}
    

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-5" style={{ color: 'var(--text)' }} />
        </button>
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ backgroundColor: page === currentPage ? 'var(--text)' : 'var(--bg)' , color: page === currentPage ? 'var(--bg)' : 'var(--text)' , borderColor: page === currentPage ? 'var(--bg)' : 'var(--text)'}}   
            className={`px-3 py-1 rounded ${page === currentPage ? '' : ' border'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded disabled:opacity-50"
        >
          <ChevronRightIcon className="size-5" style={{ color: 'var(--text)' }} />
        </button>
      </div>
    </div>
  )
}

export default Home
