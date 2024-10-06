import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PersistenceService {
    private client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    async getUserById({ userId }: { userId: string; }) {
        try {
            const user = await this.client.user.findUnique({
                where: {
                    id: userId
                }
            });

            return user;
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async getUserByEmail({ email }: { email: string; }) {
        try {
            const user = await this.client.user.findUnique({
                where: {
                    email: email
                }
            });

            return user;
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async createUser({ email, password }: { email: string; password: string; }) {
        try {
            const user = await this.client.user.create({
                data: {
                    email: email,
                    password: password
                }
            });

            return user;
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async createPhishingAttempt({ adminId, targetEmail, mailContent, attackId }: { adminId: string; targetEmail: string; mailContent: string; attackId: string; }) {
        try {
            const values1 = await this.client.phishingAttempt.findMany({
                where: {
                    subjectUser: {
                        id: adminId
                    }
                }
            });

            const values = await this.client.phishingAttempt.create({
                data: {
                    targetUserEmail: targetEmail,
                    subjectUser: {
                        connect: {
                            id: adminId
                        }
                    },
                    mailContent,
                    attackId
                }
            });

            return values;
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async getAllPhishingAttemptsByAdminId({ adminId }: { adminId: string; }) {
        ;
        try {
            const values = await this.client.phishingAttempt.findMany({
                where: {
                    subjectUser: {
                        id: adminId
                    }
                }
            });

            return values;
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async updatePhishingAttemptByAttackId({ attackId }: { attackId: string; }) {
        try {
            const attack = await this.client.phishingAttempt.findFirst({
                where: {
                    attackId: attackId
                }
            });

            if (attack !== null) {
                const updatedAttack = await this.client.phishingAttempt.update({
                    data: {
                        status: 'clicked',
                        attackId: null
                    },
                    where: {
                        id: attack.id
                    }
                });

                return updatedAttack;
            }

            return null;
        } catch (e: unknown) {
            console.error(e);
        }
    }
}
