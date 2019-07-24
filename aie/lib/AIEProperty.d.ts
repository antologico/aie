import AIEElement from './AIEElement';
import AIEMeasure from './AIEMeasure';
export default abstract class AIEProperty {
    protected initialValues: any;
    protected name: string;
    protected max: number;
    protected min: number;
    protected total: number;
    protected number: number;
    protected transformFn: Function;
    protected measures: Array<AIEMeasure>;
    protected measure: AIEMeasure;
    constructor(name: string, initialValues: any);
    getName(): string;
    setMeasure(childName: string, value: AIEMeasure): void;
    getMeasure(childName: string): AIEMeasure;
    getTotal(): number;
    getMax(childName: string): number;
    setMax(max: number): void;
    setTotal(total: number): void;
    setMin(min: number): void;
    setTransform(fn: Function): void;
    dimensionedValue(value: number): number;
    transform(element: AIEElement): void;
}
