import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
} from '@nestjs/common';

import { TasksService } from './task.service';
import { ITask } from './types';
import { ApiTags } from '@nestjs/swagger';
import { ServerResponse } from 'src/utils/ServerResponse';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  private logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() body: any) {
    try {
      const data = await this.tasksService.create(body);
      return new ServerResponse(200, 'Successfully created new task!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @Get()
  async findAll(): Promise<ServerResponse<ITask[]> | HttpException> {
    try {
      const data = await this.tasksService.findAll();
      return new ServerResponse(200, 'Successfully get all tasks!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ServerResponse<ITask> | HttpException> {
    try {
      const data = await this.tasksService.findOne(id);
      return new ServerResponse(200, 'Successfully get the task!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }
}
