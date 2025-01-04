import { HeartBeat } from '../schema/UserSchema.js';
import { TaskRepository, TaskUpdateSpec } from './RepoTask.js';
import { HeartBeatInstance } from '../schema/InstanceSchema.js';
export declare class MongoTaskRepository extends TaskRepository {
    private mongodb;
    constructor();
    setup(): Promise<void>;
    private get collection();
    private get instanceCollection();
    getTask(id: string): Promise<HeartBeat | null>;
    getAllTasks(): Promise<HeartBeat[]>;
    getAllInstances(): Promise<HeartBeatInstance[]>;
    createTask(heartbeat: HeartBeat): Promise<void>;
    updateInstance(heartbeat: HeartBeat): Promise<void>;
    updateTask(id: string, spec: TaskUpdateSpec): Promise<boolean>;
    deleteTask(id: string): Promise<boolean>;
    private deserialize;
    private deserializeInstance;
}
