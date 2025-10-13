import { MailService } from "../../../lib/mail";
import { PasswordEncrypter } from "../../../lib/password-encrypter";
import { Token } from "../../../lib/prisma";
import { TokenType } from "../dtos/create-token-dto";
import { RecoveryPasswordDTO } from "../dtos/recovery-password-dto";
import { ResetPasswordDTO } from "../dtos/reset-password-dto";
import { TokensRepository } from "../repositories/tokens.repository";
import { UsersRepository } from "../repositories/users.repository"

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokensRepository: TokensRepository
  ) {}

  async execute({ 
    confirmPassword, 
    newPassword, 
    token
  }: ResetPasswordDTO): Promise<void> {
    const getToken = await this.tokensRepository.findByToken(token)

    console.log(getToken)
    
    if(!getToken) {
      throw new Error("This token is not valid.")
    }

    const user = await this.usersRepository.findById(getToken.userId)

    if(newPassword !== confirmPassword) {
      throw new Error("Password does not match.")
    }

    const passwordEncrypter = new PasswordEncrypter()

    const passwordHashed = await passwordEncrypter.encrypt(newPassword)

    await this.usersRepository.update({
      
    })

    // if (!user) {
    //   throw new Error("Invalid credetnais")
    // }

    // const token = await this.tokensRepository.create({
    //   type: TokenType.PASSWORD_RECOVERY,
    //   userId: user.id
    // })

    // const recoveryLink = `http://localhost:3333/users/reset-password?token=${token.id}`

    // const mailClient = new MailService()

    // mailClient.sendMail({
    //   to: "ronaldo.alves.1997@gmail.com",
    //   subject: "Recovery password",
    //   html: `<p>You requested a password reset. Click the link below to reset your password:</p>
    //          <a href="${recoveryLink}">Reset Password</a>`
    // })
    
    // return token;
  }
}