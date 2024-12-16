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
            host: process.env.POSTGRESQL_HOST,
            port: parseInt(process.env.POSTGRESQL_PORT, 10),
            username: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PASSWORD,
            database: process.env.POSTGRESQL_DBNAME,
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
