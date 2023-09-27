import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  imports: [
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
  ],
})
export class AuthModule {}
