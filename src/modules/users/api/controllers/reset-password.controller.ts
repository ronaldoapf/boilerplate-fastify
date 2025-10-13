import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaUsersRepository } from "../../repositories/prisma-users.repository";
import { recoveryPasswordSchema } from "../../dtos/recovery-password-dto";
import { PrismaTokensRepository } from "../../repositories/prisma-tokens.repository";
import { RecoveryPasswordUseCase } from "../../use-cases/recovery-password.use-case";
import { resetPasswordSchema } from "../../dtos/reset-password-dto";
import { ResetPasswordUseCase } from "../../use-cases/reset-password.use-case";

export const resetPasswordController: FastifyPluginAsyncZod = async app => {
  app.post("/users/reset-password", {
    schema: {
      summary: "Reset user's password",
      description: "Endpoint to reset user's password in the system.",
      tags: ["users"],
      body: resetPasswordSchema
    }
  }, async (request, reply) => {
    const { confirmPassword, newPassword, token } = request.body

    const usersRepository = new PrismaUsersRepository()
    const tokensRepository = new PrismaTokensRepository()

    const useCase = new ResetPasswordUseCase(usersRepository, tokensRepository)

    await useCase.execute({
      token,
      newPassword,
      confirmPassword,
    })

    reply.status(201).send(token)
  })
}