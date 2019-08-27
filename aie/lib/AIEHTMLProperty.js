import AIEProperty from './AIEProperty';
import Color from './HTMLMeasures/Color';
import Space from './HTMLMeasures/Space';
import Position from './HTMLMeasures/Position';
import Level from './HTMLMeasures/Level';
const COLOR = 'color';
const FONTSIZE = 'font-size';
const HEIGHT = 'height';
const WIDTH = 'width';
const POSITION = 'position';
const LEVEL = 'level';
const DISPLAY = 'display';
function calculatePregnanceFromPosition(index, length) {
    return Math.pow(2, (length - index) - 1) / (Math.pow(2, length) - 1);
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
            case DISPLAY:
                this.setTransform(this.displayFn);
                break;
            case COLOR:
                this.measure = new Color();
                this.min = 0;
                this.max = Color.MAX_VALUE;
                this.setTransform(this.colorFn);
                break;
            case FONTSIZE:
                this.measure = new Space();
                this.setTransform(this.fontSizeFn);
                break;
            case HEIGHT:
                this.measure = new Space();
                this.setTransform(this.heightFn);
                break;
            case WIDTH:
                this.measure = new Space();
                this.setTransform(this.widthFn);
                break;
            case POSITION:
                this.measure = new Position();
                this.setTransform(this.positionFn);
                break;
            case LEVEL:
                this.measure = new Level();
                this.setTransform(this.levelFn);
                break;
            default:
                console.error('Property', name, 'is not supported');
                break;
        }
    }
    colorFn(element) {
        this.propDefaultFn('color', element);
    }
    fontSizeFn(element) {
        this.propDefaultFn('fontSize', element);
    }
    widthFn(element) {
        this.propDefaultFn('width', element);
    }
    heightFn(element) {
        this.propDefaultFn('height', element);
    }
    propDefaultFn(prop, element) {
        const maxProperty = element.getMaxAmbientPropertyValue(this.name);
        const pregnancy = element.getTotalAmbientPregnancy();
        if (pregnancy) {
            const newMaxProperty = element.getChildren().reduce((total, child) => {
                this.measure.setValue(this.initialValues[child.getName()]);
                const value = this.dimensionedValue(maxProperty * child.getPregnancy() / pregnancy);
                const measure = this.measure.calculate(Math.floor(value));
                child.getBaseElement().style[prop] = measure.toString();
                this.setMeasure(child.getName(), measure);
                return total + value;
            }, 0);
            const correctionParameter = Math.min(maxProperty / newMaxProperty, 1);
            if (correctionParameter < 1) {
                element.getChildren().forEach((child) => {
                    const prev = this.getMeasure(child.getName());
                    const measure = prev.calculate(prev.getValue() * correctionParameter);
                    child.getBaseElement().style[prop] = measure.toString();
                    this.setMeasure(child.getName(), measure);
                });
            }
        }
    }
    positionFn(element) {
        element.getChildren()
            .sort((a, b) => b.getPregnancy() - a.getPregnancy())
            .forEach((el, index, sortedElements) => {
            element.getBaseElement().appendChild(el.getBaseElement());
            const prev = this.getMeasure(el.getName());
            this.setMeasure(el.getName(), prev.calculate(calculatePregnanceFromPosition(index, sortedElements.length)));
        });
    }
    displayFn(element) {
        let display = 'inherit';
        if (!element.getPregnancy()) {
            display = 'none';
        }
        element.getBaseElement().style.display = display;
    }
    getLevelParentElement(child, topLevelParent) {
        if (!child.getPregnancy()) {
            return;
        }
        const parent = child.getParent();
        if (parent.getBaseElement() === topLevelParent) {
            return;
        }
        if (parent.getParent().getBaseElement() === topLevelParent) {
            return;
        }
        const cousins = parent.getParent().getChildren();
        if (cousins.length === 1) {
            return parent.getParent();
        }
        const selectedCousins = cousins.filter(cousin => {
            return cousin.getPregnancy() < child.getPregnancy();
        });
        if (selectedCousins.length > 0) {
            return parent.getParent();
        }
        return;
    }
    levelFn(element, topLevelParent) {
        const top = topLevelParent || element.getBaseElement();
        if (!element.getPregnancy()) {
            return;
        }
        element.getChildren()
            .sort((a, b) => b.getPregnancy() - a.getPregnancy())
            .forEach((child) => {
            const nextParent = this.getLevelParentElement(child, top);
            if (nextParent) {
                nextParent.getBaseElement().appendChild(child.getBaseElement());
                nextParent.setChildren(child);
            }
            this.levelFn(child, top);
        });
    }
}
//# sourceMappingURL=AIEHTMLProperty.js.map