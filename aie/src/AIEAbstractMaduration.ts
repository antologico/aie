export default abstract class AIEAbstractMaduration {
  public abstract calculate(
    pregnancy: number,
    prevPregnancy: number,
    interactionsPercent: number,
    lifePercent: number
    ): number
} 
