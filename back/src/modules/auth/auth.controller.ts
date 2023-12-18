import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthGuard } from './auth.guard';

// Swagger API tags for documentation
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Injecting AuthService into the controller through the constructor
  constructor(private readonly authService: AuthService) {}

  // Endpoint for user login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      // Destructuring email and password from the loginDto
      const { email, password } = loginDto;

      // Attempting to authenticate the user using the AuthService
      const login = await this.authService.login({
        email,
        password,
      });

      // Returning the authentication result
      return login;
    } catch (error) {
      // Handling Prisma database errors in a type-safe manner
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        switch (error.code) {
          case 'P1001':
            // Handling a specific database error code
            throw new HttpException(
              'db is offline',
              HttpStatus.INTERNAL_SERVER_ERROR,
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
        case 'Wrong email or password':
          // Handling incorrect login credentials
          throw new HttpException(
            `Wrong email or password`,
            HttpStatus.FORBIDDEN,
          );
        default:
          // Handling other unexpected errors
          throw new HttpException(
            'Something went wrong',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  // Endpoint for checking the validity of an access token
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('check_token')
  async getAccessTokenPayload(@Req() request: any) {
    try {
      // Extracting the authorization header from the request
      const authorizationHeader = request.headers['authorization'];

      // Extracting the token from the authorization header
      const [type, token] = authorizationHeader.split(' ');

      // Verifying the authorization type
      if (type !== 'Bearer') throw 'invalid authorization type';

      // Retrieving the payload from the access token using AuthService
      const payload = await this.authService.getAccessTokenPayload(token);

      // Returning the payload with a successful status
      return {
        status: HttpStatus.OK,
        payload: {
          ...payload,
        },
      };
    } catch (error) {
      // Handling errors and returning a generic error message
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
