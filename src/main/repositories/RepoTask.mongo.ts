import { ClientError } from '@ubio/framework';
import { dep } from 'mesh-ioc';
import { MongoDb } from '../mongodb.js';
import { HeartBeat, HeartBeatSchema } from '../schema/UserSchema.js';
import { TaskRepository, TaskUpdateSpec } from './RepoTask.js';
import {HeartBeatInstance, HeartBeatInstanceSchema} from '../schema/InstanceSchema.js';

interface HeartBeatData {
    _id: string;
    group: string;
    createdAt?: number;
    updatedAt?: number;
}

interface HeartBeatInstanceData {
   _id: string;
   group: string,
   instances: number,
   createdAt?: number;
   lastUpdatedAt?: number;
}

export class MongoTaskRepository extends TaskRepository {
    @dep() private mongodb!: MongoDb;
    
    constructor() {
        super();
        this.setup();
    }

    async setup() {
        await this.collection.createIndex({_id: 1});
        await this.instanceCollection.createIndex({_id: 1});
    }

    private get collection() {
        return this.mongodb.db.collection<HeartBeatData>('heartbeats');
    }
    
    private get instanceCollection() {
        return this.mongodb.db.collection<HeartBeatInstanceData>('heartbeatinstances');
    }

    async getTask(id: string): Promise<HeartBeat | null> {
        const doc = await this.collection.findOne({ _id: id });
        return doc ? this.deserialize(doc) : null;
    }

    async getAllTasks(): Promise<HeartBeat[]> {
        const docs = await this.collection.find().toArray();
        return docs.map(doc => this.deserialize(doc));
    }
    
    async getAllInstances(): Promise<HeartBeatInstance[]> {
        const docs = await this.instanceCollection.find().toArray();
        return docs.map(doc => this.deserializeInstance(doc));
    }

    async createTask(heartbeat: HeartBeat) {
        try {
        /**
        check if entry exists if it does just update updatedAt
        */
        const heartExists = await this.collection.findOne({_id: heartbeat.id});
        if(heartExists) {
            await this.collection.updateOne(
                {_id: heartbeat.id},
                { $set: {updatedAt: Date.now() } }
            );
            return;
        }
            await this.collection.insertOne({
                _id: heartbeat.id,
                group: heartbeat.group,
                createdAt: heartbeat.createdAt,
                updatedAt: heartbeat.updatedAt,
            });
            await this.updateInstance(heartbeat);
           
        } catch (error) {
            // 11000 is a code for duplicate key error
            if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
                throw new ClientError(`Task with id ${heartbeat.id} already exists`);
            }
            throw error;
        }
    }
    
    
    
    async updateInstance(heartbeat: HeartBeat) {
        const options = { upsert: true }; // Enable upsert
        try {
            const instanceExists = await this.instanceCollection.findOne({group: heartbeat.group});
            if(instanceExists) {
                await this.instanceCollection.updateOne(
                    {group: heartbeat.group},
                    {$inc: {instances: 1}, $set:{lastUpdatedAt: Date.now()}},
                    options );
            return;
            }
            /**
            Check if an entry already exists, if it does increase count on instances & lastUpdated
            */
            await this.instanceCollection.updateOne(
                {_id: heartbeat.id, group: heartbeat.group},
                {$set:{instances: 1, createdAt:Date.now(), lastUpdatedAt: Date.now()}},
                options );
        } catch (error) {
            console.error('Error updating instance', error);
        }

    }

    async updateTask(id: string, spec: TaskUpdateSpec) {
        const res = await this.collection.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    ...spec,
                },
            }
        );
        return res.matchedCount > 0;
    }

    async deleteTask(id: string) {
        const res = await this.collection.deleteOne({ _id: id });
        return res.deletedCount > 0;
    }

    private deserialize(doc: HeartBeatData): HeartBeat {
        return HeartBeatSchema.decode({
            ...doc,
            id: doc._id,
        });
    }
    
    private deserializeInstance(doc: HeartBeatInstanceData): HeartBeatInstance {
        return HeartBeatInstanceSchema.decode({
            ...doc,
            id: doc._id,
        });
    }
}