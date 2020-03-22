import {  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryColumn()
    public id!: string;

    @Column({
        default: null
    })
    public wx_name!: string;

    @Column({
        default: null
    })
    public avatar!: string;

    @Column({
        default: null
    })
    public name!: string;

    @Column({
        default: null
    })
    public role!: string;

    @Column({
        default: null
    })
    public init!: string;

}
