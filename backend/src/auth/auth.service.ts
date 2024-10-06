import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(
        email: string,
        password: string,
    ): Promise<{ access_token: string; }> {
        const user = await this.usersService.findOne({ email });
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async loginSilent(cookies: any) {
        const { access_token: token } = cookies;
        if (!token) {
            throw new UnauthorizedException('No token.');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            const userEmail = payload.email;

            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (e: unknown) {
            throw new UnauthorizedException();
        }
    }

    async register(
        email: string,
        password: string,
    ): Promise<{ access_token: string; }> {
        const user = await this.usersService.create({ email, password });
        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}