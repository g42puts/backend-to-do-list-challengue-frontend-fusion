import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TasksService } from './task.service';
import { ITask } from './types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() body: any) {
    return await this.tasksService.create(body);
  }

  @Get()
  async findAll(): Promise<ITask[]> {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ITask> {
    return await this.tasksService.findOne(id);
  }
}
