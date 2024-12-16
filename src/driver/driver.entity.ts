import { Truck } from 'src/trucks/truck.entity';
import { Report } from 'src/report/report.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drivers')
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column({ unique: true })
    password: string;

    @OneToMany(() => Report, (report) => report)
    reports: Report[];

    @OneToOne(() => Truck, (truck) => truck.driver, {
        nullable: true,
        eager: true,
    })
    @JoinColumn()
    truck: Truck;
}
