import { Client } from 'src/clients/client.entity';
import { Truck } from 'src/trucks/truck.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    address: string;

    @Column('simple-array')
    schedule: string[];

    @Column('json')
    containers: { count: number; volume: number };

    @Column({ nullable: true })
    contacts: string;

    @Column({ nullable: true })
    priority: number;

    @ManyToOne(() => Truck, (truck) => truck.addresses, {
        nullable: true,
        cascade: true,
    })
    truck: Truck;

    @ManyToOne(() => Client, (client) => client.addresses)
    client: Client;
}
