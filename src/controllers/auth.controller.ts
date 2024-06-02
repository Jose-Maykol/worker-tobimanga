import { Context } from 'hono'
import UserRepository from '../repositories/user.repository'
import { User } from '../models.ts/user'
import jwt from '@tsndr/cloudflare-worker-jwt'
import { env } from 'hono/adapter'

export const loginUser = async (c: Context) => {
  const userRepository = new UserRepository(c.env.DB)
  const { email, password } = await c.req.json()

  const loggedUser = await userRepository.existsUserByEmail(email) as User

  if (!loggedUser) {
    c.status(401)
    return c.json({ 
      message: 'Usuario no encontrado'
    })
  }

  const passwordMatch = await userRepository.verifyPassword(password, loggedUser.password)

  if (!passwordMatch) {
    c.status(401)
    return c.json({ 
      message: 'Contraseña incorrecta'
    })
  }
  
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)
  const token = await jwt.sign({ 
    email: loggedUser.email,
    id: loggedUser.id,
  }, JWT_SECRET )

  c.status(200)
  return c.json({
    message: 'Usuario logueado',
    token: token
  })
}