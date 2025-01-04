import { Router } from '@ubio/framework';
export declare class TaskRouter extends Router {
    private taskService;
    getTask(groupID: string): Promise<import("../schema/UserSchema.js").HeartBeat>;
    getTasks(): Promise<import("../schema/UserSchema.js").HeartBeat[]>;
    getAllInstances(): Promise<import("../schema/InstanceSchema.js").HeartBeatInstance[]>;
    createTask(group: string): Promise<string>;
    deleteTask(groupId: string): Promise<void>;
}
