import { Context } from "hono";
import MangaRepository from "../repositories/manga.repository";

export const getAllMangas = async (c: Context) => {
  const mangaRepository = new MangaRepository(c.env.DB)
  const mangas = await mangaRepository.getAllMangas()

  if (mangas.length === 0) {
    c.status(404)
    return c.json({
      message: 'No hay mangas disponibles'
    })
  }
  c.status(200)
  return c.json({
    mangas
  })
}