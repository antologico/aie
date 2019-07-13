import AIEMonitor from './AIEMonitor';
import AIEEventProcessor from './AIEEventProcessor';
import AIEPregnancyCalculator from './AIEPregnancyCalculator';
export default class AIE {
    constructor(name, context) {
        this.eventProcessor = new AIEEventProcessor(this);
        this.name = name;
        this.context = context;
        this.cycles = 0;
        this.maxUpdateCycles = 0;
        this.pregnancyCalculator = new AIEPregnancyCalculator(this, this.getPregnancySpeed(), this.getMaduration(), this.getMutation());
        AIEMonitor.addEnvironments(this);
    }
    addCycle() {
        this.cycles += 1;
    }
    getCycles() {
        return 0;
    }
    setMaxUpdatedCycles(max) {
        this.maxUpdateCycles = max;
    }
    getMaxUpdatedCycles() {
        return 0;
    }
    registerEvent(event, func) {
        this.eventProcessor.registerEvent(event, func);
    }
    createTree(elements) {
        const toRemove = [];
        elements.forEach((element, index) => {
            const elParent = this.getParentNode(elements, element.getBaseElementParent());
            if (elParent) {
                elParent.setChildren(element);
                toRemove.push(index);
            }
        });
        this.createEnvironment(elements.reduce((total, element, index) => {
            return toRemove.includes(index) ? total : total.concat(element);
        }, []));
    }
    getParentNode(elements, element) {
        if (!element) {
            return null;
        }
        const parent = elements.find((el) => {
            return el.getBaseElement() === element;
        });
        return !parent
            ? this.getParentNode(elements, element.parentNode)
            : parent;
    }
    getName() {
        return this.name;
    }
    createEnvironment(elements) {
        this.environment = this.createElement(null);
        this.environment.setName(this.name);
        elements.forEach((el) => {
            this.environment.setChildren(el);
        });
        this.updatePregnancyTree(this.environment);
    }
    updatePregnancyTree(element) {
        element.getChildren().forEach((el) => this.updatePregnancyTree(el));
        element.setPregnancy(element.getTotalAmbientPregnancy());
    }
    initializeElements(matches) {
        const elements = [];
        matches.forEach((el) => {
            const aiee = this.createElement(el);
            aiee.setPregnancyCalculator(this.pregnancyCalculator);
            aiee.setProccesor(this.eventProcessor);
            elements.push(aiee);
        });
        this.createTree(elements);
    }
    start() {
        this.initializeElements(this.getElements());
    }
    getState() {
        return this.getElementState(this.environment);
    }
    setState(value, child = null) {
        const parent = child ? child : this.environment;
        parent.setScore(value.score);
        parent.setPregnancy(value.pregnancy);
        value.children.map((childValues) => {
            const el = parent.getChildren().find((e) => e.getName() === childValues.name);
            if (el) {
                this.setState(childValues, el);
            }
        });
    }
    getContext() {
        return this.context;
    }
    mutate() {
        this.environment.getChildren().forEach((child) => {
            child.mutate();
        });
    }
    updatePregnancy() {
        this.environment.getChildren().forEach((child) => {
            child.updatePregnancy();
        });
    }
    getElementState(element) {
        const values = {
            name: element.getName(),
            pregnancy: element.getPregnancy(),
            score: element.getScore(),
            cycles: this.getCycles(),
            properties: element.getPropertiesNames(),
            triggers: element.getTriggersName(),
            physicalAttribute: element.getPhysicalAttributes(),
            children: element.getChildren().map((children) => {
                return this.getElementState(children);
            })
        };
        return values;
    }
}
//# sourceMappingURL=AIE.js.map