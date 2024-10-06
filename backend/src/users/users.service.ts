import { Injectable } from '@nestjs/common';
import { PersistenceService } from 'src/persistence/persistence.service';

export type User = any;

@Injectable()
export class UsersService {
    constructor(
        private readonly repository: PersistenceService
    ) { }

    async findOne({ email }: { email: string; }): Promise<User | undefined> {
        try {
            const user = await this.repository.getUserByEmail({
                email: email
            });

            return user;
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async create({ email, password }: { email: string; password: string; }): Promise<User | undefined> {
        try {
            const user = await this.repository.createUser({
                email: email,
                password: password
            });

            return user;
        } catch (e: unknown) {
            console.error(e);
        }
    }
}