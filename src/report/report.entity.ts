import { Address } from 'src/addresses/address.entity';
import { Driver } from 'src/driver/driver.entity';
import { Truck } from 'src/trucks/truck.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    message: string;

    @Column()
    date: Date;

    @Column('simple-json')
    containers: { count: number; volume: number };

    @Column({unique: true})
    beforePhoto: string;

    @Column({unique: true})
    afterPhoto: string;

    @ManyToOne(() => Address, (address) => address.reports)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Truck, (truck) => truck.reports)
    @JoinColumn()
    truck: Truck;

    @ManyToOne(() => Driver, (driver) => driver.reports)
    @JoinColumn()
    driver: Driver;
}
