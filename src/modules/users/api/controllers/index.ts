import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user.controller";
import { recoveryPasswordController } from "./recovery-password.controller";
import { resetPasswordController } from "./reset-password.controller";

export function usersController(app: FastifyInstance) {
  app.register(createUserController)
  app.register(recoveryPasswordController)
  app.register(resetPasswordController)
}