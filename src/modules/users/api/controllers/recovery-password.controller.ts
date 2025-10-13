import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaUsersRepository } from "../../repositories/prisma-users.repository";
import { recoveryPasswordSchema } from "../../dtos/recovery-password-dto";
import { PrismaTokensRepository } from "../../repositories/prisma-tokens.repository";
import { RecoveryPasswordUseCase } from "../../use-cases/recovery-password.use-case";

export const recoveryPasswordController: FastifyPluginAsyncZod = async app => {
  app.post("/users/recovery-password", {
    schema: {
      summary: "Recovery user's password",
      description: "Endpoint to recovery user's password in the system.",
      tags: ["users"],
      body: recoveryPasswordSchema
    }
  }, async (request, reply) => {
    const { email } = request.body

    const usersRepository = new PrismaUsersRepository()
    const tokensRepository = new PrismaTokensRepository()

    const useCase = new RecoveryPasswordUseCase(usersRepository, tokensRepository)

    const token = await useCase.execute({
      email
    })

    reply.status(201).send(token)
  })
}