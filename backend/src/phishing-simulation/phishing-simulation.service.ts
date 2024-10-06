import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/mailer/email.service';
import { PersistenceService } from 'src/persistence/persistence.service';
import { UsersService } from 'src/users/users.service';
import { randomBytes } from 'crypto';

@Injectable()
export class PhishingSimulationService {
    constructor(
        private readonly emailService: EmailService,
        private readonly repository: PersistenceService,
        private readonly usersService: UsersService,
    ) { }

    async simulateAttack({ email, byUserId }: { email: string; byUserId: string; }) {
        const uniqueAttackId = randomBytes(20).toString('hex');
        const { emailContent } = await this.emailService.sendEmail({ email, attackId: uniqueAttackId });

        const attempt = await this.repository.createPhishingAttempt({
            adminId: byUserId,
            targetEmail: email,
            mailContent: emailContent,
            attackId: uniqueAttackId
        });

        return attempt;
    }

    async changeAttackStatus({ attackId }: { attackId: string; }) {
        this.repository.updatePhishingAttemptByAttackId({ attackId });
        return;
    }
}
