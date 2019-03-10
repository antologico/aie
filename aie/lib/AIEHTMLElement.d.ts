import AIEElement from './AIEElement';
import AIEMemory from './AIEMemory';
import AIEHTMLProperty from './AIEHTMLProperty';
export default class AIEHTMLElement extends AIEElement {
    protected baseElement: HTMLElement;
    protected style: Object;
    constructor(baseElement: any);
    parseAttr(text: string): Array<AIEHTMLProperty>;
    setChildren(element: AIEElement): void;
    initializeMemory(seed: string): AIEMemory;
    setBaseElement(baseElement: HTMLElement): void;
    getBaseElement(): HTMLElement;
    getAttr(attributeName: string): string;
    getAttrs(attributeName: string): string[];
    bindTriggers(): void;
    generate(baseElement: any): AIEHTMLElement;
    getBaseElementParent(): Node;
    getDate(): number;
    transform(percent: number): void;
    getPhysicalAttributes(): {};
    private getAbsoluteBoundingRect;
}
