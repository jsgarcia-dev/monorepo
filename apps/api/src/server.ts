import Fastify from 'fastify'
import fastifySensible from '@fastify/sensible'

import { FastifyInstance } from 'fastify'
import { routes } from './routes'
import { colorizerFactory } from 'pino-pretty'

export async function startServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorizerFactory: true,
          messageFormat: '[{time}] {level}: {msg}',
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname,reqId',
        },
      },
      formatters: {
        log(object) {
          // Quando for um log com responseTime, formatamos em milissegundos
          if (typeof object.responseTime === 'number') {
            // Exemplo: duas casas decimais e "ms"
            object.responseTime = `${object.responseTime.toFixed(2)} ms`
          }
          return object
        },
      },
    },
  })

  // Plugins e configurações gerais
  fastify.register(fastifySensible) // Ex: parseErrors, httpErrors etc.

  // Rotas
  fastify.register(routes, { prefix: '/api' })

  // Subir o servidor
  const port = process.env.PORT ? Number(process.env.PORT) : 3001
  await fastify.listen({ port: 3001, host: '127.0.0.1' })
  console.log(`Servidor Fastify rodando na porta ${port}`)
  return fastify
}
