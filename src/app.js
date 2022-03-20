import fastify from 'fastify'


import { routes } from './routes/index.js'
import { articleRoute } from './routes/articles/articles.js'

/**
 * @param { import('fastify').FastifyServerOptions } options
 */
export function build(options = {}) {
  const app = fastify(options)

  app.register(routes)
  app.register(articleRoute)

  return app
}
