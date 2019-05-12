export default abstract class AIEMemory {
    private id;
    private score;
    constructor(id: string);
    setId(id: string): void;
    anoteEvent(goal?: number): void;
    getScore(): number;
    setScore(score: number): number;
    abstract loadScoreFromStore(id: string): number;
    abstract saveScoreToStore(id: string, value: number): void;
}
