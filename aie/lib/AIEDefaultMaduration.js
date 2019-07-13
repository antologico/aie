import AIEAbstractMaduration from './AIEAbstractMaduration';
export default class AIEDefaultMaduration extends AIEAbstractMaduration {
    calculate(pregnancy, prevPregnancy, cycle, maxCycles) {
        return !maxCycles || cycle <= maxCycles
            ? pregnancy
            : prevPregnancy;
    }
}
//# sourceMappingURL=AIEDefaultMaduration.js.map