import AIEMeasure from "../AIEMeasure";
export default class Position extends AIEMeasure {
    constructor() {
        super(...arguments);
        this.value = 1;
    }
    toString() {
        return this.value.toString();
    }
    clone() {
        return new Position();
    }
    calculate() {
        return new Position();
    }
    setValue() {
    }
}
//# sourceMappingURL=Position.js.map