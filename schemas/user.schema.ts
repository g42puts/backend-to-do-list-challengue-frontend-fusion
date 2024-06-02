import { Schema } from 'mongoose';
import { randomUUID } from 'crypto';

export const UserSchema = new Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
    null: false,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  accessToken: {
    type: String,
    null: true,
  },
  created_at: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});
