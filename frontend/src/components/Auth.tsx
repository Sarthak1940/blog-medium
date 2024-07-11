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

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs)
      const token = response.data.token
      localStorage.setItem("token", token)
      navigate("/blog")
    } catch (error) {
      alert("Error while signing in")
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