export default abstract class Warehouse {
    private name;
    constructor(name: string);
    abstract remove(id: string): void;
    abstract save(id: string, value: string): void;
    abstract load(id: string): number;
    abstract isAvailable(): boolean;
}
export declare class IndexDBWarehouse extends Warehouse {
    private request;
    private store;
    private enable;
    constructor(name: string);
    isEnabled(): Promise<boolean>;
    remove(id: string): void;
    save(id: string, value: string): void;
    private get;
    private loadFromDB;
    load(id: string): number;
    isAvailable(): boolean;
}
export declare class LocalStorageWarehouse extends Warehouse {
    remove(id: string): void;
    save(id: string, value: string): void;
    load(id: string): number;
    isAvailable(): boolean;
}
