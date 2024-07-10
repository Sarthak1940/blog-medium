import {Hono} from 'hono'
import { cors } from 'hono/cors'
import {user as userRouter} from "./routes/userRouter"
import {blog as blogRouter} from "./routes/blogRouter"


const app = new Hono()

app.use("/api/v1/*", cors())

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)


export default app
