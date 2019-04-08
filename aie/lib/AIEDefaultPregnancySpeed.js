import AIEAbstractPregnancySpeed from './AIEAbstractPregnancySpeed';
export default class AIEDefaultPregnancySpeed extends AIEAbstractPregnancySpeed {
    calculate(interactions) {
        return interactions ? 1 / interactions : 0;
    }
}
//# sourceMappingURL=AIEDefaultPregnancySpeed.js.map