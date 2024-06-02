/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono'
import { Bindings } from 'hono/types'
import mangas from './routes/manga.routes'
import auth from './routes/auth.routes'
import user from './routes/user.routes'

const app = new Hono<{ Bindings: Bindings }>()

// Auth routes
app.route('/auth', auth)

// Manga routes
app.route('/mangas', mangas)

// User routes
app.route('/user', user)

app.get('/', (c) => c.text('API Tobimanga'))

export default app
