import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed';
export default class AIEDefaultPrestanceSpeed extends AIEAbstractPrestanceSpeed {
    calculate(interactions) {
        return interactions ? 1 / interactions : 0;
    }
}
//# sourceMappingURL=AIEDefaultPrestanceSpeed.js.map