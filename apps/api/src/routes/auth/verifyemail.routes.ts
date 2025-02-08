import { FastifyPluginCallback } from 'fastify'
import { TokenService } from '../../services/auth/token.service'

export const verifyEmailRoutes: FastifyPluginCallback = (
  fastify,
  opts,
  done
) => {
  const tokenService = new TokenService()

  fastify.post('/generate', async (request, reply) => {
    const { email } = request.body as { email: string }

    try {
      const token = await tokenService.generateVerificationToken(email)
      return { success: true, token }
    } catch (error) {
      return reply.internalServerError('Erro ao gerar token de verificação')
    }
  })

  fastify.post('/verify', async (request, reply) => {
    const { token } = request.body as { token: string }

    try {
      const verificationToken = await tokenService.verifyToken(token)
      return { success: true, email: verificationToken.email }
    } catch (error) {
      if (error instanceof Error) {
        return reply.badRequest(error.message)
      }
      return reply.badRequest('An unknown error occurred')
    }
  })

  done()
}
