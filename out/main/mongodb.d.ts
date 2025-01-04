import { Db, MongoClient } from 'mongodb';
export declare class MongoDb {
    private logger;
    private MONGO_URL;
    isRunning: boolean;
    client: MongoClient;
    get db(): Db;
    start(): Promise<void>;
    stop(): Promise<void>;
}
