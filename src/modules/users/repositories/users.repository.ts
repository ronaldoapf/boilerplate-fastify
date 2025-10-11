import { CreateUserDTO } from "../dtos/create-user-dto"
import { User } from "../dtos/users"

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserDTO): Promise<User | null>
}