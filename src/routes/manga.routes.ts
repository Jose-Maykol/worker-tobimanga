import { Context, Hono } from "hono";
import { Bindings } from "hono/types";
import { getAllMangas } from "../controllers/manga.controller";

const mangas = new Hono<{ Bindings: Bindings }>()

mangas.get('/', (c: Context) => {
  return getAllMangas(c)
})

export default mangas