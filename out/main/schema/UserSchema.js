import { Schema } from '@ubio/framework';
export const HeartBeatSchema = new Schema({
    schema: {
        type: 'object',
        properties: {
            id: { type: 'string', maxLength: 36 },
            group: { type: 'string', maxLength: 50 },
            createdAt: { type: 'number', optional: true },
            updatedAt: { type: 'number', optional: true },
        },
        required: ['id', 'group'],
    },
});
//# sourceMappingURL=UserSchema.js.map