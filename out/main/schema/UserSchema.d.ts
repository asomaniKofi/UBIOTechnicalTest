import { Schema } from '@ubio/framework';
export type HeartBeat = {
    id: string;
    group: string;
    createdAt?: number;
    updatedAt?: number;
};
export declare const HeartBeatSchema: Schema<HeartBeat>;
