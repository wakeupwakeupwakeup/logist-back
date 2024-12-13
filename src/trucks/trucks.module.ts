import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './truck.entity';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';
import { Address } from 'src/addresses/address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Truck, Address])],
    providers: [TrucksService],
    controllers: [TrucksController],
    exports: [TypeOrmModule],
})
export class TrucksModule {}
