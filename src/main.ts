import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Authorization'
    })
    await app.listen(PORT);
}
bootstrap();
