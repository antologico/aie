import AIEProperty from './AIEProperty';
import Color from './Color';
import AIEHTMLMeasurement from './AIEHTMLMeasurement';
const COLOR = 'color';
const FONTSIZE = 'font-size';
const HEIGHT = 'height';
const WIDTH = 'width';
const POSITION = 'position';
const LEVEL = 'level';
function colorFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const initialValue = initialValues[child.getName()];
        const color = new Color(initialValue);
        child.getBaseElement().style.color = color.increment(1 + child.getPrestance()).toString();
    });
}
function fontSizeFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const measure = new AIEHTMLMeasurement(initialValues[child.getName()]);
        child.getBaseElement().style.fontSize = measure.multiply(1 + child.getPrestance()).toString();
    });
}
function widthFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const measure = new AIEHTMLMeasurement(initialValues[child.getName()]);
        child.getBaseElement().style.width = measure.multiply(1 + child.getPrestance()).toString();
    });
}
function heightFn(element, initialValues) {
    element.getChildren().forEach((child) => {
        const measure = new AIEHTMLMeasurement(initialValues[child.getName()]);
        child.getBaseElement().style.height = measure.multiply(1 + child.getPrestance()).toString();
    });
}
function positionFn(element) {
    const sortedElements = element.getChildren().sort((a, b) => b.getPrestance() - a.getPrestance());
    sortedElements.forEach(el => {
        element.getBaseElement().appendChild(el.getBaseElement());
    });
}
function getLevelParentElement(element, parentElement, topLevelParent) {
    if (parentElement === topLevelParent) {
        return parentElement;
    }
    const prestance = element.getPrestance();
    if (parentElement === null) {
        console.error("Error in element", element.getName(), ": null parent");
        return null;
    }
    if ((parentElement.getMaxPrestance() <= prestance) &&
        (parentElement.getPrestance() < prestance)) {
        return getLevelParentElement(element, parentElement.getParent(), topLevelParent);
    }
    return parentElement;
}
function levelFn(element, topLevelParent) {
    element.getChildren().forEach((child) => {
        const parent = getLevelParentElement(child, element, topLevelParent || element);
        !child.hasChildren()
            ? parent && parent.getBaseElement().appendChild(child.getBaseElement())
            : child.getParent().getBaseElement().appendChild(child.getBaseElement());
        levelFn(child, topLevelParent || element);
    });
}
function getChildrenComputedStyle(property, element) {
    return element.getChildren().reduce((prev, child) => {
        prev[child.getName()] = window.getComputedStyle(child.getBaseElement(), null).getPropertyValue(property);
        return prev;
    }, {});
}
function getInitialValue(property, element) {
    switch (property) {
        case LEVEL:
            return element.getParent() ? element.getParent().getBaseElement() : null;
        default:
            return getChildrenComputedStyle(property, element);
    }
}
export default class AIEHTMLProperty extends AIEProperty {
    constructor(name, element) {
        super(name, getInitialValue(name, element));
        switch (name) {
            case COLOR:
                this.setTransform(colorFn);
                break;
            case FONTSIZE:
                this.setTransform(fontSizeFn);
                break;
            case HEIGHT:
                this.setTransform(heightFn);
                break;
            case WIDTH:
                this.setTransform(widthFn);
                break;
            case POSITION:
                this.setTransform(positionFn);
                break;
            case LEVEL:
                this.setTransform(levelFn);
                break;
            default:
                console.error('Property', name, 'is not supported');
                break;
        }
    }
}
//# sourceMappingURL=AIEHTMLProperty.js.map