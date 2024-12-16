import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './client.entity';
import { DataSource } from 'typeorm';
import { read, utils } from 'xlsx';
import { Address } from 'src/addresses/address.entity';

@Injectable()
export class ClientsService {
    constructor(private dataSource: DataSource) {}

    findAll() {
        return this.dataSource.getRepository(Client).find();
    }

    async findOne(id: number) {
        const client = await this.dataSource
            .getRepository(Client)
            .findOneBy({ id });

        if (!client) {
            throw new NotFoundException(`Клиент с ID ${id} не найден`);
        }

        const addresses = await this.dataSource
            .getRepository(Address)
            .createQueryBuilder('address')
            .leftJoin('address.truck', 'truck')
            .select([
                'address.id AS id',
                'address.address AS address',
                'address.schedule AS schedule',
                'address.containers AS containers',
                'address.contacts AS contacts',
                'truck.number AS truck',
            ])
            .where('address.clientId = :id', { id })
            .getRawMany();
            
        return {
            name: client.name,
            addresses: addresses.map((address) => ({
                id: address.id,
                address: address.address,
                schedule: address.schedule,
                containers: address.containers,
                contacts: address.contacts,
                truck: address.truck,
            })),
        };
    }

    // async create(client: Partial<Client>) {
    //     const newClient = this.clientsRepository.create(client);
    //     return this.clientsRepository.save(newClient);
    // }

    async upload(file: Express.Multer.File) {
        return this.dataSource.transaction(async (manager) => {
            const workbook = read(file.buffer, { type: 'buffer' });
            const clientName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[clientName];
            const jsonData = utils.sheet_to_json(sheet);

            if (!jsonData.length) {
                throw new Error(
                    'Excel sheet is empty or not formatted correctly.',
                );
            }

            let client = await manager.findOne(Client, {
                where: { name: clientName },
            });

            if (!client) {
                const addresses = jsonData.map((address) => ({
                    address: address['Адрес'] + ', ' + address['Учреждение'],
                    schedule: address['График']
                        .split(',')
                        .map((day) => day.trim()),
                    containers: {
                        volume: address['Объём бака, м3'],
                        count: address['Количество баков'],
                    },
                    contacts: address['Для водителя'],
                }));

                client = manager.create(Client, {
                    name: clientName,
                    addresses: addresses,
                });
                client = await manager.save(Client, client);
                return client;
            }
        });
    }
}
