import { Context } from 'hono'
import { env } from 'hono/adapter'
import jwt from '@tsndr/cloudflare-worker-jwt'

export const authMiddleware = async (c: Context, next:() => Promise<void>) => {
  const authHeader = c.req.header('Authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    c.status(401)
    return c.json({
      message: 'No autorizado'
    })
  }

  try {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)
    const isValid = await jwt.verify(token, JWT_SECRET)

    if (!isValid) {
      c.status(401)
      return c.json({
        message: 'Token invalido'
      })
    }

    const { payload } = jwt.decode(token)
    c.set('user', payload)
    return next()
  } catch (error) {
    c.status(401)
    return c.json({
      message: 'Token invalido'
    })
  }
}