import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PhishingManagementService } from './phishing-management.service';

export class FindAttempts {
    email: string;
}

@Controller('phishing')
export class PhishingManagementController {
    constructor(
        private readonly managementService: PhishingManagementService
    ) { }

    @UseGuards(AuthGuard)
    @Get('attempts')
    async getAttempts(
        @Request() req,
    ) {
        const user = req.user;
        const adminId = user.id;

        const attempts = await this.managementService.getAdminAttempts({
            adminId
        });


        return { attempts: attempts };
    }
}
