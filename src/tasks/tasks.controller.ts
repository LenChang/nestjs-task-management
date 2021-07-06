import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as ITask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  // Method 1
  //   tasksService: TasksService;
  //   constructor(tasksService: TasksService) {
  //     this.tasksService = tasksService;
  //   }

  // Method 2: private
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() getTasksFilterDto: GetTasksFilterDto): ITask[] {
    if (Object.keys(getTasksFilterDto).length) {
      return this.tasksService.getTasksWithFilters(getTasksFilterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  // localhost:3000/tasks/8aed677a-41f0-46bc-ac1d-8686e0a30f86
  @Get('/:id')
  getTask(@Param('id') id: string): ITask {
    // console.log(this.tasksService.getTaskById(id));
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    // console.log(title, description);

    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    const { status } = updateTaskDto;

    return this.tasksService.updateTask(id, status);
  }

  @Delete('/:id')
  delTask(@Param('id') id: string): string {
    return this.tasksService.delTaskById(id);
  }

  // Example: Func. of Class
  //   helloWorld() {
  //     this.tasksService.doSomething();
  //   }
}
