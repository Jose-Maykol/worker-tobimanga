import { Context, Hono } from "hono";
import { Bindings } from "hono/types";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addUserManga, getUserMangas } from "../controllers/user.controller";

const user = new Hono<{ Bindings: Bindings }>()

user.use('/*', authMiddleware)

user.get('/mangas', (c: Context) => {
  return getUserMangas(c)
})

user.post('/mangas', (c: Context) => {
  return addUserManga(c)
})

export default user