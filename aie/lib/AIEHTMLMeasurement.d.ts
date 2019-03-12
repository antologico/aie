export default class AIEHTMLMeasurement {
    protected val: number;
    protected unit: string;
    protected initial: string;
    protected valid: boolean;
    constructor(text: any);
    isValid(): boolean;
    toString(): string;
    multiply(value: number): string | this;
}
