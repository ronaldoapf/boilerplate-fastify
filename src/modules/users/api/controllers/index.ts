import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user.controller";
import { resetPasswordController } from "./reset-password.controller";
import { forgotPasswordController } from "./forgot-password.controller";

export function usersController(app: FastifyInstance) {
  app.register(createUserController)
  app.register(forgotPasswordController)
  app.register(resetPasswordController)
}