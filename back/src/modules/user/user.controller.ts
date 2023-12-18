import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { Prisma } from '@prisma/client';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint for creating a new user
  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    try {
      // Destructuring email and password from the createUserDto
      const { email, password } = createUserDto;

      // Calling the userService to create a new user
      return await this.userService.createUser({ email, password });
    } catch (error) {
      // Handling Prisma database errors in a type-safe manner
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        switch (error.code) {
          case 'P1001':
            // Handling a specific database error code (e.g., database offline)
            throw new HttpException(
              'db is offline',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          case 'P2002':
            // Handling unique constraint violation (duplicate email)
            throw new HttpException(
              'There is a unique constraint violation, a new user cannot be created with this email',
              HttpStatus.CONFLICT,
            );
          default:
            // Handling other unhandled database error codes
            throw new HttpException(
              `Unhandled error code: ${error.code}`,
              HttpStatus.BAD_REQUEST,
            );
        }
      }

      // Handling custom application errors
      switch (error) {
        default:
          // Handling other unexpected errors
          throw new HttpException(
            'Something went wrong',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }
}
