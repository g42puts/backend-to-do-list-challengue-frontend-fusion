import { Controller, Get, Logger } from '@nestjs/common';
import { UserSerivce } from './user.service';
import { UserWithoutPassword } from './types';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private userService: UserSerivce) {}

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    return await this.userService.findAll();
  }
}
