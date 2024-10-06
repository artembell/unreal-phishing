import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Request,
    Res,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response, Request as ExpressRequest } from 'express';

export class SignInDTO {
    email: string;
    password: string;
}


export class RegisterDTO {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async signIn(
        @Body() signInDto: SignInDTO,
        @Res() response: Response
    ) {
        const { email, password } = signInDto;
        const token = await this.authService.signIn(email, password);

        response.cookie('access_token', token.access_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return response.status(200).send(token);
    }

    @Post('signout')
    async signOut(
        @Res() response: Response
    ) {
        response.clearCookie('access_token');
        return response.status(200).send();
    }

    @Post('register')
    async register(
        @Body() register: RegisterDTO,
        @Res() response: Response
    ) {
        const { email, password } = register;
        const token = await this.authService.register(email, password);

        response.cookie('access_token', token.access_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            path: '/'
        });
        return response.status(200).send(token);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    loginSilent(
        @Body() signInDto: SignInDTO,
        @Res() response: Response,
        @Req() request: Request,
    ) {
        const user = request['user'];
        return response.status(200).send({ email: user.email });
    }
}