import AIEAbstractMaduration from './AIEAbstractMaduration';
export default class AIEDefaultMaduration extends AIEAbstractMaduration {
    calculate(pregnancy: number, prevPregnancy: number, cycle: number, maxCycles: number): number;
}
