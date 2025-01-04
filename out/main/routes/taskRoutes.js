var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BodyParam, Delete, Get, PathParam, Post, Router } from '@ubio/framework';
import { dep } from 'mesh-ioc';
import { TaskService } from '../services/Tasks.js';
export class TaskRouter extends Router {
    async getTask(groupID) {
        return await this.taskService.getById(groupID);
    }
    async getTasks() {
        return await this.taskService.getAll();
    }
    async getAllInstances() {
        return this.taskService.getAllInstances();
    }
    async createTask(group) {
        const taskId = await this.taskService.create(group, Date.now(), Date.now());
        this.ctx.status = 201;
        return taskId;
    }
    async deleteTask(groupId) {
        await this.taskService.delete(groupId);
    }
}
__decorate([
    dep(),
    __metadata("design:type", TaskService)
], TaskRouter.prototype, "taskService", void 0);
__decorate([
    Get({ path: '/group/{groupId}' }),
    __param(0, PathParam('groupId', { schema: { type: 'string' }, required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskRouter.prototype, "getTask", null);
__decorate([
    Get({ path: '/group' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskRouter.prototype, "getTasks", null);
__decorate([
    Get({ path: '/' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskRouter.prototype, "getAllInstances", null);
__decorate([
    Post({ path: '/group/{groupId}' }),
    __param(0, BodyParam('group', { schema: { type: 'string' }, required: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskRouter.prototype, "createTask", null);
__decorate([
    Delete({ path: '/group/{groupId}' }),
    __param(0, PathParam('groupId', { schema: { type: 'string' }, required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskRouter.prototype, "deleteTask", null);
//# sourceMappingURL=taskRoutes.js.map