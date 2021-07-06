import { Injectable, NotFoundException } from '@nestjs/common';
import { Task as ITask, TaskStatus as ETaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto;
    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search))
          return true;

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): ITask {
    // return this.tasks.find((task) => task.id === id);

    const result = this.tasks.find((task) => task.id === id);

    if (!result) throw new NotFoundException(`The id: ${id} isn't existed`);

    return result;
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

  // Call by reference. (Updating)
  updateTask(id: string, status: ETaskStatus): ITask {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  delTaskById(id: string): string {
    // const isExisted = this.tasks.findIndex((task) => task.id === id);

    // if (isExisted === -1) return 'No item be deleted';

    const result = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== result.id);
    return id;
  }
}
