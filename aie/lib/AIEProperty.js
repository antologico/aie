export default class AIEProperty {
    constructor(name, initialValue) {
        this.max = null;
        this.min = null;
        this.transformFn = null;
        this.name = name;
        this.initialValue = initialValue;
    }
    getName() {
        return this.name;
    }
    setMax(max) {
        if (max < 1) {
            console.error('Mininum value must be greater than 1');
        }
        this.max = max;
    }
    setMin(min) {
        if (min < 0) {
            console.error('Mininum value must be greater than 0');
        }
        this.min = min;
    }
    setTransform(fn) {
        this.transformFn = fn.bind(this);
    }
    transform(element) {
        if (!element.hasOnChangeTrigger() || element.runOnChangeTrigger() !== false) {
            this.transformFn && this.transformFn(element, this.initialValue);
        }
        else {
            console.warn('Mutation for', name, 'canceled by user');
        }
    }
}
//# sourceMappingURL=AIEProperty.js.map