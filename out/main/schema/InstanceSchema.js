import { Schema } from '@ubio/framework';
export const HeartBeatInstanceSchema = new Schema({
    schema: {
        type: 'object',
        properties: {
            id: { type: 'string', maxLength: 36 },
            group: { type: 'string', maxLength: 50 },
            instances: { type: 'number' },
            createdAt: { type: 'number', optional: true },
            updatedAt: { type: 'number', optional: true },
        },
        required: ['group', 'instances'],
    },
});
//# sourceMappingURL=InstanceSchema.js.map