import { Address } from 'src/addresses/address.entity';
import { Driver } from 'src/driver/driver.entity';
import { Report } from 'src/report/report.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('trucks')
export class Truck {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    number: string;

    @OneToMany(() => Address, (address) => address.truck)
    addresses: Address[];

    @OneToMany(() => Report, (report) => report.truck)
    reports: Report[];

    @OneToOne(() => Driver, (driver) => driver.truck, {
        cascade: true,
        nullable: true,
    })
    @JoinColumn()
    driver: Driver;
}
