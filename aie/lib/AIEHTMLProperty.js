import AIEProperty from './AIEProperty';
import Color from './HTMLMeasures/Color';
import Space from './HTMLMeasures/Space';
import Position from './HTMLMeasures/Position';
const COLOR = 'color';
const FONTSIZE = 'font-size';
const HEIGHT = 'height';
const WIDTH = 'width';
const POSITION = 'position';
const LEVEL = 'level';
const DISPLAY = 'display';
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
                this.measure = new Position();
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
                console.log(' _______________', child.getName(), ' p=', child.getPregnancy(), ' => ', measure.toString());
                this.setMeasure(child.getName(), measure);
                return total + value;
            }, 0);
            const correctionParameter = Math.min(maxProperty / newMaxProperty, 1);
            console.log('   correctionParameter ', correctionParameter, ' = ', maxProperty, '/', newMaxProperty);
            if (correctionParameter < 1) {
                element.getChildren().forEach((child) => {
                    const prev = this.getMeasure(child.getName());
                    const measure = prev.calculate(prev.getValue() * correctionParameter);
                    child.getBaseElement().style[prop] = measure.toString();
                    console.log('   >____________', child.getName(), ' p=', child.getPregnancy(), ' => ', measure.toString());
                    this.setMeasure(child.getName(), measure);
                });
            }
        }
    }
    positionFn(element) {
        const sortedElements = element.getChildren().sort((a, b) => b.getPregnancy() - a.getPregnancy());
        sortedElements.forEach(el => {
            console.log('positionFn', el.getName());
            element.getBaseElement().appendChild(el.getBaseElement());
        });
    }
    displayFn(element) {
        let display = 'inherit';
        if (!element.getPregnancy()) {
            display = 'none';
        }
        element.getBaseElement().style.display = display;
    }
    getLevelParentElement(element, parentElement, topLevelParent) {
        if (parentElement === topLevelParent) {
            return parentElement;
        }
        const pregnancy = element.getPregnancy();
        if (parentElement === null) {
            console.error("Error in element", element.getName(), ": null parent");
            return null;
        }
        if ((parentElement.getMaxAmbientPregnancy() <= pregnancy) &&
            (parentElement.getPercentualPregnancy() < element.getPercentualPregnancy())) {
            return this.getLevelParentElement(element, parentElement.getParent(), topLevelParent);
        }
        return parentElement;
    }
    levelFn(element, topLevelParent) {
        element.getChildren().forEach((child) => {
            const parent = this.getLevelParentElement(child, element, topLevelParent || element);
            !child.hasChildren()
                ? parent && parent.getBaseElement().appendChild(child.getBaseElement())
                : child.getParent().getBaseElement().appendChild(child.getBaseElement());
            this.levelFn(child, topLevelParent || element);
        });
    }
}
//# sourceMappingURL=AIEHTMLProperty.js.map