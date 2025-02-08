import nodemailer from 'nodemailer'
import 'dotenv/config'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export class EmailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      })

      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }
}
