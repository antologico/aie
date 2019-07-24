import AIEMeasure from "../AIEMeasure";
export default class Color extends AIEMeasure {
    constructor() {
        super(...arguments);
        this.color = {
            r: 0,
            g: 0,
            b: 0,
            a: null
        };
        this.initial = {
            r: 0,
            g: 0,
            b: 0,
            a: null
        };
        this.vector = {};
    }
    setValue(text) {
        const rgb = text.replace(/\s/g, '').match(/^(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d|\.]+))?\)$/);
        if (rgb) {
            this.initial.r = this.color.r = parseInt(rgb[2]);
            this.initial.g = this.color.g = parseInt(rgb[3]);
            this.initial.b = this.color.b = parseInt(rgb[4]);
            this.initial.a = this.color.a = rgb[5] ? parseFloat(rgb[6]) : null;
            this.calculateDominantValues();
            this.updateValue();
            this.valid = true;
        }
        else {
            this.valid = false;
            console.error("Incorrect color format: <" + text + ">. Only rgb/rgba() is a valid color forma format for AIE");
        }
    }
    updateValue() {
        if (this.isDark(this.vector)) {
            this.value = Color.MAX_VALUE - Math.min(this.color.r, this.color.g, this.color.b);
        }
        else {
            this.value = Math.max(this.color.r, this.color.g, this.color.b) - Color.MAX_VALUE;
        }
    }
    calculateDominantValues() {
        this.vector = {
            r: this.calculateVectorColorComponent(this.color.r),
            g: this.calculateVectorColorComponent(this.color.g),
            b: this.calculateVectorColorComponent(this.color.b),
        };
    }
    isDark(color) {
        return (color.a === Color.DARK) && (color.color.b === Color.DARK) && (color.c === Color.DARK);
    }
    calculateVectorColorComponent(color) {
        return (color < Color.MAX_VALUE) ? Color.DARK : Color.SHINY;
    }
    calculate(value) {
        const m = this.clone();
        if (value < 0) {
            return m;
        }
        const v = Math.min(value, Color.MAX_VALUE);
        m.color.r = this.calculateColorValue('r', v);
        m.color.g = this.calculateColorValue('g', v);
        m.color.b = this.calculateColorValue('b', v);
        m.calculateDominantValues();
        m.updateValue();
        return m;
    }
    clone() {
        const m = new Color();
        m.vector = Object.assign({}, this.vector);
        m.color = Object.assign({}, this.color);
        m.value = this.value;
        m.valid = this.valid;
        return m;
    }
    calculateColorValue(color, value) {
        let v;
        const original = parseFloat(this.initial[color]);
        if (this.vector[color] === Color.SHINY) {
            v = ((Color.MAX_VALUE * 2) - original) * value / Color.MAX_VALUE;
        }
        else {
            v = -(original * value) / Color.MAX_VALUE;
        }
        return Math.round(Math.min(original + v, Color.MAX_VALUE * 2));
    }
    toString() {
        return `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a || '1'})`;
    }
}
Color.MAX_VALUE = 128;
Color.DARK = -1;
Color.SHINY = 1;
//# sourceMappingURL=Color.js.map