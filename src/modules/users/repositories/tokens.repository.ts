import { CreateTokenDTO } from "../dtos/create-token-dto"
import { Token } from "../dtos/tokens"

export interface TokensRepository {
  findByToken(token: string): Promise<Token | null>
  create(data: CreateTokenDTO): Promise<Token>
}