import { UsersRepository } from "@/modules/users/repositories/users.repository";
import { MailService } from "@/lib/mail";
import { SendAuthCodeDTO } from "../dtos/send-auth-code-dto";
import { UserLoginRepository } from "../repositories/user-login.repository";

export class SendAuthCodeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userLoginRepository: UserLoginRepository
  ) {}

  async execute({ 
    email,
  }: SendAuthCodeDTO): Promise<void> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email)

    if (!checkIfUserExists) {
      return
    }

    const userLoginCode = await this.userLoginRepository.create({
      code: "123456",
      userId: checkIfUserExists.id,
    })

    const mail = new MailService()

    mail.sendMail({
      to: checkIfUserExists.email,
      subject: "Your authentication code",
      html: `<p>Your authentication code is: <strong>${userLoginCode.code}</strong></p>`
    })
  }
}