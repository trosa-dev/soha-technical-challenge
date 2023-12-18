import { Injectable } from '@nestjs/common';
import { CreateUser_UseCase } from './use-cases/createNewUser.use-case';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser_UseCase: CreateUser_UseCase,
    private readonly jwtService: JwtService,
  ) {}

  // Method to create a new user and generate an access token
  async createUser(param: { email: string; password: string }) {
    // Destructuring email and password from the input parameter
    const { email, password } = param;

    // Calling the createUser_UseCase to create a new user
    const user = await this.createUser_UseCase.createUser({ email, password });

    // Creating a JWT payload with the user information
    const payload = { user };

    // Signing the payload to generate an access token
    const accessToken = await this.jwtService.signAsync(payload);

    // Returning user data along with the access token
    return {
      ...user,
      access_token: accessToken,
    };
  }
}
