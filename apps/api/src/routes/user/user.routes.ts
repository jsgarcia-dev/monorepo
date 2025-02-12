import { FastifyPluginCallback } from "fastify";
import { UserService } from "../../services/user/user.service";

export const userRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  const userService = new UserService();

  // GET /users/:email - Buscar usuário por email
  fastify.get("/:email", async (request, reply) => {
    const { email } = request.params as { email: string };

    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return reply.notFound("Usuário não encontrado");
      }

      return user;
    } catch (error) {
      return reply.internalServerError("Erro ao buscar usuário");
    }
  });

  // GET /users/id/:id - Buscar usuário por ID
  fastify.get("/id/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return reply.notFound("Usuário não encontrado");
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return reply.internalServerError("Erro ao buscar usuário");
    }
  });

  // GET /users - Listar todos usuários (com paginação)
  fastify.get("/", async (request, reply) => {
    try {
      const users = await userService.getAllUsers();
      return users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      return reply.internalServerError("Erro ao listar usuários");
    }
  });

  done();
};
