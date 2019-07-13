import AIEAbstractMaduration from './AIEAbstractMaduration';
import AIEAbstractMutation from './AIEAbstractMutation';
import AIEElement from './AIEElement';
import AIE from './AIE';
export default class AIEPregnancyCalculator {
    private maduration;
    private mutation;
    private speed;
    private aie;
    constructor(aie: AIE, speed: number, maduration: AIEAbstractMaduration, mutation: AIEAbstractMutation);
    calculate(element: AIEElement): number;
}
