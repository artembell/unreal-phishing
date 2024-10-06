import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/email.module';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { UsersModule } from 'src/users/users.module';
import { PhishingSimulationController } from './phishing-simulation.controller';
import { PhishingSimulationService } from './phishing-simulation.service';

@Module({
    imports: [MailerModule, PersistenceModule, UsersModule],
    controllers: [PhishingSimulationController],
    providers: [PhishingSimulationService]
})
export class PhishingSimulationModule { }
