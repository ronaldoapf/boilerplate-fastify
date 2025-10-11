import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user.controller";

export function usersController(app: FastifyInstance) {
  app.register(createUserController)
}