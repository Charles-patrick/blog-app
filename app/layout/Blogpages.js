'use client'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { blogPosts } from './Blogtext'

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

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
    <div className=" px-15 mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text)"}}>All Blog Posts</h1>
      {/* Blog Posts */}
      <div className=" grid  md:grid-cols-3 sm:grid-cols-2 s:grid-cols-1 gap-6  ">
        {currentPosts.map(post => (
          <article key={post.id} className=" px-0 py-0 shadow-md rounded-md">
            <button className="text-left w-full rounded-md pb-6 ">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-tl-md rounded-tr-md" />
                <div className='pl-2'>
                    <p style={{ color: "var(--blog-names)"}} className='pt-3 pb-1'>{post.author} . {post.date}</p>
                    <h2 className="text-xl font-bold pt-2 pb-3" style={{ color: "var(--text)"}} >{post.title}</h2>
                    <p className="text-gray-600 pt-1 pb-5" >{post.content}</p>
                </div>
            </button>
          </article>
        ))}
      </div>

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

export default BlogPage