import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { EmailConstructorService } from './email-constructor.service';

export interface SendEmailDTO {
    email: string;
    attackId: string;
}

@Injectable()
export class EmailService {
    private readonly transport: Transporter;

    constructor(
        private readonly emailConstructorService: EmailConstructorService
    ) {

        const senderEmail = process.env.SENDER_EMAIL;
        const senderPassword = process.env.SENDER_PASSWORD;
        const senderHost = process.env.SENDER_EMAIL_SERVER_HOST;

        this.transport = createTransport({
            host: senderHost,
            port: 465,
            secure: true, //ssl
            auth: {
                user: senderEmail,
                pass: senderPassword,
            },
        });
    }

    async sendEmail({ email: targetEmail, attackId }: SendEmailDTO) {

        const senderEmail = process.env.SENDER_EMAIL;
        const senderUsername = process.env.SENDER_USERNAME;

        const emailTemplateFilled = this.emailConstructorService.getEmailAsString({ attackId });
        const fromString = this.emailConstructorService.getFromLine({
            senderEmail,
            senderUsername
        });
        const emailSubject = this.emailConstructorService.getSubjectLine();

        const info = await this.transport.sendMail({
            from: fromString,
            to: targetEmail,
            subject: emailSubject,
            html: emailTemplateFilled,
        });

        return { emailContent: emailTemplateFilled };
    }
}
