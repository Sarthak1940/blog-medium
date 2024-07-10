import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'
import { signupInput, signinInput } from "@sarthak1940/blog";

export const user = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const { name, email, password } = body
    
    if (!email || !password) {
      c.status(403)
      throw new Error("All fields are required")
    }

    const {success} = signupInput.safeParse(body)

    if (!success) {
      c.status(403)
      throw new Error("Incorrect inputs")
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    
    return c.json({message: "User created successfully", token})
   
  } catch (error) {
    console.log("Error: ", error); 
    c.status(500)
  }
})

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  try {
    const body = await c.req.json();
    const {email, password} = body

    if (!email ||!password) {
      c.status(403)
      throw new Error("All fields are required")
    }

    const {success} = signinInput.safeParse(body)

    if (!success) {
      c.status(403)
      throw new Error("Incorrect inputs")
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      c.status(401)
      throw new Error("User does not exist")
    }

    if(user.password !== password) {
      c.status(401)
      throw new Error("Incorrect password")
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET)

    return c.json({message: "User signed in successfully", token})

  } catch (error) {
    console.log("Error: ", error); 
    c.status(500)
  }
})