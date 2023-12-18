import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUser_UseCase } from './use-cases/createNewUser.use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, CreateUser_UseCase],
})
export class UserModule {}
