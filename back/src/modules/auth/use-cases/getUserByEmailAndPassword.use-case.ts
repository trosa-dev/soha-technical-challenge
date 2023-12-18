import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

// Interface defining parameters for the GetUserByEmailAndPassword_UseCase
interface GetUserByEmailAndPasswordParam {
  email: string;
  password: string;
}

@Injectable()
export class GetUserByEmailAndPassword_UseCase {
  // Injecting PrismaService into the UseCase through the constructor
  constructor(private prismaService: PrismaService) {}

  // Method to retrieve a user based on email and password
  async getUser(param: GetUserByEmailAndPasswordParam) {
    // Destructuring email and password from the input parameter
    const { email, password } = param;

    // Using PrismaService to query the database for a user
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        password,
      },
      // Selecting specific fields to be returned in the result
      select: {
        id: true,
        email: true,
      },
    });

    // Returning the user data
    return user;
  }
}
