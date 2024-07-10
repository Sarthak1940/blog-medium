import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verifyjwt } from "../middleware/auth.middleware";
import { createBlogInput, updateBlogInput } from "@sarthak1940/blog";

export const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string,
  }, 
  Variables: {
    userId: number
  }
}>();


blog.post("/", verifyjwt, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const {title, content} = body
  
    if (!title || !content) {
      c.status(403)
      throw new Error("Enter title and content")
    }

    const {success} = createBlogInput.safeParse(body)
    if (!success) {
      c.status(403)
      throw new Error("Invalid input")
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: c.get("userId")
      }, 
    })

    if (!blog) {
      c.status(500)
      throw new Error("Blog creation failed")
    }
    return c.json({message: "Blog created successfully", id: blog.id})


  } catch (error) {
    console.log("Error: ", error)
    c.status(401)
  }
})

blog.put("/:id", verifyjwt, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const {title, content} = body
    const userId = c.get("userId")
    const id = c.req.param("id")
    
  
    if (!title || !content) { 
      c.status(403)
      throw new Error("Enter title and content")
    }

    const {success} = updateBlogInput.safeParse(body)
    if (!success) {
      c.status(403)
      throw new Error("Invalid input")
    }

    await prisma.blog.update({
      where: {
        id: parseInt(id, 10),
        authorId: userId,
      },
      data: {
        title,
        content,
      }
    })

    return c.json({message: "Blog updated successfully", blog})

  } catch (error) {
    console.log("Error: ", error)
    c.status(401)
  }
})

blog.get("/bulk", verifyjwt, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blogs = await prisma.blog.findMany({})

    return c.json(blogs)
  } catch (error) {
    console.log("Error: ", error)
    return c.json({error: "failed to get all blogs"}, 500)
  }
})

blog.get("/:id", verifyjwt, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const id = c.req.param("id")

    const blog = await prisma.blog.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })

    return c.json(blog)

  } catch (error) {
    console.log("Error: ", error)
    c.status(401)
  }
})


