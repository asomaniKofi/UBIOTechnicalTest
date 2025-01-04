var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Application, Config, Logger, StandardLogger } from '@ubio/framework';
import { MongoDb } from '@ubio/framework/modules/mongodb';
import { TaskService } from './services/Tasks.js';
import { MongoTaskRepository } from './repositories/RepoTask.mongo.js';
import { TaskRepository } from './repositories/RepoTask.js';
import { TaskRouter } from './routes/taskRoutes.js';
import { StatusRouter } from './routes/statusRoutes.js';
import { dep } from 'mesh-ioc';
import { AppConfig } from './config.js';
export class App extends Application {
    constructor() {
        super();
        this.serverStopped = false;
        this.mesh.resolve(Config);
        this.mesh.service(Config, AppConfig);
        this.mesh.alias(Config, AppConfig);
        this.mesh.constant(Config, new AppConfig());
        this.mesh.service(StandardLogger);
        this.mesh.service(MongoDb);
        this.mesh.service(TaskRepository, MongoTaskRepository);
        this.mesh.service(TaskService);
        this.mesh.connect(Application);
        this.mesh.constant(Application, this);
    }
    createGlobalScope() {
        const mesh = super.createGlobalScope();
        mesh.service(Config, AppConfig);
        mesh.connect(this);
        mesh.constant(Config, new AppConfig());
        mesh.service(Logger, StandardLogger);
        mesh.service(MongoDb, MongoDb);
        mesh.service(TaskRepository, MongoTaskRepository);
        mesh.service(TaskService);
        mesh.connect(Application);
        mesh.service(Application);
        mesh.constant(Application, this);
        return mesh;
    }
    createHttpRequestScope() {
        const mesh = super.createHttpRequestScope();
        mesh.service(StatusRouter);
        mesh.service(TaskRouter);
        return mesh;
    }
    async beforeStart() {
        const mongodb = this.mesh.resolve(MongoDb);
        await mongodb.client.connect();
        await this.httpServer.startServer();
    }
    async stop() {
        if (this.serverStopped) {
            return;
        }
        await super.stop();
        this.serverStopped = true;
    }
    async afterStop() {
        await this.httpServer.stopServer();
        if (this.mongodb) {
            await this.mongodb.client.close();
        }
    }
}
__decorate([
    dep(),
    __metadata("design:type", MongoDb)
], App.prototype, "mongodb", void 0);
//# sourceMappingURL=app.js.map