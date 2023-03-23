import {  IsDateString, IsNotEmpty,  IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity()
export class ToDo {
    @Column()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsDateString()
    reg_date: Date;
}
