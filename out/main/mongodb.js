var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { config, Logger } from '@ubio/framework';
import { dep } from 'mesh-ioc';
import { MongoClient } from 'mongodb';
export class MongoDb {
    constructor() {
        this.isRunning = false;
        this.client = new MongoClient(this.MONGO_URL, {
            ignoreUndefined: true,
        });
    }
    get db() {
        return this.client.db();
    }
    async start() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        await this.client.connect();
        this.logger.info('Connected to MongoDB');
    }
    async stop() {
        try {
            await this.client.close();
            this.logger.info('MongoDB connection closed');
        }
        finally {
            this.isRunning = false;
        }
    }
}
__decorate([
    dep(),
    __metadata("design:type", Logger)
], MongoDb.prototype, "logger", void 0);
__decorate([
    config({ default: "MONGO_URL" }),
    __metadata("design:type", String)
], MongoDb.prototype, "MONGO_URL", void 0);
//# sourceMappingURL=mongodb.js.map