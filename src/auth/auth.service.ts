import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserSerivce } from 'src/user/user.service';
import { LoginProps } from './types';
import { CreateUser, IUser } from 'src/user/types';

@Injectable()
export class AuthService {
  secret_key = process.env.SECRET_KEY;
  constructor(
    private userService: UserSerivce,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginProps): Promise<any> {
    const { username, password } = data;
    const user = await this.userService.findOne(username);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };

    const accessToken = await this.getNewToken(payload);

    await this.userService.updateAccessToken(user._id, accessToken);

    return { accessToken: accessToken };
  }

  async create(data: CreateUser) {
    const { password } = data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    data.password = hash;

    await this.userService.create(data);
  }

  async updateAccessToken(oldAccessToken: string) {
    const user = await this.userService.findByToken(oldAccessToken);
    if (!user.accessToken) throw new NotFoundException();

    const payload = { sub: user._id, username: user.username };
    const accessToken = await this.getNewToken(payload);

    await this.userService.updateAccessToken(user._id, accessToken);

    return { accessToken: accessToken };
  }

  async logout(accessToken: string) {
    await this.userService.logout(accessToken);
  }

  async profile(accessToken: string) {
    return await this.userService.findByToken(accessToken);
  }

  private getNewToken(payload: { sub: string; username: string }): string {
    return this.jwtService.sign(payload, {
      secret: this.secret_key,
    });
  }
}
