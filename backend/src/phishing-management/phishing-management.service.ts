import { Injectable } from '@nestjs/common';
import { PersistenceService } from 'src/persistence/persistence.service';

@Injectable()
export class PhishingManagementService {

    constructor(
        private readonly repository: PersistenceService
    ) { }

    async getAdminAttempts({ adminId }: { adminId: string; }) {
        try {
            const user = await this.repository.getUserById({
                userId: adminId
            });

            const result = await this.repository.getAllPhishingAttemptsByAdminId({
                adminId: adminId,
            });

            return result;
        } catch (e: unknown) {
            console.error(e);
        }
    }
}
