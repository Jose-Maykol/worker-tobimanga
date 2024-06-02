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