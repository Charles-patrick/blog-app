'use client'
import { useParams } from 'next/navigation'
import { useState , useEffect } from 'react'
// import { blogPosts } from '../layout/Blogtext'
import axios from 'axios'


const Page = () => {
  const params = useParams();
  const { id } = params;
  const[ blogPost , setBlogPost ] = useState([])
  
  
    useEffect(() => {
      const fetchPost = async () => {  
        await axios.get('https://my.api.mockaroo.com/users.json?key=5233b6a0')
        .then((res) => {
          setBlogPost(res.data)
        })
        .catch((error) => {
          console.log("Something went wrong", error)
        })
      }
      fetchPost()
    }, [])

    const singlePost = blogPost.find(post => String(post.id) === String(id));

    return (
      <div>
        {singlePost ? (
          <div className="mt-8 mb-8 p-4 rounded">
            <h2 className="text-2xl font-bold mb-2">{singlePost.title}</h2>
            <p className="text-gray-600 mb-1">{singlePost.author} • {singlePost.date}</p>
            <img src={singlePost.image} alt={singlePost.title} className="w-full h-48 object-cover rounded mb-2" />
            <p>{singlePost.content}</p>
            <p>{singlePost.details}</p>
          </div>
        ) : (
          <div>Blog post not found.</div>
        )}
      </div>
)
}

export default Page