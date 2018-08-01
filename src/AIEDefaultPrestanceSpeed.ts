import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed'

export default class AIEDefaultPrestanceSpeed extends AIEAbstractPrestanceSpeed {
  public calculate(interations: number): number {
      return 1 / interations
  }
}
