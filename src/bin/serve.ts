#!/usr/bin/env node
import 'reflect-metadata';
import dotenv from 'dotenv';
import { App } from '../main/app.js';
import { ConsoleLogger } from '@nodescript/logger';
import Application from 'koa';

dotenv.config(); // Load environment variables

const app = new App();

try {
    const globalMesh = app.createGlobalScope();
    globalMesh.connect(new ConsoleLogger()); // Connect logger
    globalMesh.connect(Application); // Connect the App to the global Mesh
    globalMesh.connect(app); // Connect the App to the global Mesh
    globalMesh.connect(Application); // Connect the App to the global Mesh
    await app.start();
} catch (error: any) {
    console.error('Failed to start', { error });
    process.exit(1);
}