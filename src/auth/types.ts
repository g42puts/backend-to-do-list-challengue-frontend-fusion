export interface LoginProps {
  username: string;
  password: string;
}

export type TokenPayload = {
  sub: string;
  username: string;
};