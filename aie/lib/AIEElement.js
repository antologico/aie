const DEFAULT_MAX_PRESTANCE = 1;
export default class AIEElement {
    constructor(baseElement) {
        this.maxUpdates = null;
        this.pregnancyBase = 0;
        if (baseElement) {
            this.setBaseElement(baseElement);
            this.name = this.getAttr('name');
            this.trigger = this.getAttrs('trigger');
            this.pregnancyBase = parseFloat(this.getAttrs('pregnancy'));
            if (isNaN(this.pregnancyBase)) {
                this.pregnancyBase = 0;
            }
            this.bindTriggers();
        }
        this.pregnancy = this.pregnancyBase;
        this.children = [];
        this.processor = null;
        this.parent = null;
        this.updates = 0;
        this.properties = [];
        this.maxPregnancy = DEFAULT_MAX_PRESTANCE; // By default
        this.memory = this.initializeMemory(this.generateId());
    }
    setUpdates(updates) {
        this.maxUpdates = updates;
    }
    setMaxPregnancy(pregnancy) {
        this.maxPregnancy = pregnancy;
    }
    setName(name) {
        this.name = name;
        this.memory.setId(this.generateId());
    }
    generateId() {
        return 'aie::' + this.name;
    }
    updatePregnancy() {
        this.setPregnancy(this.pregnancyCalculator.calculate(this));
        this.updateChildrenPregnancy();
    }
    getInteractions() {
        return this.memory.getScore();
    }
    getEnvInteractions() {
        return this.parent
            ? this.parent.getChildren().reduce((p, a) => p + a.getInteractions(), 0)
            : 0;
    }
    getName() {
        return this.name;
    }
    getTriggersName() {
        return this.trigger || [];
    }
    getEventName() {
        return this.name;
    }
    getPregnancyIncrement() {
        return this.pregnancy - this.pregnancyBase;
    }
    isAmbient() {
        return this.children.length > 0;
    }
    setParent(element) {
        this.parent = element;
    }
    setProccesor(processor) {
        this.processor = processor;
    }
    getParent() {
        return this.parent;
    }
    setProperties(properties) {
        this.properties = properties;
    }
    setOnChangeTrigger(trigger) {
        this.onChangeTrigger = trigger;
    }
    hasOnChangeTrigger() {
        return !!this.onChangeTrigger;
    }
    runOnChangeTrigger() {
        try {
            if (this.onChangeTrigger) {
                const trigger = new Function('pregnancy', this.onChangeTrigger);
                return trigger(this.getPregnancy());
            }
        }
        catch (excep) {
            console.warn('Error parsing on change of <', this.getName(), '>:', excep);
        }
        return false;
    }
    getProperties() {
        return this.properties || [];
    }
    getPropertiesNames() {
        return this.getProperties().map((prop) => prop.getName());
    }
    setChildren(element) {
        this.children.push(element);
        element.setParent(this);
    }
    onTrigger(name) {
        if (this.processor) {
            this.processor.notify({ name, element: this });
        }
    }
    getChildren() {
        return this.children;
    }
    incrementScore() {
        this.memory.anoteEvent();
    }
    getScore() {
        return this.memory.getScore();
    }
    updateChildrenPregnancy() {
        this.children.forEach((child) => child.updatePregnancy());
    }
    getMaxAmbientPregnancy() {
        return this.children.reduce((total, child) => Math.max(total, child.getPregnancy()), 0);
    }
    getTotalAmbientPregnancy() {
        if (!this.hasChildren()) {
            return this.pregnancy;
        }
        return this.children.reduce((total, child) => total + child.getPregnancy(), 0);
    }
    getPercentualPregnancy() {
        if (!this.hasParent()) {
            return 1;
        }
        return this.getPregnancy() / this.parent.getPregnancy();
    }
    hasParent() {
        return !!this.parent;
    }
    hasChildren() {
        return this.children.length !== 0;
    }
    setPregnancyCalculator(pregnancyCalculator) {
        this.pregnancyCalculator = pregnancyCalculator;
    }
    getPregnancy() {
        return this.pregnancy;
    }
    setScore(value) {
        return this.memory.setScore(value);
    }
    setPregnancy(value) {
        this.pregnancy = value;
    }
    mutate() {
        this.transform();
        this.getChildren().forEach((child) => {
            child.mutate();
        });
        // TODO: New pregnancy in funtion of properties
    }
}
//# sourceMappingURL=AIEElement.js.map