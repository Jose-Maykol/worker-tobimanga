import { Context } from 'hono'
import { env } from 'hono/adapter'
import jwt from '@tsndr/cloudflare-worker-jwt'

export const authMiddleware = async (c: Context, next:() => Promise<void>) => {
  const token = c.req.header('Authorization')

  if (!token) {
    c.status(401)
    return c.json({
      message: 'No autorizado'
    })
  }

  try {
    const { payload } = jwt.decode(token)
    c.set('user', payload)
    console.log(payload)
    return next()
  } catch (error) {
    c.status(401)
    return c.json({
      message: 'Token invalido'
    })
  }
}