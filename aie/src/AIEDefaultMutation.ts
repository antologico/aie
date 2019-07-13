import AIEAbstractMutation from './AIEAbstractMutation'

export default class AIEDefaultMutation extends AIEAbstractMutation {
    public calculate(speed: number, interactions: number, ambientePregnancy): number {
        return speed * interactions * ambientePregnancy
  }
}
