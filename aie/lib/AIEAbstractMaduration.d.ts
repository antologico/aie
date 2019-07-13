export default abstract class AIEAbstractMaduration {
    abstract calculate(pregnancy: number, prevPregnancy: number, interactionsPercent: number, lifePercent: number): number;
}
