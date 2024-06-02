import * as mongoose from "mongoose";

export const tasksProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://gilmarneo:tWktv2wtQrdxRXMG@clustertester.qs0gqkz.mongodb.net/gilmarneo'),
  },
];
