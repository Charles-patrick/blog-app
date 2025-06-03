'use client'
import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDarkMode } from './contexts/DarkModeContext'
import Link from 'next/link'
import MockData from '@/app/text'
import { useSession } from 'next-auth/react'
import { FunnelPlus, FunnelX } from 'lucide-react'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { data: session, status} = useSession()
  const { darkstate } = useDarkMode();
  const [showFilter, setShowFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sortByRecent, setSortByRecent] = useState(false)
  const [sortByOldest, setSortByOldest] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 8

  // Use MockData as your main posts source
  const allPosts = [...MockData]

  // Search
  const keys = ['title', 'author', 'content']
  const search = (posts) => {
    if (!searchQuery) return posts
    return posts.filter((post) =>
      keys.some((key) => post[key]?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // Parse date strings into Date objects for comparison
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0)
    const [month, day, year] = dateStr.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  // Filtered and sorted posts
  const filteredPosts = search(allPosts)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = parseDate(a.date)
    const dateB = parseDate(b.date)
    if (sortByRecent) return dateB - dateA
    if (sortByOldest) return dateA - dateB
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Page numbers for pagination
  const pageNumbers = []
  if (currentPage > 1) pageNumbers.push(currentPage - 1)
  pageNumbers.push(currentPage)
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1)

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
  }

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

  return (
    <div className='homebody mx-auto'>
      <div className=''>
        <div className='text-center font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl  pt-3 pb-5' > THE BLOG </div>
      </div>
      {/* Blog Header */}
        <div>
          <hr style={{ color: "var(--border-line)" }}/>
          {status === "loading" ? (
            <div><p className='pt-3 pb-3'>...</p></div>
          ) : session?.user ? (
            <div><p className='pt-3 pb-3'>Welcome {session.user.name ?? session.user.email} !!!</p></div>
          ) : null}
          <hr style={{ color: "var(--border-line)" }}/>
        </div>
      
      <div className='flex justify-between items-center mt-[20px]'>
        <div>
          <h1 className="font-bold mb-4 text-2xl" style={{ color: "var(--text)" }}>Blog Posts</h1>
        </div>
        <div className='flex items-center justify-center gap-3'>
          <input
            type="text"
            placeholder="Search posts..."
            className="w-[140px] sm:w-[300px] p-2 mb-6 border rounded-md"
            style={{ borderColor: 'var(--text)', color: 'var(--text)' }}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
          <div className='relative'>
            <button style={{ marginTop: '-30px' }} onClick={() => setShowFilter(!showFilter)} >
              { !showFilter ? <FunnelPlus size={32} color="var(--text)" strokeWidth={1}/> : <FunnelX size={32} color="var(--text)" strokeWidth={1}/>}
            </button>
            <div className={` ${showFilter ? '' : 'hidden'} absolute bg-white shadow-md rounded-md p-4 mt-2 right-0`} style={{ color: "var(--text)", backgroundColor: 'var(--bg)' }}>
              <ul className='w-30'>
                <li><button className='px-0 py-1 cursor-pointer' onClick={Newestfilter}>Filter by newest </button></li>
                <li><button className='px-0 py-1 cursor-pointer' onClick={Oldestfilter}>Filter by oldest </button></li>
                <li><button className='px-0 py-1 cursor-pointer'>Filter by popular </button></li>
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
              <img src="/456.svg" alt="Loading..." className="mx-auto my-auto" />
            ) : (
              <img src="/123.svg" alt="Loading..." className="mx-auto my-auto" />
            )}
          </div>
        </div>
      ) : (searchQuery && currentPosts.length === 0 ? (
        <div className="flex justify-center items-center" style={{ minHeight: "400px", width: '100%' }}>
          <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>No searches found.</span>
        </div>
      ) : currentPosts.length === 0 ? (
        <div className="flex justify-center items-center" style={{ minHeight: "400px", width: '100%' }}>
          <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>No Posts Available</span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 s:grid-cols-1 gap-6">
          {currentPosts.map(post => (
            <article key={post.id} className="px-0 py-0 shadow-md rounded-md transition-transform duration-300 hover:scale-102">
              <Link href={`/${post.id}`} className="text-left w-full rounded-md pb-6 transition-all duration-300 hover:scale-[1.02] ">
                {post.image && 
                <div>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={100}
                  height={100}
                  className='rounded-tl-md rounded-tr-md'
                  style={{ width: '100%', height: '170px' }}
                />
                </div>
                }
                <div className='pl-2 overflow-hidden break-words'>
                  <p style={{ color: "var(--blog-names)" }} className='pt-3 pb-1'>{post.author} . {post.date}</p>
                  <h2 className="text-xl font-bold pt-2 pb-3" style={{ color: "var(--text)" }}>
                    {post.title.length > 50 ?
                    <>
                    {post.title.slice(0 , 50)}..
                    </>
                    : post.title}
                  </h2>
                  <p className="text-gray-600 pt-1 pb-5 break-words overflow-hidden">
                    {post.content.length > 100
                      ? <>
                        {post.content.slice(0, 100)}...
                        <span className="text-blue-500 ml-1">Continue reading</span>
                      </>
                      : post.content}
                  </p>
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
            style={{ backgroundColor: page === currentPage ? 'var(--text)' : 'var(--bg)', color: page === currentPage ? 'var(--bg)' : 'var(--text)', borderColor: page === currentPage ? 'var(--bg)' : 'var(--text)' }}
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


