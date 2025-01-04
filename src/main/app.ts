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
    @dep() private mongodb!: MongoDb;
    private serverStopped: boolean = false;

    constructor() {
        super();
        // Register global services with the application's mesh
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

    override createGlobalScope() {
        const mesh = super.createGlobalScope();
        // Register global services
        mesh.service(Config, AppConfig);
        mesh.connect(this);
        mesh.constant(Config, new AppConfig());
        mesh.service(Logger, StandardLogger);
        mesh.service(MongoDb,MongoDb);
        mesh.service(TaskRepository, MongoTaskRepository);
        mesh.service(TaskService);
        mesh.connect(Application);
        mesh.service(Application);
        mesh.constant(Application, this);
        return mesh;
    }

    override createHttpRequestScope() {
        const mesh = super.createHttpRequestScope();
        // Register request-scoped services
        mesh.service(StatusRouter);
        mesh.service(TaskRouter);
        return mesh;
    }

    override async beforeStart() {
        // Resolve MongoDb and connect it
        const mongodb = this.mesh.resolve(MongoDb); // Use locally if needed
        await mongodb.client.connect();

        // Start HTTP Server
        await this.httpServer.startServer();
    }
    override async stop(): Promise<void> {
        if(this.serverStopped){
            return;
        }
        await super.stop();
        this.serverStopped = true;
    }

    override async afterStop() {
    
        // Stop HTTP Server
        await this.httpServer.stopServer();

        // Close MongoDb connection if it exists
        if (this.mongodb) {
            await this.mongodb.client.close();
        }
    }
}