import { Link} from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number
}
export const BlogCard = ({authorName, title, content, publishedDate, id}: BlogCardProps) => {

  return <Link to={`/blog/${id}`}>
      <div className=" border-b p-5 border-slate-200 cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100    rounded-full dark:bg-gray-600">
          <span className="font-light text-sm text-gray-600 dark:text-gray-300">
            {authorName[0].toUpperCase()}
          </span>
        </div>
        <div className="text-sm">{authorName}</div>
        <div className="text-[#777E8B] text-sm">{publishedDate}</div>
      </div>

      <div className="text-2xl font-bold"
      >{title}</div>

      <div className="text-base">{content.slice(0, 200) + " ..."}</div>

      <div className="mt-5 text-xs text-[#777E8B]">
        {`${Math.ceil(content.length / 100)} min read`}
      </div>
    </div>  
  </Link>
}