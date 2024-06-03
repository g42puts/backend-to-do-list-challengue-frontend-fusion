import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUser, IUser, UserWithoutPassword } from './types';

@Injectable()
export class UserSerivce {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async create(newUser: CreateUser): Promise<CreateUser> {
    const user = await this.userModel.findOne({ email: newUser.email }).exec();
    if (user) throw new InternalServerErrorException();

    return await this.userModel.create(newUser);
  }

  async findOne(username: string) {
    const data = await this.userModel.findOne({ username: username }).exec();
    if (!data) throw new NotFoundException();

    return data;
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return await this.userModel.find({}, { password: false, accessToken: false }).exec();
  }

  async findByToken(
    accessToken: string,
    getAccessToken?: false,
  ): Promise<UserWithoutPassword> {
    const ignore = {} as { password?: boolean; accessToken?: boolean };
    ignore.password = false;
    if (getAccessToken) ignore.accessToken = getAccessToken;

    return await this.userModel.findOne({ accessToken: accessToken }, ignore);
  }

  async updateAccessToken(id: string, accessToken: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { accessToken: accessToken },
    );
  }

  async logout(id: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { accessToken: null },
    );
  }
}
