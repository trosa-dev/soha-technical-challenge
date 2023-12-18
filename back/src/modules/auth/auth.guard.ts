import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // Implementation of the canActivate method for route authorization
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extracting the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Extracting the authorization token and type from the request headers
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // Checking if the token is missing or the type is not 'Bearer'
    if (!token || type !== 'Bearer') {
      // Throwing an UnauthorizedException if the token is invalid
      throw new UnauthorizedException();
    }

    try {
      // Verifying the JWT token using the JwtService
      await this.jwtService.verifyAsync(token, {
        // Using a constant for the secret key (replace with actual secret)
        secret: process.env.SOHA_SECRET,
      });
    } catch {
      // Throwing an UnauthorizedException if the token verification fails
      throw new UnauthorizedException();
    }

    // Returning true if the token is valid and the request can proceed
    return true;
  }
}
