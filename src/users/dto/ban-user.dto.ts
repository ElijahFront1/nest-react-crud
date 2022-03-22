import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: '1', description: 'user id'})
    readonly userId: number;

    @ApiProperty({example: 'mischievous', description: 'ban reason'})
    readonly banReason: string;
}