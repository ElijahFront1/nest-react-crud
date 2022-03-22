import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Should be a string'})
    @ApiProperty({example: 'ADMIN', description: 'user role'})
    readonly value: string;

    @IsNumber({}, {message: 'Should be a number'})
    @ApiProperty({example: '1', description: 'user id'})
    readonly userId: number;
}