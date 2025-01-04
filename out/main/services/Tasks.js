var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Logger } from '@ubio/framework';
import { randomUUID } from 'crypto';
import { dep } from 'mesh-ioc';
import { NotFoundError } from '../errorMetrics.js';
import { TaskRepository } from '../repositories/RepoTask.js';
export class TaskService {
    constructor(logger) {
        if (logger) {
            this.logger = logger;
        }
    }
    async getById(taskId) {
        const task = await this.taskRepository.getTask(taskId);
        if (!task) {
            throw new NotFoundError('Data not found');
        }
        this.logger.info(`Task fetched`, { taskId });
        return task;
    }
    async getAll() {
        const tasks = await this.taskRepository.getAllTasks();
        if (!tasks) {
            throw new NotFoundError('Data not found');
        }
        return tasks;
    }
    async getAllInstances() {
        const instances = await this.taskRepository.getAllInstances();
        if (!instances) {
            throw new NotFoundError('Data not found');
        }
        return instances;
    }
    async create(group, createdAt, updatedAt) {
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
    async markComplete(taskId) {
        const updated = await this.taskRepository.updateTask(taskId, { createdAt: Date.now(), updatedAt: Date.now() });
        if (!updated) {
            throw new NotFoundError('Task not found');
        }
        this.logger.info(`Task completed`, { taskId });
    }
    async delete(taskId) {
        const deleted = await this.taskRepository.deleteTask(taskId);
        if (!deleted) {
            throw new NotFoundError('Task not found');
        }
        this.logger.info(`Task deleted`, { taskId });
    }
}
__decorate([
    dep(),
    __metadata("design:type", TaskRepository)
], TaskService.prototype, "taskRepository", void 0);
__decorate([
    dep(),
    __metadata("design:type", Logger)
], TaskService.prototype, "logger", void 0);
//# sourceMappingURL=Tasks.js.map