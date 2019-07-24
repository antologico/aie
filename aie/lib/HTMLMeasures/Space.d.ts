import AIEMeasure from "../AIEMeasure";
export default class Space extends AIEMeasure {
    protected value: number;
    protected initial: string;
    protected initialValue: number;
    setValue(text: any): void;
    isValid(): boolean;
    toString(): string;
    clone(): AIEMeasure;
    calculate(value: number): AIEMeasure;
}
