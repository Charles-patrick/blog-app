'use client'
import { useParams } from 'next/navigation'
import { useState , useEffect } from 'react'
// import { blogPosts } from '../layout/Blogtext'
import axios from 'axios'
import styles from './blogpage.module.css'
import MockData from '../../text'
import { useDarkMode } from '../../contexts/DarkModeContext'
import Link from 'next/link'
import Image from 'next/image'


const Page = () => {
  const { darkstate } = useDarkMode();
  const params = useParams();
  const { id } = params;
  const[ blogPost , setBlogPost ] = useState([])
  const [ isLoading , setIsLoading] = useState(false)
  const currentPosts = MockData
  const singlePost = blogPost.find(post => String(post.id) === String(id));
  const SingleData = MockData.find(post => String(post.id) === String(id));


    // useEffect(() => {
    //   const fetchPost = async () => {  
    //     setIsLoading(true)
    //     await axios.get('https://my.api.mockaroo.com/users.json?key=5233b6a0')
    //     .then((res) => {
    //       setBlogPost(res.data)
    //     })
    //     .catch((error) => {
    //       console.log("Something went wrong", error)
    //     })
    //     .finally(() => setIsLoading(false))
    //   }
    //   fetchPost()
    // }, [])

   
    return (
      <>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center" style={{ minHeight: "400px", width: '100%' }}>
              <div className="flex justify-center items-center w-full" style={{ maxHeight: "300px" }}>
                {darkstate ? (
                  <Image 
                    src='/darkloader.svg' 
                    alt='Loading...' 
                    width={100} 
                    height={100} 
                    className="mx-auto my-auto"
                  />
                ) : (
                  <Image 
                    src='/lightloader.svg' 
                    alt='Loading...' 
                    width={100} 
                    height={100} 
                    className="mx-auto my-auto"
                  />
                )}   
              </div> 
            </div>
          ) : SingleData ? (
            
            <div>
              <div className={`mt-8 mb-8 p-4 rounded ${styles.blogbody}`} style={{ color: 'var(--text)' }}>
                <h2 className="text-2xl font-bold mb-2">{SingleData.title}</h2>
                <p className="text-gray-600 mb-1">
                  {SingleData.author} • {SingleData.date}
                </p>
                {SingleData.image &&
                <Image src={SingleData.image} alt={SingleData.title} width={100} height={100} className='w-full h-60' />}  
                <p>{SingleData.content}</p>
                <p>{SingleData.details}</p>
              </div>
              { currentPosts.length  > 2 && (
                <div className={`${styles.blogbody} mt-10`} >
                <h1 style={{ color: 'var(--text)' }} className='bold text-2xl'> Read this Next </h1>  
                <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 pt-5 pb-5">
                    {currentPosts
                    .slice(0 , 3) 
                    .filter( post => String(post.id) !== String( id ) )
                    .map(post => (
                      <article key={post.id} className="px-0 py-0 shadow-md rounded-md transition-transform duration-300 hover:scale-102">
                        <Link href={`/${post.id}`} className="text-left w-full rounded-md pb-6 transition-all duration-300 hover:scale-[1.02] ">
                          {post.image && 
                          <Image src={post.image} alt={post.title} width={100} height={100} className="w-full h-48 object-cover rounded-tl-md rounded-tr-md" />}
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
              </div>
              )}
              
            </div>
          ) : (
            <div className="flex justify-center items-center" style={{ minHeight: "400px", width: '100%' }}>
              <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                Post not found.
              </span>
            </div>
            
          )}
        </div>
      </>
    )
}

export default Page