import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginProps } from './types';
import { CreateUser } from 'src/user/types';
import { AccessToken } from 'src/decorators/get-accessToken.decorator';
import { ServerResponse } from 'src/utils/ServerResponse';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async login(@Body() body: LoginProps): Promise<Record<string, any>> {
    try {
      const data = await this.authService.login(body);
      return new ServerResponse(200, 'Successfully login!', data);
    } catch (err: any) {
      this.logger.error(`Failed to sign in: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @Post('signup')
  async create(@Body() body: CreateUser) {
    try {
      const data = await this.authService.create(body);
      return new ServerResponse(200, 'Successfully sign up!', data);
    } catch (err: any) {
      this.logger.error(`Failed to sign up: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refreshToken(@AccessToken() accessToken: string) {
    try {
      const data = await this.authService.updateAccessToken(accessToken);
      return new ServerResponse(200, 'Successfully get new token!', data);
    } catch (err: any) {
      this.logger.error(`Failed to get new token: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@AccessToken() accessToken: string) {
    try {
      const data = await this.authService.logout(accessToken);
      return new ServerResponse(200, 'Successfully logout!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@AccessToken() accessToken: string) {
    try {
      const data = await this.authService.profile(accessToken);
      return new ServerResponse(200, 'Successfully get profile', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }
}
