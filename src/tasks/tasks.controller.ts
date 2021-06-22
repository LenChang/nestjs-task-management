import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as ITask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

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
  getTasks(): ITask[] {
    return this.tasksService.getTasks();
  }

  // localhost:3000/tasks/8aed677a-41f0-46bc-ac1d-8686e0a30f86
  @Get('/:id')
  getTask(@Param('id') id: string): ITask {
    console.log(this.tasksService.getTaskById(id));
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    // console.log(title, description);

    return this.tasksService.createTask(createTaskDto);
  }

  // Example: Func. of Class
  //   helloWorld() {
  //     this.tasksService.doSomething();
  //   }
}
