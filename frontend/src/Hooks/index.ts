import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"



export interface Blog {
  title: string;
  content: string;
  publishedDate: string;
  id: number;
  author: {
    name: string;
  }
}

export const useBlog = ({id}: {id: number}) => {
  const [loading, setLoading] = useState(false)
  const [blog, setBlog] = useState<Blog>()
 
  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      setBlog(response.data)
      setLoading(false)
    })
  }, [id])

  return {
    loading,
    blog
  }
}

export const useBlogs = () => {
  const [ loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      setBlogs(response.data)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blogs
  }
}