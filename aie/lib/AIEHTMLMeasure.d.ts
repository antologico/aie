export default abstract class AIEHTMLMeasure {
    protected valid: boolean;
    protected value: number;
    protected unit: string;
    getValue(): number;
    abstract toString(): string;
    abstract calculate(value: number): AIEHTMLMeasure;
    abstract setValue(value: string): any;
}
