import { Module } from '@nestjs/common';
import { tasksProviders } from './database.providers';

@Module({
  providers: [...tasksProviders],
  exports: [...tasksProviders],
})
export class DatabaseModule {}
