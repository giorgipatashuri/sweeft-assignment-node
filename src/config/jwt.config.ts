import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = async (): Promise<JwtModuleOptions> => ({
  secret: process.env.JWT_SECRET,
});
