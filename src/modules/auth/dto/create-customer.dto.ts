import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCustomerDTO {
    @ApiProperty()
    @IsString()
    first_name: string

    @ApiProperty()
    @IsString()
    last_name: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    confirm_password: string
}