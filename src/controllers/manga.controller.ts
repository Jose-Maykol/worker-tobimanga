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

export const getMangaById = async (c: Context) => {
  const mangaRepository = new MangaRepository(c.env.DB)
  const mangaId: number = parseInt(c.req.param('id'))
  const manga = await mangaRepository.getMangaById(mangaId)

  if (!manga) {
    c.status(404)
    return c.json({
      message: 'Manga no encontrado'
    })
  }

  c.status(200)
  return c.json({
    manga
  })
}

export const createManga = async (c: Context) => {
  const mangaRepository = new MangaRepository(c.env.DB)
  const manga = await c.req.json()

  const created = await mangaRepository.createManga(manga)

  if (!created) {
    c.status(500)
    return c.json({
      message: 'No se pudo crear el manga'
    })
  }

  c.status(201)
  return c.json({
    message: 'Manga creado correctamente'
  })
}