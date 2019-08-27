const DEFAULT_MAX_PRESTANCE = 1;
export default class AIEElement {
    constructor(baseElement) {
        this.maxUpdates = null;
        this.pregnancyBase = 0;
        this.freePregnancy = 0;
        if (baseElement) {
            this.setBaseElement(baseElement);
            this.name = this.getAttr('name').trim();
            this.trigger = this.getAttrs('trigger');
            this.pregnancyBase = parseFloat(this.getAttr('pregnancy'));
            this.freePregnancy = parseFloat(this.getAttr('free'));
            if (isNaN(this.pregnancyBase)) {
                this.pregnancyBase = 0;
            }
            if (isNaN(this.freePregnancy)) {
                this.freePregnancy = 0;
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
        const prevParent = element.getParent();
        if (prevParent) {
            prevParent.removeChild(element);
        }
        element.setParent(this);
    }
    removeChild(element) {
        this.children = this.children.filter(c => c !== element);
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
            return this.getTotalPregnancy();
        }
        return this.children.reduce((total, child) => total + child.getTotalPregnancy(), 0);
    }
    getMaxAmbientPropertyValue(name) {
        const p = this.getProperty(name);
        if (!this.hasChildren() || !p) {
            return 0;
        }
        const sum = this.children.reduce((total, child) => {
            return total + this.getChildPropertyMaxValue(name, child.name);
        }, 0);
        return p.getTotal() || sum;
    }
    getProperty(nameProp) {
        return this.properties.find(p => p.getName() === nameProp);
    }
    getChildPropertyValue(nameProp, childName) {
        const p = this.getProperty(nameProp);
        return p ? p.getMeasure(childName).getValue() : 0;
    }
    getChildPropertyMaxValue(nameProp, childName) {
        const p = this.properties.find(p => p.getName() === nameProp);
        if (!p) {
            return 0;
        }
        const max = p.getMax(childName);
        return max || this.getChildPropertyValue(nameProp, childName);
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
    getTotalPregnancy() {
        return this.pregnancy + this.freePregnancy;
    }
    setFreePregnancy(free) {
        if (free > 0) {
            this.freePregnancy = free;
        }
        else {
            this.freePregnancy = 0;
        }
    }
    getFreePregnancy() {
        return this.freePregnancy;
    }
    mutate() {
        this.transform();
        this.getChildren().forEach((child) => {
            child.mutate();
        });
        this.recalculatePregnancyAfterMutation();
    }
    recalculatePregnancyAfterMutation() {
        const actualTotal = this.getTotalPregnancy();
        let totalChildren;
        if (!this.properties.length) {
            totalChildren = this.getTotalAmbientPregnancy();
        }
        else {
            totalChildren = this.children.reduce((totalChild, child) => {
                const childPregnancy = actualTotal * this.properties.reduce((total, prop) => {
                    const childProp = prop.getMeasure(child.name).getValue() / this.getMaxAmbientPropertyValue(prop.getName());
                    return total + (childProp || 0);
                }, 0) / this.properties.length || 0;
                child.setPregnancy(childPregnancy);
                return totalChild + childPregnancy;
            }, 0);
        }
        this.setFreePregnancy(actualTotal - totalChildren);
        this.pregnancy = totalChildren;
    }
}
//# sourceMappingURL=AIEElement.js.map