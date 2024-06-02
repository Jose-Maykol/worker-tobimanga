import { Context, Hono } from 'hono';
import { Bindings } from 'hono/types';
import { createManga, getAllMangas, getMangaById } from '../controllers/manga.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const mangas = new Hono<{ Bindings: Bindings }>()

mangas.get('/', (c: Context) => {
  return getAllMangas(c)
})

mangas.get('/:id', (c: Context) => {
  return getMangaById(c)
})

mangas.post('/', (c: Context) => {
  return createManga(c)
})

export default mangas