import { prisma } from "../../../config/prisma";
import { User } from "../../../lib/prisma";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { User } from "../dtos/users";
import { UsersRepository } from "./users.repository";

export class PrismaUsersRepository implements UsersRepository {
  async update(data: Partial<CreateUserDTO>): Promise<User | null> {

    const user = await prisma.user.update({
      where: { id: data.id },
      data
    })

    return user
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    return user   
  }

  async create(data: CreateUserDTO): Promise<User | null> {
    const user = await prisma.user.create({
      data
    })
    
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    return user    
  }


}