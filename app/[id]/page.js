'use client'
import { useParams } from 'next/navigation'
import { useState , useEffect } from 'react'
// import { blogPosts } from '../layout/Blogtext'
import axios from 'axios'
import styles from './blogpage.module.css'
import MockData from '../text'

const Page = () => {
  const params = useParams();
  const { id } = params;
  const[ blogPost , setBlogPost ] = useState([])
  const [ isLoading , setIsLoading] = useState(false)
  
  
    useEffect(() => {
      const fetchPost = async () => {  
        setIsLoading(true)
        await axios.get('https://my.api.mockaroo.com/users.json?key=5233b6a0')
        .then((res) => {
          setBlogPost(res.data)
        })
        .catch((error) => {
          console.log("Something went wrong", error)
        })
        .finally(() => setIsLoading(false))
      }
      fetchPost()
    }, [])

    const singlePost = blogPost.find(post => String(post.id) === String(id));
    const SingleData = MockData.find(post => String(post.id) === String(id));
    console.log(MockData)
    return (
      <>
      <div>
        {singlePost &&  isLoading ? (
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
            
          ) : (
           <div className={`mt-8 mb-8 p-4 rounded ${styles.blogbody}`} style={{ color: 'var(--text)' }}>
                <h2 className="text-2xl font-bold mb-2">{SingleData.title}</h2>
                <p className="text-gray-600 mb-1">
                  {SingleData.author} • {SingleData.date}
                </p>      
                <img src={SingleData.image} alt='Blog Image' className='w-full h-60'/>         
                <p>{SingleData.content}</p>
                <p>{SingleData.details}</p>
           </div>
           //   <div className={`mt-8 mb-8 p-4 rounded ${styles.blogbody}`} style={{ color: 'var(--text)' }}>
          //       <h2 className="text-2xl font-bold mb-2">{singlePost.title}</h2>
          //       <p className="text-gray-600 mb-1">
          //         {singlePost.author} • {singlePost.date}
          //       </p>      
          //       <img src={singlePost.image} alt='Blog Image' className='w-full h-60'/>         
          //       <p>{singlePost.content}</p>
          //       <p>{singlePost.details}</p>
          //  </div>
         )}
    
      </div>
          
         
      </>
      



)
}

export default Page