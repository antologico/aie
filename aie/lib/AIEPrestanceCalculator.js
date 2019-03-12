export default class AIEPrestanceCalculator {
    constructor(speed, maduration) {
        this.maduration = maduration;
        this.speed = speed;
    }
    calculateIncrement(element) {
        const interactions = element.getInteractions();
        const enviromentInterarions = element.getParentInteractions();
        const interactionsPercent = interactions / enviromentInterarions;
        const date = element.getDate();
        const lifePercent = element.getLife(date) / element.getParentLife(date);
        const maduration = this.maduration.calculate(interactionsPercent, lifePercent);
        const speed = this.speed.calculate(interactions);
        return speed * maduration;
    }
}
//# sourceMappingURL=AIEPrestanceCalculator.js.map