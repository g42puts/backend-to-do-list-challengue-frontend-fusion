export interface CreateUser {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
}

export interface IUser extends CreateUser {
  _id: string;
  created_at: string;
}

export interface UserWithoutPassword extends Omit<IUser, 'password'> {}
