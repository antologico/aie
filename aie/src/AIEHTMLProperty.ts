import AIEProperty from './AIEProperty'
import AIEElement from './AIEElement'
import Color from './Color'
import AIEHTMLElement from './AIEHTMLElement'
import AIEHTMLMeasurement from './AIEHTMLMeasurement'

const COLOR = 'color'
const FONTSIZE = 'font-size'
const HEIGHT = 'height'
const WIDTH = 'width'
const POSITION = 'position'
const LEVEL = 'level'
const DISPLAY = 'display'

function colorFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const initialValue = initialValues[child.getName()]
        const color: Color = new Color(initialValue)
        child.getBaseElement().style.color = color.increment(1 + child.getPregnancyIncrement()).toString()
    });
}

function fontSizeFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const measure = new AIEHTMLMeasurement(initialValues[child.getName()])
        child.getBaseElement().style.fontSize = measure.multiply(1 + child.getPregnancyIncrement()).toString()
    });
}

function widthFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const measure = new AIEHTMLMeasurement(initialValues[child.getName()])
        child.getBaseElement().style.width = measure.multiply(1 + child.getPregnancyIncrement()).toString()
    });
}

function heightFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const measure = new AIEHTMLMeasurement(initialValues[child.getName()])
        child.getBaseElement().style.height = measure.multiply(1 + child.getPregnancyIncrement()).toString()
    });
}

function positionFn(element: AIEElement) {
    const sortedElements = element.getChildren().sort((a:AIEElement, b:AIEElement) => b.getPregnancy() - a.getPregnancy())
    sortedElements.forEach(el => {
        element.getBaseElement().appendChild(el.getBaseElement())
    });
}

function displayFn(element) {
    let display = 'inherit';
    if (!element.getPregnancy()) {
        display = 'none';
    }
    element.getBaseElement().style.display = display;
}

function getLevelParentElement(
    element: AIEElement,
    parentElement: AIEElement,
    topLevelParent: AIEElement) : AIEElement {
    
    if (parentElement === topLevelParent) {
        return parentElement
    }
    
    const pregnancy = element.getPregnancy()
    if (parentElement === null) {
        console.error ("Error in element", element.getName(), ": null parent" )
        return null
    }
    if ((parentElement.getMaxAmbientPregnancy() <= pregnancy) &&
        (parentElement.getPercentualPregnancy() < element.getPercentualPregnancy())) {
        return getLevelParentElement(element, parentElement.getParent(), topLevelParent)
    }
        
    return parentElement
}

function levelFn(element: AIEHTMLElement, topLevelParent: AIEElement) {

    element.getChildren().forEach((child: AIEHTMLElement) => {
        const parent = getLevelParentElement(child, element, topLevelParent || element)
        !child.hasChildren()
            ? parent && parent.getBaseElement().appendChild(child.getBaseElement())
            : child.getParent().getBaseElement().appendChild(child.getBaseElement())
        levelFn(child, topLevelParent || element)
    })
}

function getChildrenComputedStyle(property: string, element: AIEHTMLElement) {
    return element.getChildren().reduce(
        (prev: any, child) => {
            prev[child.getName()] = window.getComputedStyle(child.getBaseElement(), null).getPropertyValue(property)
            return prev
        }, {})
}

function getInitialValue(property: string, element: AIEHTMLElement) {
    switch(property) {
        case LEVEL:
            return element.getParent() ? element.getParent().getBaseElement() : null
        default:
            return getChildrenComputedStyle(property, element)
    }
}

export default class AIEHTMLProperty extends AIEProperty {
    constructor (name: string, element: AIEHTMLElement) {
        super(name, getInitialValue(name, element))
        switch(name) {
            case DISPLAY: this.setTransform(displayFn); break;
            case COLOR: this.setTransform(colorFn); break;
            case FONTSIZE: this.setTransform(fontSizeFn); break;
            case HEIGHT: this.setTransform(heightFn); break;
            case WIDTH: this.setTransform(widthFn); break;
            case POSITION: this.setTransform(positionFn); break;
            case LEVEL: this.setTransform(levelFn); break;
            default:
                console.error('Property',name,'is not supported')
                break;
        }
    }
}

