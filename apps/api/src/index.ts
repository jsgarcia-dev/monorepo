import { startServer } from './server'

startServer().catch((error) => {
  console.error('Erro ao iniciar servidor:', error)
  process.exit(1)
})
