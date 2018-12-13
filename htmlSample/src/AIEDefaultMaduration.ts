import AIEAbstractMaduration from './AIEAbstractMaduration'

export default class AIEDefaultMaduration extends AIEAbstractMaduration{
  public calculate(interactionsPercent: number, lifePercent: number): number {
      return lifePercent < .001 
        ? 0
        : interactionsPercent < .001 ? 0 : 1
  }
}
