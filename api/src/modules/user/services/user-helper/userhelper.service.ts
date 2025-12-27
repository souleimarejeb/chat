import { Injectable } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { CreateUserDto, LoginUserDto, UserI } from 'src/database/models/dtos/user.dto';

@Injectable()
export class UserhelperService {

    createUserDto(payload: CreateUserDto): Observable<UserI> {
        return of({
            email: payload.email,
            username: payload.username,
            password: payload.password,
        });
    }

    loginUserDto(payload: LoginUserDto): Observable<UserI> {
        return of({
            email: payload.email,
            password: payload.password
        });
    }
}
