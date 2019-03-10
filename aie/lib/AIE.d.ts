import AIEElement from './AIEElement';
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed';
import AIEAbstractMaduration from './AIEAbstractMaduration';
export default abstract class AIE {
    private eventProcessor;
    private environment;
    private name;
    private context;
    private prestanceCalculator;
    constructor(name: string, context: any);
    abstract getPrestanceSpeed(): AIEAbstractPrestanceSpeed;
    abstract getMaduration(): AIEAbstractMaduration;
    abstract getElements(): NodeListOf<any>;
    registerEvent(event: string, func: any): void;
    private estructureElements;
    private getParentNode;
    getName(): string;
    private createEnvironment;
    private initializeElements;
    start(): void;
    getState(): any;
    setState(value: any, child?: AIEElement): void;
    getContext(): any;
    mutate(): void;
    private getElementState;
    abstract createElement(el: any): AIEElement;
}
