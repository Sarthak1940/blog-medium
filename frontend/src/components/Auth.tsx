import { SignupSchema } from "@sarthak1940/blog";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {

  const navigate = useNavigate()
  const [postInputs, setPostsInputs] = useState<SignupSchema>({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  async function sendRequest() {
    try {
      setLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs)
      const token = response.data.token
      localStorage.setItem("token", token)
      navigate("/blog")
      setLoading(false)
    } catch (error) {
      alert("Error while signing in")
      setLoading(false)
    }
  }

  return <div className="h-screen flex flex-col justify-center">
    <div className="flex justify-center">
      <div>
        <div className="text-4xl font-bold">
          {type === "signup" ? "Create an account" : "Sign In"}
        </div>

        <div className="text-[#777E8B] font-semibold text-base mt-1 text-center">
          {type === "signup" ? "Already have an account?" : "Don't have an account?" }
          <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
          {type === "signup" ? "Login" : "Sign Up"}</Link>
        </div>

        {type === "signup" ? <div className="mt-7">
          <LabelledInput label="Full Name" placeholder="Enter your full name" type="text" onChange={(e) => {
            setPostsInputs({...postInputs, name: e.target.value });
          }}/>
        </div> : null}
        <div className="mt-3">
          <LabelledInput label="Email" placeholder="Enter your email" type="email" onChange={(e) => {
            setPostsInputs({...postInputs, email: e.target.value });
          }}/>
        </div>
        <div className="mt-3">
          <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e) => {
            setPostsInputs({...postInputs, password: e.target.value });
          }}/>
        </div>
        
        <div className="mt-3">
         <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
         onClick={sendRequest}>
            {loading ? <Spinner/> : null}
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
       
      </div>
    </div>
  </div>
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function LabelledInput({label, placeholder, type, onChange}: LabelledInputType) {
  return <div>
    <div className="mb-3">
     <label className="text-base font-medium leading-none peer-disabled:opacity-70">{label}</label>
    </div>
    <div>
     <input className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50" 
     type={type} placeholder={placeholder}
     onChange={onChange}></input>
    </div>
  </div>
}

function Spinner() {
  return <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
  </svg>
}