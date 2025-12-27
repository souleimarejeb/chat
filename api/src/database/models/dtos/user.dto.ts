import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export interface UserI{
    
    id?: number

    username?: string;

    email?: string;

    password?: string;   
}

export class LoginUserDto{

    @IsEmail()
    email?: string;

    @IsNotEmpty()
    password?: string; 
}

export class CreateUserDto extends LoginUserDto{
    
    @IsString()
    username?: string;
}

export class UpdateUserDto extends  PartialType(CreateUserDto) { 
}

