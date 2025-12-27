import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb',
      port: Number(process.env.PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_ROOT_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
