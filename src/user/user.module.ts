import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UserSerivce } from './user.service';
import { usersProviders } from './users.providers';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  exports: [UserSerivce],
  controllers: [UserController],
  providers: [UserSerivce, ...usersProviders],
})
export class UserModule {}
