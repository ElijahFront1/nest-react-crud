import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.com', description: 'user email'})
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: 'Email is not valid'})
    readonly email: string;

    @IsString({message: 'Should be a string'})
    @Length(4, 16, {message: `Password can't be less than 4 and not more than 16`})
    @ApiProperty({example: 'str132', description: 'user password'})
    readonly password: string;
}