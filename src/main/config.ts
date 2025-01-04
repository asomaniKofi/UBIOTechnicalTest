import { config, MapConfig, ProcessEnvConfig } from '@ubio/framework';

export class AppConfig extends ProcessEnvConfig{

    // This one does not have a default, app will fail to start if not provided
    @config() SECRET_KEY!: string;
    @config({default: "APP_PORT"}) APP_PORT!: string;

    @config({default: "MONGO_URL"}) MONGO_URL!: string;
    // You can use string, number and boolean types. Types are automatically coerced.
    @config({ default: 3000 }) PORT!: number;
}