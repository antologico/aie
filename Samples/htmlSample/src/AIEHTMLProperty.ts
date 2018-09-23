import AIEProperty from './AIEProperty'

const COLOR = 'color'
const FONTSIZE = 'font-size'
const HEIGHT = 'height'
const WIDTH = 'width'
const POSITION = 'position'

function colorFn(percent: number) {

}
function fontSizeFn(percent: number) {

}
function widthFn(percent: number) {

}
function heightFn(percent: number) {

}
function position(pos: number) {

}

export default class AIEHTMLProperty extends AIEProperty {
    constructor (name: string) {
        super(name)

        switch(name) {
            case COLOR: this.setTransform(colorFn); break;
            case FONTSIZE: this.setTransform(colorFn); break;
            case HEIGHT: this.setTransform(colorFn); break;
            case WIDTH: this.setTransform(colorFn); break;
            case POSITION: this.setTransform(colorFn); break;
        }
    }
}
