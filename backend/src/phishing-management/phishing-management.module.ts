import { Module } from '@nestjs/common';
import { PhishingManagementService } from './phishing-management.service';
import { PhishingManagementController } from './phishing-management.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PersistenceModule } from 'src/persistence/persistence.module';

@Module({
    imports: [
        AuthModule,
        PersistenceModule
    ],
    controllers: [PhishingManagementController],
    providers: [PhishingManagementService]
})
export class PhishingManagementModule { }
