import { DataSource } from 'typeorm';
import { Driver } from './driver.entity';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Truck } from 'src/trucks/truck.entity';

@Injectable()
export class DriversService {
    constructor(private dataSource: DataSource) {}

    findAll() {
        return this.dataSource.getRepository(Driver).find();
    }

    async findOne(id: number) {
        const driver = await this.dataSource
            .getRepository(Driver)
            .findOneBy({ id });
        if (!driver) {
            throw new NotFoundException();
        }

        return driver;
    }

    async findByLogin(login: string) {
        const driver = await this.dataSource
            .getRepository(Driver)
            .findOneBy({ login });

        if (!driver) {
            throw new NotFoundException();
        }

        return driver;
    }

    async attachTruck(driverId: number, truckId: number) {
        const driver = await this.findOne(driverId);
        const truck = await this.dataSource.getRepository(Truck).findOneBy({
            id: truckId,
        });
        if (!truck || !driver) {
            throw new NotFoundException();
        }
        driver.truck = truck;
        return this.dataSource.transaction(async (manager) => {
            return manager.save(driver);
        });
    }

    async create(driver: Partial<Driver>) {
        const { login, password } = driver;
        const isDriver = await this.dataSource
            .getRepository(Driver)
            .findOneBy({ login });
        if (isDriver) {
            throw new ConflictException();
        }
        return this.dataSource.transaction(async (manager) => {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newDriver = manager.create(Driver, {
                login,
                password: hashedPassword,
            });
            return manager.save(newDriver);
        });
    }
}
