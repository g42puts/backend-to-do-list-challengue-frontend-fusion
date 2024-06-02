import { randomInt, randomUUID } from 'crypto';
import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  _id: {
    type: String,
    default: () => randomUUID()
  },
  title: {
    type: String,
    null: false,
  },
  description: {
    type: String,
    null: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: () => new Date().toISOString(),
  },
  last_update: {
    type: String,
  },
});
