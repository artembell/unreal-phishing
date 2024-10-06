import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhishingSimulationModule } from 'src/phishing-simulation/phishing.module';
import { AuthModule } from 'src/auth/auth.module';
import { PhishingManagementModule } from 'src/phishing-management/phishing-management.module';

@Module({
    imports: [PhishingSimulationModule, AuthModule, PhishingManagementModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
