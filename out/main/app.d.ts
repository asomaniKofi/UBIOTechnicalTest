import { Application } from '@ubio/framework';
export declare class App extends Application {
    private mongodb;
    private serverStopped;
    constructor();
    createGlobalScope(): import("mesh-ioc").Mesh;
    createHttpRequestScope(): import("mesh-ioc").Mesh;
    beforeStart(): Promise<void>;
    stop(): Promise<void>;
    afterStop(): Promise<void>;
}
