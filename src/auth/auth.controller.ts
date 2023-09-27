import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200)
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: authDto) {
    return this.authService.login(dto);
  }
  @HttpCode(200)
  @Post('login/access-token')
  getNewTokens(@Body() dto: refreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
