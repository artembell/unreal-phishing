import { Body, Controller, Get, Post, Redirect, UseGuards, Request, Query } from '@nestjs/common';
import { PhishingSimulationService } from './phishing-simulation.service';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';


export class GenerateAttackDTO {
    email: string;
}

@Controller('phishing')
export class PhishingSimulationController {
    constructor(
        private readonly phishingService: PhishingSimulationService
    ) { }

    @Get('catch')
    @Redirect('https://nestjs.com', 302) //temporary
    redirectToTemporaryUrl302(
        @Query('id') attackId: string
    ) {
        if (!!attackId) {
            this.phishingService.changeAttackStatus({ attackId });
        }
    }

    @UseGuards(AuthGuard)
    @Post('send')
    async generatePhisingAttack(
        @Body() generateAttackDTO: GenerateAttackDTO,
        @Request() req
    ) {
        const user = req.user;
        const adminId = user.id;
        const { email } = generateAttackDTO;

        const attempt = await this.phishingService.simulateAttack({ email, byUserId: adminId });
        return { attempt };
    }
}
