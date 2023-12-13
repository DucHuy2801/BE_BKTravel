import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string

    @Column({ type: 'varchar', length: 100 })
    username: string

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string

    @Column({ type: 'nvarchar', length: 30 })
    first_name: string;

    @Column({ type: 'nvarchar', length: 30 })
    last_name: string;

    @Column({ type: 'nvarchar', length: 6, nullable: true })
    gender: string;

    @Column({ type: 'date', nullable: true })
    date_of_birth: Date;

    @Column({ type: 'char', length: 10, nullable: true })
    phone_number: string;

    @Column({ type: 'varchar', length: 20 })
    role_user: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    hashedRt: string;

    @OneToMany(() => CustomerEntity, customer => customer.user)
    customers: CustomerEntity[]
}   