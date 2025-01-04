import { StandardLogger } from '@ubio/framework';
export declare class TaskService {
    private taskRepository;
    private logger;
    constructor(logger?: StandardLogger);
    getById(taskId: string): Promise<import("../schema/UserSchema.js").HeartBeat>;
    getAll(): Promise<import("../schema/UserSchema.js").HeartBeat[]>;
    getAllInstances(): Promise<import("../schema/InstanceSchema.js").HeartBeatInstance[]>;
    create(group: string, createdAt?: number, updatedAt?: number): Promise<string>;
    markComplete(taskId: string): Promise<void>;
    delete(taskId: string): Promise<void>;
}
