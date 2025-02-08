import { FastifyPluginCallback } from 'fastify'
import { prisma } from '@repo/database'

export const userRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  // GET /users
  fastify.get('/', async (request, reply) => {
    try {
      const users = await prisma.user.findMany()
      return users
    } catch (error) {
      // Tratamento de erro simples
      reply.internalServerError('Erro ao listar usuários')
    }
  })

  done()
}
