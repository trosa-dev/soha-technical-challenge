import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Implementation of the onModuleInit method from the OnModuleInit interface
  async onModuleInit() {
    // Connecting to the database when the module is initialized
    await this.$connect();
  }
}
