import { Injectable } from '@nestjs/common';
import { GetUserByEmailAndPassword_UseCase } from './use-cases/getUserByEmailAndPassword.use-case';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly getUserByEmailAndPassword_UseCase: GetUserByEmailAndPassword_UseCase,
  ) {}

  // Method for user authentication and generating an access token
  async login(param: { email: string; password: string }) {
    // Destructuring email and password from the input parameter
    const { email, password } = param;

    // Attempting to retrieve a user based on email and password
    const user = await this.getUserByEmailAndPassword_UseCase.getUser({
      email,
      password,
    });

    // Throwing an error if the user is not found
    if (!user) {
      throw 'Wrong email or password';
    }

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

  // Method to verify and retrieve the payload from an access token
  async getAccessTokenPayload(token: string) {
    // Verifying the access token using the JwtService
    const payload = await this.jwtService.verifyAsync(token, {
      // Using a constant for the secret key (replace with actual secret)
      secret: process.env.SOHA_SECRET,
    });

    // Returning the payload
    return payload;
  }
}
