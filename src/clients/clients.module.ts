import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsController } from './clients.controller';
import { AddressesModule } from 'src/addresses/addresses.module';
import { Address } from 'src/addresses/address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client, Address])],
    providers: [ClientsService],
    controllers: [ClientsController],
    exports: [ClientsService],
})
export class ClientsModule {}
