import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany();
  }
  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async getById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
  async create(dto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...dto,
        balance: 100,
        password: await hash(dto.password),
      },
    });
  }
  async updateProfile(id: number, dto: UpdateUserDto) {
    const isSameUser = await this.getByEmail(dto.email);

    if (isSameUser.id !== id)
      throw new BadRequestException('Email already in use');

    const user = await this.getById(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }
}
