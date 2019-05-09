import Warehouse from './Warehouse';
export default abstract class AIEMemory {
    private id;
    private score;
    protected warehouse: Warehouse;
    constructor(id: string);
    setId(id: string): void;
    anoteEvent(goal?: number): void;
    getScore(): number;
    setScore(score: number): number;
    abstract getWarehouseAvailble(): Warehouse;
    abstract loadScoreFromStore(id: string): number;
    abstract saveScoreToStore(id: string, value: number): void;
    abstract removeScoreFromStore(id: string): void;
}
