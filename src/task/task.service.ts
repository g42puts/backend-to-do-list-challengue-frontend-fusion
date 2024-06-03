import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateTask, ITask, UpdateTask } from './types';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<ITask>,
  ) {}

  async create(payload: CreateTask): Promise<ITask> {
    const createTask = await this.taskModel.create(payload);
    return createTask;
  }

  async findAll(): Promise<ITask[]> {
    const data = await this.taskModel.find().exec();
    return data;
  }

  async findOne(id: string): Promise<ITask> {
    const data = await this.taskModel.findOne({ _id: id }).exec();
    return data;
  }

  async changeDone(id: string) {
    const currentData = await this.taskModel.findById(id);
    const data = await this.taskModel.findByIdAndUpdate(id, {
      done: !currentData.done,
    });
    return data;
  }

  async update(id: string, payload: ITask) {
    const data = await this.taskModel.updateOne(
      { _id: id },
      {
        title: payload.title,
        description: payload.description,
        done: payload.done,
        last_update: new Date().toISOString(),
      },
    );
    return data;
  }

  async delete(id: string) {
    const data = await this.taskModel.deleteOne({ _id: id });
    return data;
  }
}
