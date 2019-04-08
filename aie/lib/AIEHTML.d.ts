import AIE from './AIE';
import AIEElement from './AIEElement';
import AIEAbstractPregnancySpeed from './AIEAbstractPregnancySpeed';
import AIEAbstractMaduration from './AIEAbstractMaduration';
export default class AIEHTML extends AIE {
    constructor(name: string, context?: string);
    getElements(): NodeListOf<HTMLElement>;
    createElement(el: HTMLElement): AIEElement;
    getPregnancySpeed(): AIEAbstractPregnancySpeed;
    getMaduration(): AIEAbstractMaduration;
    start(): void;
}
