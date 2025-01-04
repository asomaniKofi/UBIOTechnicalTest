import { HeartBeat } from '../schema/UserSchema.js';

import {HeartBeatInstance} from '../schema/InstanceSchema.js';

export type TaskUpdateSpec = Partial<Omit<HeartBeat, 'id'>>;

export abstract class TaskRepository {
    abstract getTask(id: string): Promise<HeartBeat | null>;
    abstract getAllTasks(): Promise<HeartBeat[]>;
    abstract createTask(task: HeartBeat): Promise<void>;
    abstract updateTask(id: string, spec: TaskUpdateSpec): Promise<boolean>;
    abstract deleteTask(id: string): Promise<boolean>;
    abstract getAllInstances(): Promise<HeartBeatInstance[]>;
}