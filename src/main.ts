import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'https://wakeupwakeupwakeup-logist-front-0d3f.twc1.net',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    await app.listen(8080);
}
bootstrap();
