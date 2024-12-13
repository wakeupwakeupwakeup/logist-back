import { Address } from 'src/addresses/address.entity';
import { Route } from 'src/routes/route.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('route_addresses')
export class RouteAddress {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => RouteAddress, (routeAddress) => routeAddress.route)
    route: Route;

    @ManyToOne(() => Address, (address) => address.id) address: Address;

    @Column({ default: 0 }) priority: number;
}
