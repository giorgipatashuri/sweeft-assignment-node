import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @Auth()
  updateProfile(@CurrentUser('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(id, dto);
  }
}
