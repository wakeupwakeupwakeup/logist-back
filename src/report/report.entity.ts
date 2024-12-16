import { Driver } from 'src/driver/driver.entity';
import { Truck } from 'src/trucks/truck.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    message: string;

    @Column()
    date: Date;

    @Column()
    beforePhoto: string;

    @Column()
    afterPhoto: string;

    @ManyToOne(() => Truck, (truck) => truck.reports)
    truck: Truck;

    @ManyToOne(() => Driver, (driver) => driver.reports)
    driver: Driver;
}
