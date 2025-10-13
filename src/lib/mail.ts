import nodemailer from "nodemailer"
import { env } from "../config/env";
import { MailtrapTransport } from "mailtrap";

interface SendMailProps {
  to: string;
  html?: string;
  text?: string;
  subject: string;
}

export class MailService {
  private TOKEN = env.MAILTRAP_API_KEY;
  private SENDER = {
    address: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  }

  private async getClient() {
    // const account = await nodemailer.createTestAccount()

    // const mailClient = nodemailer.createTransport({
    //   host: account.smtp.host,
    //   port: account.smtp.port,
    //   secure: account.smtp.secure,
    //   auth: {
    //     user: account.user,
    //     pass: account.pass,
    //   },
    // })

    // return mailClient;

    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: this.TOKEN,
      })
    ) 

    return transport
  }

  async sendMail({ to, text, html, subject }: SendMailProps) {
    const mailClient = await this.getClient();

     const info = await mailClient.sendMail({
      from: this.SENDER,
      to,
      text,
      html,
      subject,
    })

    console.log(info)
  }
}