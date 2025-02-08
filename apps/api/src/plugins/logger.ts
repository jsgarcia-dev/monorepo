import pino, { LoggerOptions } from 'pino'

/**
 * Configuração recomendada para produção:
 * - Logs em formato JSON (padrão do pino), para fácil integração com observabilidade
 * - Nível de log "info" (ajuste conforme necessidade)
 * - Possível adição de serializers/formatters se quiser manipular campos específicos
 */
const pinoConfig: LoggerOptions = {
  level: 'info',
  // Mantenha timestamp como padrão do pino (true), pois é útil em produção.
  // Se quiser customizar, pode usar: timestamp: pino.stdTimeFunctions.isoTime
  // Ex.: timestamp: () => `,"time":"${new Date().toISOString()}"`,
}

export const logger = pino(pinoConfig)