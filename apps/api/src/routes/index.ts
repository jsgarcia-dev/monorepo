import { FastifyPluginCallback } from 'fastify'
import { userRoutes } from './user/user.routes'
import { verifyEmailRoutes } from './auth/verifyemail.routes'

export const routes: FastifyPluginCallback = (fastify, opts, done) => {
  // GET /api/users
  fastify.register(userRoutes, { prefix: '/users' })

  // Auth Routes
  // POST /api/verify-email
  fastify.register(verifyEmailRoutes, { prefix: '/verify-email' })

  done()
}
