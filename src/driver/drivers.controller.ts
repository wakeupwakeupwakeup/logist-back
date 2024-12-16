import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver } from './driver.entity';

@Controller('drivers')
export class DriversController {
    constructor(private readonly driversService: DriversService) {}

    @Get()
    async findAll() {
        return this.driversService.findAll();
    }

    @Get(':login')
    async findByLogin(@Param('login') login: string) {
        return this.driversService.findByLogin(login);
    }

    @Patch(':driverId/truck/:truckId')
    async attachTruck(
        @Param('driverId') driverId: number,
        @Param('truckId') truckId: number,
    ) {
        console.log(driverId, truckId);

        return this.driversService.attachTruck(driverId, truckId);
    }

    @Post()
    async create(@Body() driver: Partial<Driver>) {
        return this.driversService.create(driver);
    }
}
