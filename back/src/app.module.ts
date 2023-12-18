import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // Registering the JwtModule with global configuration
    JwtModule.register({
      global: true,
      secret: process.env.SOHA_SECRET,
      signOptions: { expiresIn: `${Number(process.env.JWT_TIMEOUT) * 60}s` },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
