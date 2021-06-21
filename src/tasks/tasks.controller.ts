import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

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
  getTasks() {
    return this.tasksService.getTasks();
  }

  // Example: Func. of Class
  //   helloWorld() {
  //     this.tasksService.doSomething();
  //   }
}
