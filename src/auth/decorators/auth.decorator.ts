import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
type TypeRole = 'admin' | 'user' | undefined;
export const Auth = (role?: TypeRole) =>
  applyDecorators(
    role === 'admin'
      ? UseGuards(AuthGuard('jwt'), AdminGuard)
      : UseGuards(AuthGuard('jwt')),
  );
