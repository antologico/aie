import AIEAbstractMaduration from './AIEAbstractMaduration';
export default class AIEDefaultMaduration extends AIEAbstractMaduration {
    calculate(interactionsPercent, lifePercent) {
        return lifePercent < .001
            ? 0
            : interactionsPercent < .001 ? 0 : 1;
    }
}
//# sourceMappingURL=AIEDefaultMaduration.js.map