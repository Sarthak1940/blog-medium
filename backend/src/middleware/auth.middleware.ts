import { Context } from "hono"
import { verify } from "hono/jwt"

export async function verifyjwt(c: Context, next: () => void) {
  const token = c.req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    c.status(401)
    throw new Error("Missing or invalid token")
  }

  try {
    const decodedToken = await verify(token, c.env.JWT_SECRET)
    c.set("userId", decodedToken.id)
    await next()

  } catch (error) {
    c.status(403)
    return c.json({message: "you are not logged in"})
  }
}