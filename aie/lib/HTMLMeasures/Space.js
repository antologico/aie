import AIEMeasure from "../AIEMeasure";
const DEFAULT_UNIT = 'px';
export default class Space extends AIEMeasure {
    constructor() {
        super(...arguments);
        this.value = null;
        this.initial = null;
        this.initialValue = null;
    }
    setValue(text) {
        const arr = ('' + text).match(/(\d*)([a-z%]*)/);
        this.initial = text;
        if (arr && arr[1]) {
            this.value = this.initialValue = parseFloat(arr[1]);
            this.unit = arr[2] || DEFAULT_UNIT;
            this.valid = true;
        }
        else {
            this.valid = false;
        }
    }
    isValid() {
        return this.valid;
    }
    toString() {
        if (!this.isValid()) {
            return '';
        }
        return this.value + this.unit;
    }
    clone() {
        const m = new Space();
        m.initial = this.initial;
        m.unit = this.unit;
        m.value = this.value;
        m.valid = this.valid;
        return m;
    }
    calculate(value) {
        const m = this.clone();
        if (!this.isValid()) {
            return m;
        }
        m.initial = this.initial;
        m.value = Math.round(value);
        return m;
    }
}
//# sourceMappingURL=Space.js.map