import { App } from '../main/app.js';
import { MongoDb } from '../main/mongodb.js';
import { TaskRepository } from '../main/repositories/RepoTask.js';
export declare class TestRuntime {
    mongodb: MongoDb;
    taskRepository: TaskRepository;
    app: App;
    setup(): Promise<void>;
    teardown(): Promise<void>;
    dropDatabase(): Promise<void>;
    get baseUrl(): string;
    fetch(path: string, init?: RequestInit): Promise<Response>;
}
export declare const runtime: TestRuntime;
