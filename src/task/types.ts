export interface ITask {
  _id: String;
  title: String;
  description: String;
  done: Boolean;
  created_at: String;
  last_update: String;
}

export interface CreateTask extends Omit<ITask, '_id' | 'last_update' | 'created_at'> {}

export interface UpdateTask extends CreateTask {}