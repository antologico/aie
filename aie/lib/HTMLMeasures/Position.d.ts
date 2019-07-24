import AIEMeasure from "../AIEMeasure";
export default class Position extends AIEMeasure {
    protected value: number;
    toString(): string;
    clone(): AIEMeasure;
    calculate(): AIEMeasure;
    setValue(): void;
}
