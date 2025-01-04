import { config } from 'dotenv';
import { dep } from 'mesh-ioc';

import { App } from '../main/app.js';
import { MongoDb } from '../main/mongodb.js';
import { MongoTaskRepository } from '../main/repositories/RepoTask.mongo.js';
import Application from 'koa';
import { ConsoleLogger } from '@nodescript/logger';
import { TaskRepository } from '../main/repositories/RepoTask.js';
import { TaskService } from '../main/services/Tasks.js';

config({ path: '.env.test' });

export class TestRuntime {
    @dep({ cache: false }) mongodb!: MongoDb;
    @dep({ cache: false }) taskRepository!: TaskRepository;
    app = new App();

    async setup() {
        this.app = new App();
        const globalMesh = this.app.createGlobalScope();
        globalMesh.connect(new ConsoleLogger()); // Connect logger
        globalMesh.service(Application); // Connect the App to the global Mesh
        globalMesh.connect(this.app); // Connect the App to the global Mesh
        globalMesh.connect(Application); // Connect the App to the global Mesh
        globalMesh.service(MongoDb);
        globalMesh.service(MongoDb,MongoDb);
        globalMesh.service(TaskRepository, MongoTaskRepository);
        globalMesh.service(TaskService);
        await this.app.start();
    }

    async teardown() {
        await this.app.stop();
    }

    async dropDatabase() {
        await this.mongodb.start();
    }

    get baseUrl() {
        return `http://localhost:${process.env.PORT ?? '8081'}`;
    }

    async fetch(path: string, init?: RequestInit) {
        return fetch(`${this.baseUrl}${path}`, init);
    }
}

export const runtime = new TestRuntime();