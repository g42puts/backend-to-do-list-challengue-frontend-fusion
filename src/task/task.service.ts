import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITask, ITaskWithoutId } from './types';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<ITask>,
  ) {}

  async create(createTaskDto: ITaskWithoutId): Promise<ITask> {
    const { done } = createTaskDto;
    if (!done) createTaskDto.done = false;
    console.log(createTaskDto);

    const createTask = this.taskModel.create(createTaskDto);
    return createTask;
  }

  async findAll(): Promise<ITask[]> {
    const data = await this.taskModel.find().exec();
    console.log(data);
    return data;
  }

  async findOne(id: string): Promise<ITask> {
    const data = await this.taskModel.findOne({ _id: id }).exec();
    console.log(data);

    return data;
  }
}
