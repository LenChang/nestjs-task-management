import { Injectable } from '@nestjs/common';
import { Task as ITask, TaskStatus as ETaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
