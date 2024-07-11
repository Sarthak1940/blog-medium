import { useParams } from "react-router-dom";
import { useBlog } from "../Hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
  const {id} = useParams()  
  const {loading, blog} = useBlog({
    id: Number(id)
  });

  if (loading) return <div>
    <AppBar/>
    <BlogSkeleton/>
    <BlogSkeleton/>
    <BlogSkeleton/>
    <BlogSkeleton/>
  </div>
  
  return <div>
   {blog && <FullBlog blog={blog}/>}
  </div>
}