import { PrismaClient } from "../lib/prisma";
import { env } from "./env";

export const prisma = new PrismaClient({
  log: [env.NODE_ENV === "development" ? "query" : "error"],
})