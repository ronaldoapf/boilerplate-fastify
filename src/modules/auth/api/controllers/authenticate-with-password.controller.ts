import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { authWithPasswordSchema } from "../../dtos/authenticate-with-password-dto"
import { PrismaUsersRepository } from "@/modules/users/repositories/prisma/prisma-users.repository"
import { AuthenticateWithPasswordUseCase } from "../../use-cases/authenticate-with-password.usecase"

export const authenticateWithPasswordController: FastifyPluginAsyncZod = async app => {
  app.post("/auth/password", {
    schema: {
      summary: "Authenticate user with password",
      description: "Endpoint to authenticate a user with email and password.",
      tags: ["auth"],
      body: authWithPasswordSchema
    }
  }, async (request, reply) => {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new AuthenticateWithPasswordUseCase(usersRepository)

    await useCase.execute(request.body)

    reply.status(200).send()
  })
}