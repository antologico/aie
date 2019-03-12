const DEFAULT_UNIT = 'px';
export default class AIEHTMLMeasurement {
    constructor(text) {
        this.val = null;
        this.unit = null;
        this.initial = null;
        this.valid = false;
        const arr = ('' + text).match(/(\d*)([a-z%]*)/);
        this.initial = text;
        if (arr && arr[1]) {
            this.val = parseFloat(arr[1]);
            this.unit = arr[2] || DEFAULT_UNIT;
            this.valid = true;
        }
    }
    isValid() {
        return this.valid;
    }
    toString() {
        if (!this.isValid()) {
            return '';
        }
        return `${this.val}${this.unit}`;
    }
    multiply(value) {
        if (!this.isValid()) {
            return this.initial;
        }
        this.val = Math.round(this.val * value);
        return this;
    }
}
//# sourceMappingURL=AIEHTMLMeasurement.js.map