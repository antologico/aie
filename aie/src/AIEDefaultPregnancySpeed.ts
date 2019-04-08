import AIEAbstractPregnancySpeed from './AIEAbstractPregnancySpeed'

export default class AIEDefaultPregnancySpeed extends AIEAbstractPregnancySpeed {
  public calculate(interactions: number): number {
      return interactions ? 1 / interactions : 0
  }
}
