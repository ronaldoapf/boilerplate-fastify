import fastify from "fastify";
import { env } from "./config/env";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { 
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import { usersController } from "./modules/users/api/controllers";
import { authController } from "./modules/auth/api/controllers";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Example',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(authController)
app.register(usersController)

app.listen({
  port: env.PORT,
}).then(() => {
  console.log(`🚀 Server is running at ${env.API_URL}:${env.PORT}`)
  console.log(`🚀 Docs is running at ${env.API_URL}:${env.PORT}/docs`)
})