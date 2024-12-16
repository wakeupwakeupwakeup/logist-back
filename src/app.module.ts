import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { TrucksModule } from './trucks/trucks.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './driver/drivers.module';
import { ReportsModule } from './report/reports,module';
import { config } from 'dotenv';

config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DBNAME,
            synchronize: true,
            autoLoadEntities: true,
        }),
        ReportsModule,
        AddressesModule,
        TrucksModule,
        ClientsModule,
        DriversModule,
    ],
})
export class AppModule {}
