import AIEMeasure from "../AIEMeasure";
export default class Color extends AIEMeasure {
    protected color: {
        r: number;
        g: number;
        b: number;
        a: any;
    };
    protected initial: {
        r: number;
        g: number;
        b: number;
        a: any;
    };
    protected valid: boolean;
    protected vector: Object;
    static MAX_VALUE: number;
    static DARK: number;
    static SHINY: number;
    setValue(text: string): void;
    private updateValue;
    private calculateDominantValues;
    private isDark;
    private calculateVectorColorComponent;
    calculate(value: number): AIEMeasure;
    clone(): AIEMeasure;
    private calculateColorValue;
    toString(): string;
}
