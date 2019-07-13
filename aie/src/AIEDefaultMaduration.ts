import AIEAbstractMaduration from './AIEAbstractMaduration'

export default class AIEDefaultMaduration extends AIEAbstractMaduration{
  public calculate(
    pregnancy: number,
    prevPregnancy: number,
    cycle: number,
    maxCycles: number): number {
      return !maxCycles || cycle <= maxCycles 
        ? pregnancy
        : prevPregnancy
  }
}
