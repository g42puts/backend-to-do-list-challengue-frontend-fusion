import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { ServerResponseInterceptor } from './interceptors';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    UserModule,
    // ThrottlerModule.forRoot([
    //   {
    //     name: 'short',
    //     ttl: 1000,
    //     limit: 5,
    //   },
    //   {
    //     name: 'medium',
    //     ttl: 10000,
    //     limit: 40,
    //   },
    //   {
    //     name: 'long',
    //     ttl: 60000,
    //     limit: 150,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ServerResponseInterceptor,
    },
  ],
})
export class AppModule {}
