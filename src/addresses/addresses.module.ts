import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Truck } from 'src/trucks/truck.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Address, Truck])],
    providers: [AddressesService],
    controllers: [AddressesController],
    exports: [AddressesService],
})
export class AddressesModule {}
