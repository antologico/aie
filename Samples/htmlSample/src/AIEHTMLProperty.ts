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

function colorFn(element: AIEElement, initialValue: string) {
    const color: Color = new Color(initialValue)
    element.getBaseElement().style.color = color.increment(1 + element.getPrestance()).toString()
}

function fontSizeFn(element: AIEElement, initialValue: string) {
    const fontSizeBase: number = parseFloat(initialValue)
    element.getBaseElement().style.fontSize = Math.round(fontSizeBase * (1 + element.getPrestance())) + 'px'
}

function widthFn(element: AIEElement, initialValue: string) {
    const width: number = parseFloat(initialValue)
    element.getBaseElement().style.width = Math.round(width * (1 + element.getPrestance())) + 'px'
}

function heightFn(element: AIEElement, initialValue: string) {
    const height: number = parseFloat(initialValue)
    element.getBaseElement().style.width = Math.round(height * (1 + element.getPrestance())) + 'px'
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
    switch(name) {
        case LEVEL:
            return element.getParent().getBaseElement();
        default:
            return window.getComputedStyle(element.getBaseElement(), null).getPropertyValue(property)
    }
}

export default class AIEHTMLProperty extends AIEProperty {
    constructor (name: string, element: AIEHTMLElement) {
        super(name, getInitialValue(name, element))
        switch(name) {
            case COLOR: this.setTransform(colorFn); break;
            case FONTSIZE: this.setTransform(fontSizeFn); break;
            case HEIGHT: this.setTransform(widthFn); break;
            case WIDTH: this.setTransform(heightFn); break;
            case POSITION: this.setTransform(positionFn); break;
            case LEVEL: this.setTransform(levelFn); break;
            default:
                console.error('Property',name,'is not supported')
                break;
        }
    }
}
