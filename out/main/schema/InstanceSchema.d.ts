import { Schema } from '@ubio/framework';
export type HeartBeatInstance = {
    id: string;
    group: string;
    instances: number;
    createdAt?: number;
    updatedAt?: number;
};
export declare const HeartBeatInstanceSchema: Schema<HeartBeatInstance>;
