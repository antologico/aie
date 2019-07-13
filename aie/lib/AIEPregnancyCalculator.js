export default class AIEPregnancyCalculator {
    constructor(aie, speed, maduration, mutation) {
        this.aie = aie;
        this.maduration = maduration;
        this.speed = speed;
        this.mutation = mutation;
    }
    calculate(element) {
        this.aie.addCycle();
        const interactions = element.getInteractions();
        const enviromentInterarions = element.getEnvInteractions();
        const interactionsPercent = enviromentInterarions ? interactions / enviromentInterarions : 0;
        const mutation = this.mutation.calculate(this.speed, interactionsPercent, element.getParent().getPregnancy());
        const pregnancy = this.maduration.calculate(mutation, element.getPregnancy(), this.aie.getCycles(), this.aie.getMaxUpdatedCycles());
        return pregnancy;
    }
}
//# sourceMappingURL=AIEPregnancyCalculator.js.map