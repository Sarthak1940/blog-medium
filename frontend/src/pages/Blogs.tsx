import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks"

export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if (loading) return <div>
    <AppBar/>
  <BlogSkeleton/>
  <BlogSkeleton/>
  <BlogSkeleton/>
  <BlogSkeleton/>
</div>
  
  if (!blogs.length) return <div>No blogs found.</div>
  
  return <div>
    <AppBar/>
    <div className="m-10 flex flex-col gap-3">
      {blogs.map(blog => <BlogCard title={blog.title} content={blog.content} authorName={blog.author.name} id={blog.id} publishedDate="12 Dec"/>)}     
    </div>
    
  </div>
}