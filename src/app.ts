import fastify from "fastify";
import { env } from "./config/env";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const app = fastify()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`🚀 Server is running at ${env.API_URL}:${env.PORT}`)
  console.log(`🚀 Docs is running at ${env.API_URL}:${env.PORT}/docs`)

})