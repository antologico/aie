import AIE from './AIE';
import AIEElement from './AIEElement';
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed';
import AIEAbstractMaduration from './AIEAbstractMaduration';
export default class AIEHTML extends AIE {
    constructor(name: string, context?: string);
    getElements(): NodeListOf<HTMLElement>;
    createElement(el: HTMLElement): AIEElement;
    getPrestanceSpeed(): AIEAbstractPrestanceSpeed;
    getMaduration(): AIEAbstractMaduration;
    start(): void;
}
