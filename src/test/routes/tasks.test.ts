import assert from 'assert';

import { runtime } from '../runtime.js';
import { group } from 'console';
import { request } from 'https';
beforeEach(() => runtime.setup());
afterEach(() => runtime.teardown());
describe('GET /group/{groupId}', () => {

    it('returns task if it exists', async () => {
        const res = await runtime.fetch('/group/c76342a5-efbb-44b7-8cbe-b71504f1affd');
        assert.strictEqual(res.status, 200);
        const body = await res.json();
        assert.strictEqual(body.id, 'c76342a5-efbb-44b7-8cbe-b71504f1affd');
        assert.strictEqual(body.group, 'Test-Group');
    });

    it('returns 404 if task does not exist', async () => {
        const res = await runtime.fetch('/group/345');
        assert.strictEqual(res.status, 404);
    });
});

describe('POST /group/{groupId}', () => {

    it('creates a new group & Updates the instance counter', async () => {
    
        const res = await runtime.fetch('/group/123', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                group: "new-group"
            })
        });
        assert.strictEqual(res.status, 201);
    }); 

});

describe('GET /', () => {

    it('returns the list of all the heartbeat groups instances', async () => {
        const res = await runtime.fetch('/');
        assert.strictEqual(res.status, 200);
    });

});

describe('GET /group', () => {

    it('returns the list of all heartbeats group', async () => {
        const res = await runtime.fetch('/group');
        assert.strictEqual(res.status, 200);
    });

});

describe('DELETE /tasks/{taskId}', () => {

    it('deletes a task', async () => {
        const res = await runtime.fetch('/group/8f7dad7d-c0b6-434f-9f28-ecef4f6893e5', {
            method: 'DELETE',
        });
        assert.strictEqual(res.status, 200);
    });

});