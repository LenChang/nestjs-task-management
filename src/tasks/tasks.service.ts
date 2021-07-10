import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  // getTasks(): ITask[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search))
  //         return true;
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const result = await this.taskRepository.findOne(id);
    if (!result) throw new NotFoundException(`The id: ${id} isn't existed`);
    return result;
  }

  // createTask(createTaskDto: CreateTaskDto): ITask {
  //   const { title, description } = createTaskDto;
  //   const task: ITask = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: ETaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // // Call by reference. (Updating)
  // updateTask(id: string, status: ETaskStatus): ITask {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // delTaskById(id: string): string {
  //   // const isExisted = this.tasks.findIndex((task) => task.id === id);
  //   // if (isExisted === -1) return 'No item be deleted';
  //   const result = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== result.id);
  //   return id;
  // }
}
