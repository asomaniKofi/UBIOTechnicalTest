import { ProcessEnvConfig } from '@ubio/framework';
export declare class AppConfig extends ProcessEnvConfig {
    SECRET_KEY: string;
    APP_PORT: string;
    MONGO_URL: string;
    PORT: number;
}
