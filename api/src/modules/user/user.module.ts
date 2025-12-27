import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/models/user.entity';
import { UserhelperService } from './services/user-helper/userhelper.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  controllers: [UserController],
  providers: [UserService, UserhelperService]
})
export class UserModule {}
