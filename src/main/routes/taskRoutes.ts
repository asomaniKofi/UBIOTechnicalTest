import { BodyParam, Delete, Get, PathParam, Post, Put, Router } from '@ubio/framework';
import { dep } from 'mesh-ioc';

import { TaskService } from '../services/Tasks.js';

export class TaskRouter extends Router {
    @dep() private taskService!: TaskService;

    @Get({ path: '/group/{groupId}' })
    async getTask(
        @PathParam('groupId', { schema: { type: 'string' }, required: true })
        groupID: string
    ) {
        return await this.taskService.getById(groupID);
    }

    @Get({ path: '/group' })
    async getTasks() {
        return await this.taskService.getAll();
    }
    
    @Get({path: '/'})
    async getAllInstances() {
        return this.taskService.getAllInstances();
    }

    @Post({ path: '/group/{groupId}' })
    async createTask(
        @BodyParam('group', { schema: { type: 'string' }, required: false })
        group: string
    ) {
        const taskId = await this.taskService.create(group, Date.now(), Date.now());
        this.ctx.status = 201;
        return taskId;
    }

    @Delete({ path: '/group/{groupId}' })
    async deleteTask(
        @PathParam('groupId', { schema: { type: 'string' }, required: true })
        groupId: string
    ) {
        await this.taskService.delete(groupId);
    }
}