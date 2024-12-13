import { RouteAddress } from 'src/route_addresses/route_address.entity';
import { Truck } from 'src/trucks/truck.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => Truck, (truck) => truck.id) truck: Truck;

    @OneToMany(() => RouteAddress, (routeAddress) => routeAddress.id)
    routeAddresses: RouteAddress[];
}
