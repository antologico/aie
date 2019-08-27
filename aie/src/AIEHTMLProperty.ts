import AIEProperty from './AIEProperty'
import AIEElement from './AIEElement'
import Color from './HTMLMeasures/Color'
import Space from './HTMLMeasures/Space'
import AIEHTMLElement from './AIEHTMLElement'
import AIEMeasure from './AIEMeasure';
import Position from './HTMLMeasures/Position';
import Level from './HTMLMeasures/Level';

const COLOR = 'color'
const FONTSIZE = 'font-size'
const HEIGHT = 'height'
const WIDTH = 'width'
const POSITION = 'position'
const LEVEL = 'level'
const DISPLAY = 'display'

function calculatePregnanceFromPosition(index: number, length: number): number {
    return Math.pow(2, (length-index)-1) / (Math.pow(2, length) - 1)
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
            case DISPLAY: this.setTransform(this.displayFn); break;
            case COLOR: 
                this.measure = new Color()
                this.min = 0
                this.max = Color.MAX_VALUE
                this.setTransform(this.colorFn); break;
            case FONTSIZE:
                this.measure = new Space()
                this.setTransform(this.fontSizeFn); break;
            case HEIGHT:
                this.measure = new Space()
                this.setTransform(this.heightFn); break;
            case WIDTH:
                this.measure = new Space()
                this.setTransform(this.widthFn); break;
            case POSITION: 
                this.measure = new Position();
                this.setTransform(this.positionFn); break;
            case LEVEL:
                this.measure = new Level();
                this.setTransform(this.levelFn); break;
            default:
                console.error('Property',name,'is not supported')
                break;
        }
    }

    colorFn(element: AIEElement) {
        this.propDefaultFn('color', element)
    }

    fontSizeFn(element: AIEElement) {
        this.propDefaultFn('fontSize', element)
    }

    widthFn(element: AIEElement) {
        this.propDefaultFn('width', element)
     }

    heightFn(element: AIEElement) {
        this.propDefaultFn('height', element)
    }

    propDefaultFn(prop: string, element: AIEElement) {
        const maxProperty = element.getMaxAmbientPropertyValue(this.name)
        const pregnancy = element.getTotalAmbientPregnancy()
        if (pregnancy) {
            const newMaxProperty:number =element.getChildren().reduce((total, child: AIEElement) => {
                this.measure.setValue(this.initialValues[child.getName()])
                const value = this.dimensionedValue(maxProperty * child.getPregnancy() / pregnancy)
                const measure: AIEMeasure = this.measure.calculate(Math.floor(value))
                child.getBaseElement().style[prop] = measure.toString()
                this.setMeasure(child.getName(), measure)
                return total + value
            }, 0)
            
            const correctionParameter:number = Math.min(maxProperty / newMaxProperty, 1)
            if (correctionParameter < 1) {
                element.getChildren().forEach((child: AIEElement) => {
                    const prev:AIEMeasure = this.getMeasure(child.getName())
                    const measure:AIEMeasure = prev.calculate(prev.getValue() * correctionParameter)
                    child.getBaseElement().style[prop] = measure.toString()
                    this.setMeasure(child.getName(), measure)
                })
            }
        }
    }

    positionFn(element: AIEElement) {
        element.getChildren()
            .sort((a:AIEElement, b:AIEElement) => b.getPregnancy() - a.getPregnancy())
            .forEach((el: AIEElement, index, sortedElements) => {
                element.getBaseElement().appendChild(el.getBaseElement())
                const prev:AIEMeasure = this.getMeasure(el.getName())
                this.setMeasure(el.getName(), prev.calculate(calculatePregnanceFromPosition(index, sortedElements.length)))
            });
    }

    displayFn(element) {
        let display = 'inherit';
        if (!element.getPregnancy()) {
            display = 'none';
        }
        element.getBaseElement().style.display = display;
    }

    getLevelParentElement(
        child: AIEElement,
        topLevelParent: AIEElement) : AIEElement {
        if (!child.getPregnancy()) {
            return
        }
    
        const parent = child.getParent()
        if (parent.getBaseElement() === topLevelParent) {
            return
        }

        if (parent.getParent().getBaseElement() === topLevelParent) {
            return
        }
        
        const cousins = parent.getParent().getChildren()
        if  (cousins.length === 1) {
            return parent.getParent()
        }

        const selectedCousins = cousins.filter(cousin => {
            return cousin.getPregnancy() < child.getPregnancy()
        })

        if (selectedCousins.length > 0) {
            return parent.getParent()
        }   
        return
    }

    levelFn(element: AIEHTMLElement, topLevelParent: any) {
        const top = topLevelParent || element.getBaseElement()
        if (!element.getPregnancy()) {
            return
        }
        element.getChildren()
            .sort((a:AIEElement, b:AIEElement) => b.getPregnancy() - a.getPregnancy())
            .forEach((child: AIEHTMLElement) => {
                const nextParent = this.getLevelParentElement(child, top)
                if (nextParent) {
                    nextParent.getBaseElement().appendChild(child.getBaseElement())
                    nextParent.setChildren(child)
                }
                this.levelFn(child, top)
            })
    }
}

