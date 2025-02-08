import { UserRepository } from '../../repositories/user/user.repository'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id)
  }

  async updateEmailVerified(email: string) {
    return this.userRepository.updateEmailVerified(email)
  }

  async getAllUsers() {
    return this.userRepository.findAll()
  }
}
