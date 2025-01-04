#!/usr/bin/env node
import 'reflect-metadata';
import dotenv from 'dotenv';
import { App } from '../main/app.js';
import { ConsoleLogger } from '@nodescript/logger';
import Application from 'koa';
dotenv.config();
const app = new App();
try {
    const globalMesh = app.createGlobalScope();
    globalMesh.connect(new ConsoleLogger());
    globalMesh.connect(Application);
    globalMesh.connect(app);
    globalMesh.connect(Application);
    await app.start();
}
catch (error) {
    console.error('Failed to start', { error });
    process.exit(1);
}
//# sourceMappingURL=serve.js.map