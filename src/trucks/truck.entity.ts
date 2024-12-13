import { Address } from 'src/addresses/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trucks')
export class Truck {
    @PrimaryGeneratedColumn() id: number;
    @Column({ unique: true }) number: string;
    @OneToMany(() => Address, (address) => address.truck)
    addresses: Address[];
}
