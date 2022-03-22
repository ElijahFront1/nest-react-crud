import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User)
    private userRepository: typeof User,
        private roleService: RolesService
    ) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");

        //admin admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWQiOjQ4LCJyb2xlIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoiQWRtaW5pc3RyYXRvciIsImNyZWF0ZWRBdCI6IjIwMjItMDMtMTlUMTU6NDM6NTMuMjIwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMTlUMTU6NDM6NTMuMjIwWiJ9XSwiaWF0IjoxNjQ3Nzg0MDAwLCJleHAiOjE2NDc4NzA0MDB9.JtvXxIpmdZq0CKzyo7fMsxG9P__FEKpQabYgxD0G2Cc
        //user user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIiLCJpZCI6NDksInJvbGUiOlt7ImlkIjoyLCJ2YWx1ZSI6IlVTRVIiLCJkZXNjcmlwdGlvbiI6IlVzZXIiLCJjcmVhdGVkQXQiOiIyMDIyLTAzLTE5VDE1OjQ0OjA0LjE3M1oiLCJ1cGRhdGVkQXQiOiIyMDIyLTAzLTE5VDE1OjQ0OjA0LjE3M1oifV0sImlhdCI6MTY0Nzc4NDAyNywiZXhwIjoxNjQ3ODcwNDI3fQ.26DdTRMfgRFCgYtn546e-IwWMoamsDs18GpWPXRA0nU

        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto
        }
        throw new HttpException('user or password not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {        
        const user = await this.userRepository.findByPk(dto.userId);
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save(); //need fix migration
        return user
    }
}
