import { Blog } from "../Hooks";
import { AppBar } from "./AppBar";


export const FullBlog = ({blog}: {blog: Blog}) => {
  return <div>
    <AppBar/>
    <div className="grid grid-cols-12 w-full px-10 pt-10">
      <div className="grid col-span-8">
        <div  className="text-5xl font-bold">
          {blog.title}
        </div>

        <div className="text-[#777E8B] text-sm pt-3">
          {"Posted on January 16"}
        </div>

        <div className="text-base pt-3">
          {blog.content}
        </div>
      </div>

      <div className="grid col-span-4">
        Author
        <div className="flex items-center gap-3">
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100  rounded-full dark:bg-gray-600">
            <span className="font-normal text-lg text-gray-600 dark:text-gray-300">
              {blog.author.name[0].toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-xl font-bold">
              {blog.author.name}
            </div>
            <div className=" text-[#777E8B] text-sm mt-2">
            Random catch phrase about the author
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  </div>
}