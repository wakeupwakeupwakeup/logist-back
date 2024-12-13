import { Injectable, NotFoundException } from '@nestjs/common';
import { Truck } from './truck.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TrucksService {
    constructor(private dataSource: DataSource) {}

    findAll() {
        return this.dataSource.getRepository(Truck).find();
    }

    async findOne(id: number) {
        const truck = await this.dataSource
            .getRepository(Truck)
            .findOneBy({ id });
        if (!truck) {
            throw new NotFoundException();
        }
        return truck;
    }

    async create(truckData: Partial<Truck>) {
        return this.dataSource.transaction(async (manager) => {
            const truck = manager.create(Truck, truckData);
            const savedTruck = await manager.save(truck);
            return savedTruck;
        });
    }

    async remove(id: number) {
        return this.dataSource.transaction(async (manager) => {
            const truck = await manager.findOne(Truck, { where: { id } });

            if (!truck) {
                throw new NotFoundException(`Truck с ID ${id} не найден`);
            }

            await manager.delete(Truck, id);
            return truck;
        });
    }
}
