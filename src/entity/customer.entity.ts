import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('customer')
export class CustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    customer_id: string

    @Column({ type: 'int', default: 0 })
    score: number

    @ManyToOne(() => UserEntity, user => user.customers)
    @JoinColumn({ name: 'customer_id', referencedColumnName: 'user_id'})
    user: UserEntity
}