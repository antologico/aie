import AIEAbstractMutation from './AIEAbstractMutation';
export default class AIEDefaultMutation extends AIEAbstractMutation {
    calculate(speed, interactions, ambientePregnancy) {
        return speed * interactions * ambientePregnancy;
    }
}
//# sourceMappingURL=AIEDefaultMutation.js.map