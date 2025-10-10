import fastify from "fastify";
import { env } from "./config/env";

export const app = fastify()

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`🚀 Server is running at ${env.API_URL}:${env.PORT}`)
})