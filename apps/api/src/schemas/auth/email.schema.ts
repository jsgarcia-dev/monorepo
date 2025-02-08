import { z } from 'zod'

export const sendVerificationEmailSchema = z.object({
  email: z.string().email('Email inválido'),
  token: z.string().uuid('Token inválido'),
})
