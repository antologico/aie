export default class Color {
    constructor(text) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
        const rgb = text.match(/^(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d|\.]+))?\)$/);
        if (!rgb) {
            this.r = parseInt(rgb[2]);
            this.g = parseInt(rgb[3]);
            this.b = parseInt(rgb[4]);
            this.a = rgb[5] && parseFloat(rgb[6]);
        }
    }
    incrementColor(prop, value) {
        const result = prop * value;
        if (result > 255) {
            return 255;
        }
        return result;
    }
    increment(value) {
        if (value < 0) {
            return;
        }
        this.r = this.incrementColor(this.r, value);
        this.g = this.incrementColor(this.g, value);
        this.b = this.incrementColor(this.b, value);
        return this;
    }
    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}
//# sourceMappingURL=Color.js.map