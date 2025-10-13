import { Token } from "@/lib/prisma";
import { prisma } from "@/config/prisma";
import { TokensRepository } from "../tokens.repository";
import { CreateTokenDTO } from "../../dtos/create-token-dto";

export class PrismaTokensRepository implements TokensRepository {
  async findByToken(token: string): Promise<Token | null> {
    const currentToken = await prisma.token.findUnique({
      where: { token }
    })

    return currentToken;
  }
  async create({ type, userId }: CreateTokenDTO): Promise<Token> {
    const newToken = await prisma.token.create({
      data: {
        type,
        userId,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
      }
    })

    return newToken;
  }
}