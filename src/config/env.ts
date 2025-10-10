import { z } from 'zod'

const envSchema = z.object({
  API_URL: z.url(),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export const env = envSchema.parse(process.env)