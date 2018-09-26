import AIEProperty from './AIEProperty'
import AIEElement from './AIEElement'
import AIEHTMLElement from './AIEHTMLElement'

const COLOR = 'color'
const FONTSIZE = 'font-size'
const HEIGHT = 'height'
const WIDTH = 'width'
const POSITION = 'position'
const LEVEL = 'level'

function colorFn(element: AIEElement) {

}
function fontSizeFn(element: AIEElement) {
    const fontSizeBase: number = parseFloat(window.getComputedStyle(element.getBaseElement(), null).getPropertyValue('font-size'))
    element.getChildren().forEach(el => {
        console.log('font = ', Math.round(fontSizeBase * (1 + el.getPrestace())))
        el.getBaseElement().style.fontSize = Math.round(fontSizeBase * (1 + el.getPrestace())) + 'px'
    });
}
function widthFn(element: AIEElement) {

}
function heightFn(element: AIEElement) {

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
    constructor (name: string) {
        super(name)

        switch(name) {
            case COLOR: this.setTransform(colorFn); break;
            case FONTSIZE: this.setTransform(fontSizeFn); break;
            case HEIGHT: this.setTransform(widthFn); break;
            case WIDTH: this.setTransform(heightFn); break;
            case POSITION: this.setTransform(positionFn); break;
            case LEVEL: this.setTransform(levelFn); break;
        }
    }
}
