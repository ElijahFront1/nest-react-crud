import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'user role' })
    readonly value: string;

    @ApiProperty({ example: 'user is admin', description: 'user role description' })
    readonly description: string;
}