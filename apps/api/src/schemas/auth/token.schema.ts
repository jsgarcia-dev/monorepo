import { z } from 'zod'

export const verificationTokenSchema = z.object({
  email: z.string().email('Email inválido'),
  token: z.string().uuid('Token inválido'),
  expires: z.date(),
})

export type VerificationToken = z.infer<typeof verificationTokenSchema>
