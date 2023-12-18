import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CreateUser_UseCase {
  constructor(private prismaService: PrismaService) {}

  // Method to create a new user in the database
  async createUser(param: { email: string; password: string }) {
    // Destructuring email and password from the input parameter
    const { email, password } = param;

    // Creating a new user using the PrismaService
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password,
      },
      // Selecting specific fields to be returned in the result
      select: {
        id: true,
        email: true,
      },
    });

    // Returning the newly created user
    return newUser;
  }
}
