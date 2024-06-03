import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TasksService } from './task.service';
import { ITask, UpdateTask } from './types';
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

  @Get('done/:id')
  async changeDone(@Param('id') id: string) {
    try {
      const data = await this.tasksService.changeDone(id);
      return new ServerResponse(200, 'Successfully changed done status!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @Put(':id')
  async update(@Body() payload: ITask, @Param('id') id: string) {
    try {
      const data = await this.tasksService.update(id, payload);
      return new ServerResponse(200, 'Successfully updated data!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const data = await this.tasksService.delete(id);
      return new ServerResponse(200, 'Successfully deleted data!', data);
    } catch (err: any) {
      this.logger.error(`Failed to logout: ${err}`);
      return new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }
}
