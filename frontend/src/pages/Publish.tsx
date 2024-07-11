import { ChangeEvent, useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { CreateBlogInput } from "@sarthak1940/blog"

export const Publish = () => {
    const [blogInput, setBlogInputs] = useState<CreateBlogInput>({
        title: "",
        content: ""
    })

  return <div>
    <AppBar/>
    <div className="p-12">
        <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-900">Blog Details</label>
            <input type="text" className="bg-gray-50 border focus:outline-none focus:border-none text-gray-900 text-base rounded-lg block w-full p-2.5"
            placeholder="Title of the blog"
            onChange={(e) => {
                setBlogInputs({...blogInput, title: e.target.value });
            }}/>
        </div>
        <Article onChange={(e) => {
                setBlogInputs({...blogInput, content: e.target.value });
            }}/>

        <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        onClick={() => {
            axios.post(`${BACKEND_URL}/api/v1/blog`, blogInput, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
        }}>
        Publish post
    </button>
    </div>
  </div>
}

function Article({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <div className="px-4 py-2 bg-white border-2 rounded-b-lg">
            <label className="sr-only">Publish post</label>
            <textarea rows={8} className="text-base focus:outline-none focus:border-none block w-full px-0  text-gray-800 bg-white border-0" placeholder="Write an article..." required 
            onChange={onChange}></textarea>
        </div>
    </div>
    
 </div>
}