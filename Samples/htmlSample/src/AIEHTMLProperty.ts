import AIEProperty from './AIEProperty'
import AIEElement from './AIEElement'
import Color from './Color'
import AIEHTMLElement from './AIEHTMLElement'

const COLOR = 'color'
const FONTSIZE = 'font-size'
const HEIGHT = 'height'
const WIDTH = 'width'
const POSITION = 'position'
const LEVEL = 'level'

function colorFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const initialValue = initialValues[child.getName()]
        const color: Color = new Color(initialValue)
        child.getBaseElement().style.color = color.increment(1 + child.getPrestance()).toString()
    });
}

function fontSizeFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const initialValue = initialValues[child.getName()]
        const fontSizeBase: number = parseFloat(initialValue)
        child.getBaseElement().style.fontSize = Math.round(fontSizeBase * (1 + child.getPrestance())) + 'px'
    });
}

function widthFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const initialValue = initialValues[child.getName()]
        const width: number = parseFloat(initialValue)
        child.getBaseElement().style.width = Math.round(width * (1 + child.getPrestance())) + 'px'
    });
}

function heightFn(element: AIEElement, initialValues: any) {
    element.getChildren().forEach((child: AIEElement) => {
        const initialValue = initialValues[child.getName()]
        const height: number = parseFloat(initialValue)
        child.getBaseElement().style.height = Math.round(height * (1 + child.getPrestance())) + 'px'
    });
}


function positionFn(element: AIEElement) {
    const sortedElements = element.getChildren().sort((a:AIEElement, b:AIEElement) => b.getPrestance() - a.getPrestance())
    sortedElements.forEach(el => {

        element.getBaseElement().appendChild(el.getBaseElement())
    });

}

function getLevelParentElement(
    element: AIEElement,
    parentElement: AIEElement,
    topLevelParent: AIEElement) : AIEElement {
    
    if (parentElement === topLevelParent) {
        return parentElement
    }
    
    const prestance = element.getPrestance()

    if ((parentElement.getMaxPrestance() <= prestance) &&
        (parentElement.getPrestance() < prestance)) {
        return getLevelParentElement(element, parentElement.getParent(), topLevelParent)
    }
        
    return parentElement
}

function levelFn(element: AIEHTMLElement, topLevelParent: AIEElement) {

    element.getChildren().forEach((child: AIEHTMLElement) => {
        const parent = getLevelParentElement(child, element, topLevelParent || element)
        !child.hasChildren()
            ? parent.getBaseElement().appendChild(child.getBaseElement())
            : child.getParent().getBaseElement().appendChild(child.getBaseElement())
        levelFn(child, topLevelParent || element)
    })
}

function getInitialValue(property: string, element: AIEHTMLElement) {
    switch(property) {
        case LEVEL:
            return element.getParent() ? element.getParent().getBaseElement() : null
        default:
            return element.getChildren().reduce(
                (prev: any, child) => {
                    prev[child.getName()] = window.getComputedStyle(child.getBaseElement(), null).getPropertyValue(property)
                    return prev
                }, {})
    }
}

export default class AIEHTMLProperty extends AIEProperty {
    constructor (name: string, element: AIEHTMLElement) {
        super(name, getInitialValue(name, element))
        switch(name) {
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
