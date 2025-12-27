import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { CreateUserDto, UserI } from 'src/database/models/dtos/user.dto';
import { PaginationDto } from 'src/database/models/dtos/utils.dto';
import { UserEntity } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>
    ) { }

    async create(payload: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(payload.password, 12);
        const foundUser = await this.findbyEmail(payload.email)
        if (foundUser) {
            throw new HttpException("Email Arelady in Use ", HttpStatus.CONFLICT)
        }

        try {
            return this.repository.save({
                email: payload.email,
                username: payload.username,
                password: hashedPassword
            });

        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException("Email Arelady in Use ", HttpStatus.CONFLICT)
            }
            throw error;
        }
    }

    // Refactor to JWT 
    async login(user: UserI): Promise<UserI> {
        const foundUser = await this.findbyEmail(user.email);
        const isValid = await this.validatePassword(user.password!, foundUser.password)
        if (isValid) {
            return foundUser;
        } else
            throw new HttpException("login wasn't successful, wrong credentials ", HttpStatus.UNAUTHORIZED);
    }

    async findbyEmail(email?: string) {
        const user = await this.repository.findOne({
            where: { email },
            select: ['id', 'username', 'email', 'password']
        })
        if (!user) {
            throw new NotFoundException("User not found ");
        }
        return user;
    }


    async findOne(email?: string) {
        const user = await this.repository.findOne({
            where: { email }
        })
        if (!user) {
            throw new NotFoundException("User not found ");
        }
        return user;
    }

    async findAll(paginationDto: PaginationDto) {
        let { limit = 10, offset = 0 } = paginationDto;

        const [users, total] = await this.repository.findAndCount({
            take: limit,
            skip: offset,
        })
        return {
            data: users,
            count: total,
            offset,
            limit,
            nextpage: total > offset + limit ? offset + limit : null,
        };
    }


    private validatePassword(password: string, storePasswordHashed: string): Promise<boolean> {
        return bcrypt.compare(password, storePasswordHashed);
    }
}
