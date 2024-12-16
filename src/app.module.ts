import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { TrucksModule } from './trucks/trucks.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversModule } from './driver/drivers.module';
import { ReportsModule } from './report/reports,module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'logistic',
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
