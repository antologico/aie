import AIEAbstractMaduration from './AIEAbstractMaduration'

export default class AIEDefaultMaduration extends AIEAbstractMaduration{
  public calculate(value: number): number {
      return value < .001 ? 0 : 1
  }
}
