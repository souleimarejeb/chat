import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './services/user.service';
import { Observable, switchMap } from 'rxjs';
import { CreateUserDto, LoginUserDto, UserI } from 'src/database/models/dtos/user.dto';
import { UserhelperService } from './services/user-helper/userhelper.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from 'src/database/models/dtos/utils.dto';

@Controller('user')
export class UserController {

    constructor(
        private service: UserService,
        private userHelperService: UserhelperService
    ) { }

    @Post()
    create(@Body() payload: CreateUserDto): Observable<UserI> {
        return this.userHelperService.createUserDto(payload).pipe(
            switchMap((user: UserI) => this.service.create(user))
        );
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.service.findAll(paginationDto);
    }

    @Post('login')
    login(@Body() payload: LoginUserDto) {
        return this.userHelperService.loginUserDto(payload).pipe(
            switchMap((user: UserI) => this.service.login(user))
        );

    }
}
