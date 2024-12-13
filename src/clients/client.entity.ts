import { Address } from 'src/addresses/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true, unique: true })
    contacts: string;

    @OneToMany(() => Address, (address) => address.client, { cascade: true })
    addresses: Address[];
}
