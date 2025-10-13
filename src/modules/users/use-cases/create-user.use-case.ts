import { PasswordEncrypter } from "@/lib/password-encrypter";
import { CreateUserDTO } from "../dtos/create-user-dto"
import { UsersRepository } from "../repositories/users.repository"

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ 
    name,
    email, 
    password
  }: CreateUserDTO) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error("User with same email already exists.")
    }

    const passwordEncrypter = new PasswordEncrypter();

    const hashedPassword = await passwordEncrypter.encrypt(password)
    
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}