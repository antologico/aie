import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed'

export default class AIEDefaultPrestanceSpeed extends AIEAbstractPrestanceSpeed {
  public calculate(interactions: number): number {
      return interactions ? 1 / interactions : 0
  }
}
