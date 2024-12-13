import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { TrucksModule } from './trucks/trucks.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: 5432,
            username: process.env.DATABASE_USER || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'admin',
            database: process.env.DATABASE_NAME || 'logistic',
            synchronize: true,
            autoLoadEntities: true,
        }),
        AddressesModule,
        TrucksModule,
        ClientsModule,
    ],
})
export class AppModule {}
