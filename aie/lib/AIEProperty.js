export default class AIEProperty {
    constructor(name, initialValues) {
        this.max = null;
        this.min = 0;
        this.total = null;
        this.number = 1;
        this.transformFn = null;
        this.measures = [];
        this.name = name;
        this.initialValues = initialValues;
    }
    getName() {
        return this.name;
    }
    setMeasure(childName, value) {
        this.measures[childName] = value;
    }
    getMeasure(childName) {
        const value = this.initialValues[childName];
        let m;
        if (!this.measures[childName]) {
            m = this.measure.clone();
        }
        else {
            return this.measures[childName];
        }
        m.setValue(value);
        return m;
    }
    getTotal() {
        return this.total;
    }
    getMax(childName) {
        const m = this.getMeasure(childName);
        return Math.min(this.max, m ? m.getValue() : (this.min || 0));
    }
    setMax(max) {
        if (max < 0) {
            console.error('Maximum value must be greater than 0');
        }
        if (this.min && (max < this.min)) {
            console.error('Maximum value must be greater than the mininum');
        }
        this.max = max;
    }
    setTotal(total) {
        if (total < 0) {
            console.error('Maximum value must be greater than 0');
        }
        if (this.max && (total < this.max)) {
            console.error('total value must be greater than the maximun');
        }
        this.total = total;
    }
    setMin(min) {
        if (min < 0) {
            console.error('Mininum value must be greater than 0');
        }
        if (this.max && (min > this.max)) {
            console.error('Maximum value must be lower than the maximum');
        }
        this.min = min;
    }
    setTransform(fn) {
        this.transformFn = fn.bind(this);
    }
    dimensionedValue(value) {
        const dimensionedValue = this.max ? Math.min(value, this.max) : value;
        return this.min ? Math.max(dimensionedValue, this.min) : dimensionedValue;
    }
    transform(element) {
        if (!element.hasOnChangeTrigger() || element.runOnChangeTrigger() !== false) {
            this.transformFn && this.transformFn(element, this.initialValues);
        }
        else {
            console.warn('Mutation for', name, 'canceled by user');
        }
    }
}
//# sourceMappingURL=AIEProperty.js.map