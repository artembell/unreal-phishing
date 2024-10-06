import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailConstructorService } from './email-constructor.service';

@Module({
    controllers: [EmailController],
    providers: [EmailService, EmailConstructorService],
    exports: [EmailService]
})
export class MailerModule { }
