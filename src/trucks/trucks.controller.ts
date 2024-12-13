import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { Truck } from './truck.entity';

@Controller('trucks')
export class TrucksController {
    constructor(private readonly trucksService: TrucksService) {}

    @Get()
    async findAll() {
        return this.trucksService.findAll();
    }

    @Get(':id')
    async getTruckById(@Param('id', ParseIntPipe) id: number) {
        return this.trucksService.findOne(id);
    }

    @Post()
    async create(@Body() truck: Partial<Truck>) {
        return this.trucksService.create(truck);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.trucksService.remove(id);
    }
}
