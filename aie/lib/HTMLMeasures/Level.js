import AIEMeasure from "../AIEMeasure";
export default class Level extends AIEMeasure {
    constructor() {
        super(...arguments);
        this.value = 1;
    }
    toString() {
        return this.value.toString();
    }
    clone() {
        const c = new Level();
        c.value = this.value;
        return c;
    }
    calculate(value) {
        const c = new Level();
        c.value = value;
        return c;
    }
    setValue() {
    }
}
//# sourceMappingURL=Level.js.map