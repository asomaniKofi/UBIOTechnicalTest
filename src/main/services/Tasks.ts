import { Logger } from '@ubio/framework';
import { randomUUID } from 'crypto';
import { dep } from 'mesh-ioc';

import { NotFoundError } from '../errorMetrics.js';
import { TaskRepository } from '../repositories/RepoTask.js';
import { StandardLogger } from '@ubio/framework';

export class TaskService {

    @dep() private taskRepository!: TaskRepository;
    @dep() private logger!: Logger;
     constructor(logger?: StandardLogger) {
       if(logger) {
        this.logger = logger;
       }
    }
    
    async getById(taskId: string) {
        const task = await this.taskRepository.getTask(taskId);
        if (!task) {
            throw new NotFoundError('Data not found');
        }
        this.logger.info(`Task fetched`, { taskId });
        return task;
    }

    async getAll() {
        const tasks = await this.taskRepository.getAllTasks();
        if(!tasks) {
         throw new NotFoundError('Data not found');
         }
        return tasks;
    }
    
    async getAllInstances() {
        const instances = await this.taskRepository.getAllInstances();
        if(!instances) {
            throw new NotFoundError('Data not found');
        }
        return instances;
    }

    async create(group:string,  createdAt?: number, updatedAt?: number) {
        const task = {
            id: randomUUID().toString(),
            group,
            createdAt,
            updatedAt
        };
        await this.taskRepository.createTask(task);
        this.logger.info(`Task created`, { task });
        return task.id;
    }

    async markComplete(taskId: string) {
        const updated = await this.taskRepository.updateTask(taskId, { createdAt: Date.now(), updatedAt: Date.now() });
        if (!updated) {
            throw new NotFoundError('Task not found');
        }
        this.logger.info(`Task completed`, { taskId });
    }

    async delete(taskId: string) {
        const deleted = await this.taskRepository.deleteTask(taskId);
        if (!deleted) {
            throw new NotFoundError('Task not found');
        }
        this.logger.info(`Task deleted`, { taskId });
    }

}