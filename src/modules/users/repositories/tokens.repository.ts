import { Token } from "@/lib/prisma"
import { CreateTokenDTO } from "../dtos/create-token-dto"

export interface TokensRepository {
  findByToken(token: string): Promise<Token | null>
  create(data: CreateTokenDTO): Promise<Token>
}