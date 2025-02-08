import { FastifyPluginCallback } from 'fastify'
import { userRoutes } from './user.routes'

export const routes: FastifyPluginCallback = (fastify, opts, done) => {
  // GET /api/users
  fastify.register(userRoutes, { prefix: '/users' })

  done()
}
