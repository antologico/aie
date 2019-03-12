import AIEAbstractMaduration from './AIEAbstractMaduration';
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed';
import AIEElement from './AIEElement';
export default class AIEPrestanceCalculator {
    private maduration;
    private speed;
    constructor(speed: AIEAbstractPrestanceSpeed, maduration: AIEAbstractMaduration);
    calculateIncrement(element: AIEElement): number;
}
