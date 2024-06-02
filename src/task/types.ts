export interface ITask {
  _id: String;
  title: String;
  description: String;
  done: Boolean;
  created_at: String;
  last_update: String;
}

export interface ITaskWithoutId extends Omit<ITask, '_id'> {}
