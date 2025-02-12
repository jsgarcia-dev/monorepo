import { FastifyPluginCallback } from "fastify";
import { TokenService } from "../../services/auth/token.service";
import { UserService } from "../../services/user/user.service";

export const verifyEmailRoutes: FastifyPluginCallback = (
  fastify,
  opts,
  done
) => {
  const tokenService = new TokenService();
  const userService = new UserService();

  fastify.post("/generate", async (request, reply) => {
    const { email } = request.body as { email: string };

    try {
      const token = await tokenService.generateVerificationToken(email);
      return { success: true, token };
    } catch (error) {
      return reply.internalServerError("Erro ao gerar token de verificação");
    }
  });

  fastify.post("/verify", async (request, reply) => {
    const { token } = request.body as { token: string };

    // Primeira verificação: token foi enviado na requisição
    if (!token) {
      return reply.badRequest("Token não fornecido");
    }

    try {
      // Segunda verificação: token existe no banco
      const verificationToken = await tokenService.verifyToken(token);

      if (!verificationToken) {
        return reply.badRequest("Token não encontrado");
      }

      // Atualiza o status do email do usuário
      await userService.updateEmailVerified(verificationToken.email);

      return {
        success: true,
        email: verificationToken.email,
        message: "Email verificado com sucesso",
      };
    } catch (error) {
      if (error instanceof Error) {
        return reply.badRequest(error.message);
      }
      return reply.badRequest("Erro desconhecido");
    }
  });

  done();
};
