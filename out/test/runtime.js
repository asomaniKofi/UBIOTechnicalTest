var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    constructor() {
        this.app = new App();
    }
    async setup() {
        this.app = new App();
        const globalMesh = this.app.createGlobalScope();
        globalMesh.connect(new ConsoleLogger());
        globalMesh.service(Application);
        globalMesh.connect(this.app);
        globalMesh.connect(Application);
        globalMesh.service(MongoDb);
        globalMesh.service(MongoDb, MongoDb);
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
    async fetch(path, init) {
        return fetch(`${this.baseUrl}${path}`, init);
    }
}
__decorate([
    dep({ cache: false }),
    __metadata("design:type", MongoDb)
], TestRuntime.prototype, "mongodb", void 0);
__decorate([
    dep({ cache: false }),
    __metadata("design:type", TaskRepository)
], TestRuntime.prototype, "taskRepository", void 0);
export const runtime = new TestRuntime();
//# sourceMappingURL=runtime.js.map