import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { DataSource, Repository } from 'typeorm';
import { Truck } from 'src/trucks/truck.entity';

@Injectable()
export class AddressesService {
    constructor(private dataSource: DataSource) {}

    async findByClient(id: number) {
        const addresses = await this.dataSource
            .getRepository(Address)
            .find({ where: { client: { id } }, relations: ['client'] });

        if (!addresses.length) {
            throw new NotFoundException(
                'Адреса для данного клиента не были найдены',
            );
        }

        return addresses;
    }

    async attachTruck(addressId: number, truckId: number) {
        return this.dataSource.transaction(async (manager) => {
            const address = await manager.findOne(Address, {
                where: { id: addressId },
                relations: ['truck'],
            });

            if (!address) {
                throw new NotFoundException('Адрес с данным ID не найден');
            }

            const truck = await manager.findOneBy(Truck, { id: truckId });

            if (!truck) {
                throw new NotFoundException('Машина с данным ID не найдена');
            }

            address.truck = truck;

            await manager.save(Address, address);

            return {
                message: 'Машина успешно прикреплена к адресу',
                addressId: address.id,
                truckId: truck.id,
            };
        });
    }
}
