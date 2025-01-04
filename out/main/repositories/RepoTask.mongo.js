var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ClientError } from '@ubio/framework';
import { dep } from 'mesh-ioc';
import { MongoDb } from '../mongodb.js';
import { HeartBeatSchema } from '../schema/UserSchema.js';
import { TaskRepository } from './RepoTask.js';
import { HeartBeatInstanceSchema } from '../schema/InstanceSchema.js';
export class MongoTaskRepository extends TaskRepository {
    constructor() {
        super();
        this.setup();
    }
    async setup() {
        await this.collection.createIndex({ _id: 1 });
        await this.instanceCollection.createIndex({ _id: 1 });
    }
    get collection() {
        return this.mongodb.db.collection('heartbeats');
    }
    get instanceCollection() {
        return this.mongodb.db.collection('heartbeatinstances');
    }
    async getTask(id) {
        const doc = await this.collection.findOne({ _id: id });
        return doc ? this.deserialize(doc) : null;
    }
    async getAllTasks() {
        const docs = await this.collection.find().toArray();
        return docs.map(doc => this.deserialize(doc));
    }
    async getAllInstances() {
        const docs = await this.instanceCollection.find().toArray();
        return docs.map(doc => this.deserializeInstance(doc));
    }
    async createTask(heartbeat) {
        try {
            const heartExists = await this.collection.findOne({ _id: heartbeat.id });
            if (heartExists) {
                await this.collection.updateOne({ _id: heartbeat.id }, { $set: { updatedAt: Date.now() } });
                return;
            }
            await this.collection.insertOne({
                _id: heartbeat.id,
                group: heartbeat.group,
                createdAt: heartbeat.createdAt,
                updatedAt: heartbeat.updatedAt,
            });
            await this.updateInstance(heartbeat);
        }
        catch (error) {
            if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
                throw new ClientError(`Task with id ${heartbeat.id} already exists`);
            }
            throw error;
        }
    }
    async updateInstance(heartbeat) {
        const options = { upsert: true };
        try {
            const instanceExists = await this.instanceCollection.findOne({ group: heartbeat.group });
            if (instanceExists) {
                await this.instanceCollection.updateOne({ group: heartbeat.group }, { $inc: { instances: 1 }, $set: { lastUpdatedAt: Date.now() } }, options);
                return;
            }
            await this.instanceCollection.updateOne({ _id: heartbeat.id, group: heartbeat.group }, { $set: { instances: 1, createdAt: Date.now(), lastUpdatedAt: Date.now() } }, options);
        }
        catch (error) {
            console.error('Error updating instance', error);
        }
    }
    async updateTask(id, spec) {
        const res = await this.collection.updateOne({
            _id: id,
        }, {
            $set: {
                ...spec,
            },
        });
        return res.matchedCount > 0;
    }
    async deleteTask(id) {
        const res = await this.collection.deleteOne({ _id: id });
        return res.deletedCount > 0;
    }
    deserialize(doc) {
        return HeartBeatSchema.decode({
            ...doc,
            id: doc._id,
        });
    }
    deserializeInstance(doc) {
        return HeartBeatInstanceSchema.decode({
            ...doc,
            id: doc._id,
        });
    }
}
__decorate([
    dep(),
    __metadata("design:type", MongoDb)
], MongoTaskRepository.prototype, "mongodb", void 0);
//# sourceMappingURL=RepoTask.mongo.js.map