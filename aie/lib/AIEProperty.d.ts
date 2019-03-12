import AIEElement from './AIEElement';
export default class AIEProperty {
    protected initialValue: any;
    protected name: string;
    protected max: number;
    protected min: number;
    protected transformFn: Function;
    constructor(name: string, initialValue: any);
    getName(): string;
    setMax(max: number): void;
    setMin(min: number): void;
    setTransform(fn: Function): void;
    transform(element: AIEElement): void;
}
