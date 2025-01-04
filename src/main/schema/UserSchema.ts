import { Schema } from '@ubio/framework';

export type HeartBeat = {
    id: string;
    group: string;
    createdAt?: number;
    updatedAt?: number;
};

export const HeartBeatSchema = new Schema<HeartBeat>({
    schema: {
        type: 'object',
        properties: {
            id: { type: 'string', maxLength: 36 }, // Example constraint for id
            group: { type: 'string', maxLength: 50 }, // Example constraint for group
            createdAt: { type: 'number', optional: true },
            updatedAt: { type: 'number', optional: true },
        },
        required: ['id', 'group'], // Ensure id and group are always present
    },
});