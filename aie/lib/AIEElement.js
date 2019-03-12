const DEFAULT_MAX_PRESTANCE = 1;
export default class AIEElement {
    constructor(baseElement) {
        this.maxUpdates = null;
        if (baseElement) {
            this.setBaseElement(baseElement);
            this.name = this.getAttr('name');
            this.trigger = this.getAttrs('trigger');
            this.bindTriggers();
        }
        this.born = this.getDate();
        this.children = [];
        this.processor = null;
        this.parent = null;
        this.prestance = 0;
        this.updates = 0;
        this.properties = [];
        this.maxPrestance = DEFAULT_MAX_PRESTANCE; // By default
        this.memory = this.initializeMemory(this.generateId());
    }
    setUpdates(updates) {
        this.maxUpdates = updates;
    }
    setMaxPrestance(prestance) {
        this.maxPrestance = prestance;
    }
    setName(name) {
        this.name = name;
        this.memory.setId(this.generateId());
    }
    generateId() {
        return 'aie::' + this.name;
    }
    updatePrestance(increment = null) {
        if (!this.hasParent() || (this.maxUpdates && (this.updates >= this.maxUpdates))) {
            return 0;
        }
        if (increment !== null) {
            this.prestance += (this.prestance + increment > 0) ? increment : 0;
            return increment;
        }
        this.updates++;
        const newIncrement = this.prestanceCalculator.calculateIncrement(this);
        this.prestance += newIncrement;
        return newIncrement;
    }
    getInteractions() {
        return this.memory.getScore();
    }
    getParentInteractions() {
        return this.parent ? this.parent.getInteractions() : 0;
    }
    getLife(now = null) {
        const myDate = now || this.getDate();
        return myDate - this.born;
    }
    getParentLife(now = null) {
        const myDate = now || this.getDate();
        return myDate - this.parent.born;
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
        this.memory.anoteEvent();
        if (this.processor) {
            this.processor.notify({ name, element: this });
        }
    }
    getChildren() {
        return this.children;
    }
    getScore() {
        return this.memory.getScore();
    }
    getAmbientScore() {
        return this.isAmbient()
            ? this.children.reduce((total, child) => total + child.getScore(), 0)
            : 0;
    }
    updateChildrenPrestance(increment, excluded = []) {
        this.children.forEach((child) => !excluded.includes(child) && child.updatePrestance(increment));
    }
    getMaxPrestance() {
        return this.children.reduce((total, child) => Math.max(total, child.getPrestance()), 0);
    }
    hasParent() {
        return !!this.parent;
    }
    hasChildren() {
        return this.children.length !== 0;
    }
    setPrestanceCalculator(prestanceCalculator) {
        this.prestanceCalculator = prestanceCalculator;
    }
    getPrestance() {
        return this.prestance;
    }
    setScore(value) {
        return this.memory.setScore(value);
    }
    setPrestance(value) {
        this.prestance = value;
    }
    mutate(maxPrestance) {
        this.transform(maxPrestance ? this.getPrestance() / maxPrestance : 0);
        const maxGroupPrestance = this.getMaxPrestance();
        this.getChildren().forEach((child) => {
            child.mutate(maxGroupPrestance);
        });
    }
}
//# sourceMappingURL=AIEElement.js.map