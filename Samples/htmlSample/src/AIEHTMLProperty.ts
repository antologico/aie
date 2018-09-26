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
    element.getBaseElement().style.color = color.increment(1 + element.getPrestace()).toString()
}

function fontSizeFn(element: AIEElement, initialValue: string) {
    const fontSizeBase: number = parseFloat(initialValue)
    element.getBaseElement().style.fontSize = Math.round(fontSizeBase * (1 + element.getPrestace())) + 'px'
}

function widthFn(element: AIEElement, initialValue: string) {
    const width: number = parseFloat(initialValue)
    element.getBaseElement().style.width = Math.round(width * (1 + element.getPrestace())) + 'px'
}

function heightFn(element: AIEElement, initialValue: string) {
    const height: number = parseFloat(initialValue)
    element.getBaseElement().style.width = Math.round(height * (1 + element.getPrestace())) + 'px'
}
function positionFn(element: AIEElement) {
    const sortedElements = element.getChildren().sort((a:AIEElement, b:AIEElement) => b.getPrestace() - a.getPrestace())
    sortedElements.forEach(el => {
        element.getBaseElement().appendChild(el.getBaseElement())
    });

}
function levelFn(element: AIEHTMLElement) {
}

export default class AIEHTMLProperty extends AIEProperty {
    constructor (name: string, initialValue: any) {
        super(name, initialValue)
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
