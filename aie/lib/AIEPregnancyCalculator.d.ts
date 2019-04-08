import AIEAbstractMaduration from './AIEAbstractMaduration';
import AIEAbstractPregnancySpeed from './AIEAbstractPregnancySpeed';
import AIEElement from './AIEElement';
export default class AIEPregnancyCalculator {
    private maduration;
    private speed;
    constructor(speed: AIEAbstractPregnancySpeed, maduration: AIEAbstractMaduration);
    calculateIncrement(element: AIEElement): number;
}
