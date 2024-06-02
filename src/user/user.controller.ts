import { Controller, Get } from '@nestjs/common';
import { UserSerivce } from './user.service';
import { IUser, UserWithoutPassword } from './types';

@Controller('user')
export class UserController {
  constructor(private userService: UserSerivce) {}

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    return await this.userService.findAll();
  }
}
