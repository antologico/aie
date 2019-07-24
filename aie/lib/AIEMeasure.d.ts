export default abstract class AIEMeasure {
    protected valid: boolean;
    protected value: number;
    protected unit: string;
    getValue(): number;
    abstract toString(): string;
    abstract clone(): AIEMeasure;
    abstract calculate(value: number): AIEMeasure;
    abstract setValue(value: string): any;
}
