import { Context } from 'hono'
import UserRepository from '../repositories/user.repository'
import { CreateUserDto } from '../dtos/user'


export const createUser = async (c: Context) => {
  const userRepository = new UserRepository(c.env.DB)
  const user: CreateUserDto = await c.req.json()

  const createdUser = await userRepository.createUser(user)

  if (!createdUser) {
    c.status(500)
    return c.json({
      message: 'No se pudo crear el usuario'
    })
  }

  c.status(201)
  return c.json({
    message: 'Usuario creado correctamente'
  })
}

export const addUserManga = async (c: Context) => {
  const userRepository = new UserRepository(c.env.DB)
  const { userId, mangaId } = await c.req.json()

  const addedManga = await userRepository.addUserManga(userId, mangaId)

  if (!addedManga) {
    c.status(500)
    return c.json({
      message: 'No se pudo agregar el manga al usuario'
    })
  }

  c.status(201)
  return c.json({
    message: 'Manga agregado correctamente'
  })
}


export const getUserMangas = async (c: Context) => {
  const userRepository = new UserRepository(c.env.DB)
  const user = c.get('user')

  const mangas = await userRepository.getUserMangas(user.id)

  if (mangas.length === 0) {
    c.status(404)
    return c.json({
      message: 'Aun no tienes mangas agregados'
    })
  }

  c.status(200)
  return c.json({
    mangas
  })
}