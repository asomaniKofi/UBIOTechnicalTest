import { Schema } from '@ubio/framework';

export type HeartBeatInstance = {
   id: string;
   group: string,
   instances: number,
   createdAt?: number;
   updatedAt?: number;
};

export const HeartBeatInstanceSchema = new Schema<HeartBeatInstance>({
    schema: {
        type: 'object',
        properties: {
            id: { type: 'string', maxLength: 36 },
            group: { type: 'string', maxLength: 50 }, // Example constraint for group
            instances: { type: 'number'},
            createdAt: { type: 'number', optional: true },
            updatedAt: { type: 'number', optional: true },
        },
        required: ['group', 'instances'], // Ensure id and group are always present
    },
});