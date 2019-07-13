import AIE from './AIE';
import AIEElement from './AIEElement';
import AIEAbstractMaduration from './AIEAbstractMaduration';
import AIEAbstractMutation from './AIEAbstractMutation';
export default class AIEHTML extends AIE {
    constructor(name: string, context?: string);
    getElements(): NodeListOf<HTMLElement>;
    createElement(el: HTMLElement): AIEElement;
    getPregnancySpeed(): number;
    getMaduration(): AIEAbstractMaduration;
    getMutation(): AIEAbstractMutation;
    start(): void;
}
