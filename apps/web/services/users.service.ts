import { env } from '@/config/env';

export const userService = {
  async getUserByEmail(email: string) {
    try {
      const response = await fetch(`${env.API_URL}/api/users/${email}`);
      if (!response.ok) throw new Error('Usuário não encontrado');
      return response.json();
    } catch {
      return null;
    }
  },

  async getUserById(id: string) {
    try {
      const response = await fetch(`${env.API_URL}/api/users/id/${id}`);
      if (!response.ok) throw new Error('Usuário não encontrado');
      return response.json();
    } catch {
      return null;
    }
  },

  async getAllUsers() {
    try {
      const response = await fetch(`${env.API_URL}/api/users`);
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      return response.json();
    } catch {
      return [];
    }
  },
};
