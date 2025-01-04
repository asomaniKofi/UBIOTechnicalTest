import { Router } from '@ubio/framework';
export declare class StatusRouter extends Router {
    status(): Promise<{
        version: string;
    }>;
}
