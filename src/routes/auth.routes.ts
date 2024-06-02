import { Hono } from 'hono';
import { Bindings } from 'hono/types';
import { createUser } from '../controllers/user.controller';
import { loginUser } from '../controllers/auth.controller';

const auth = new Hono<{ Bindings: Bindings }>()

auth.post('/create/user', async (c) => {
  return createUser(c)
})

auth.post('/login', async (c) => {
  return loginUser(c)
})

export default auth