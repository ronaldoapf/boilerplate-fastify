import { Token } from "@/lib/prisma";
import { TokenType } from "../dtos/create-token-dto";
import { RecoveryPasswordDTO } from "../dtos/recovery-password-dto";
import { TokensRepository } from "../repositories/tokens.repository";
import { UsersRepository } from "../repositories/users.repository"
import { MailService } from "@/lib/mail";

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokensRepository: TokensRepository
  ) {}

  async execute({ 
    email, 
  }: RecoveryPasswordDTO): Promise<Token> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error("Invalid credetnais")
    }

    const token = await this.tokensRepository.create({
      type: TokenType.PASSWORD_RECOVERY,
      userId: user.id
    })

    const recoveryLink = `http://localhost:3333/users/reset-password?token=${token.id}`

    const mailClient = new MailService()

    mailClient.sendMail({
      to: user.email,
      subject: "Recovery password",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${recoveryLink}">Reset Password</a>`
    })
    
    return token;
  }
}