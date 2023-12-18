import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserByEmailAndPassword_UseCase } from './use-cases/getUserByEmailAndPassword.use-case';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, GetUserByEmailAndPassword_UseCase],
})
export class AuthModule {}
