import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
    constructor(private readonly addressesSerivce: AddressesService) {}

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.addressesSerivce.findOne(id);
    }

    @Get('/client/:id')
    async findByClient(@Param('id', ParseIntPipe) id: number) {
        return this.addressesSerivce.findByClient(id);
    }

    @Post(':addressId/truck/:truckId')
    async attachTruckToAddress(
        @Param('addressId', ParseIntPipe) addressId: number,
        @Param('truckId', ParseIntPipe) truckId: number,
    ) {
        return this.addressesSerivce.attachTruck(addressId, truckId);
    }

    @Patch(':addressId/priority/:priority')
    async changePriority(
        @Param('addressId', ParseIntPipe) addressId: number,
        @Param('priority', ParseIntPipe) priority: number,
    ) {
        return this.addressesSerivce.changePriority(addressId, priority);
    }
}
