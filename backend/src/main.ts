import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true
    });

    app.use(cookieParser());
    app.setGlobalPrefix('api');
    await app.listen(process.env.APP_REAL_PORT);
}
bootstrap();
