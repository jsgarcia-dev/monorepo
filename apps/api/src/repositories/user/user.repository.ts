import { prisma } from '@repo/database'

export class UserRepository {
  async findAll() {
    return prisma.user.findMany()
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        role: true,
        password: true,
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    })

    if (!user) return null

    // Se tem accounts, é login social
    const isOAuthUser = user.accounts.length > 0

    return {
      ...user,
      isOAuthUser,
      // Só incluímos o password se não for OAuth
      password: isOAuthUser ? null : user.password,
    }
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async create(data: { email: string; name: string; password: string }) {
    return prisma.user.create({
      data: {
        ...data,
        role: 'USER',
      },
    })
  }

  async updateEmailVerified(email: string) {
    return prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
      },
    })
  }
}
