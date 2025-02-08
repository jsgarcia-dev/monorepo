import { prisma } from '@repo/database'
import { v4 as uuidv4 } from 'uuid'

export class VerificationTokenRepository {
  async create(email: string) {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await this.findByEmail(email)
    if (existingToken) {
      await this.delete(existingToken.id)
    }

    return prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    })
  }

  async findByToken(token: string) {
    return prisma.verificationToken.findUnique({
      where: { token },
    })
  }

  async findByEmail(email: string) {
    return prisma.verificationToken.findFirst({
      where: { email },
    })
  }

  async delete(id: string) {
    return prisma.verificationToken.delete({
      where: { id },
    })
  }
}
