import { VerificationTokenRepository } from "../../repositories/auth/verification-token.repository";
import { EmailService } from "./email.service";

export class TokenService {
  private tokenRepository: VerificationTokenRepository;
  private emailService: EmailService;

  constructor() {
    this.tokenRepository = new VerificationTokenRepository();
    this.emailService = new EmailService();
  }

  async generateVerificationToken(email: string) {
    const verificationToken = await this.tokenRepository.create(email);

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${verificationToken.token}`;

    await this.emailService.sendEmail({
      to: email,
      subject: "Verifique sua conta",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">Bem-vindo!</h2>
            <p>Para começar a usar nossa plataforma, verifique seu email clicando no botão abaixo:</p>
            <a 
              href="${verificationUrl}" 
              style="
                background-color: #4CAF50;
                color: white;
                padding: 14px 20px;
                text-decoration: none;
                border-radius: 4px;
                display: inline-block;
                margin: 20px 0;
              "
            >
              Verificar minha conta
            </a>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="color: #666;">${verificationUrl}</p>
            <p style="color: #999; margin-top: 20px;">Se você não criou esta conta, ignore este email.</p>
          </body>
        </html>
      `,
    });

    return verificationToken;
  }

  async verifyToken(token: string) {
    const verificationToken = await this.tokenRepository.findByToken(token);

    if (!verificationToken) {
      throw new Error("Token inválido ou expirado");
    }

    if (verificationToken.expires < new Date()) {
      await this.tokenRepository.delete(verificationToken.id);
      throw new Error("Token expirado");
    }

    await this.tokenRepository.delete(verificationToken.id);
    return verificationToken;
  }
}
