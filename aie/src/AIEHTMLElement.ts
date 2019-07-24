import AIEElement from './AIEElement'
import AIEMemory from './AIEMemory'
import AIEHTMLMemory from './AIEHTMLMemory'
import AIEHTMLProperty from './AIEHTMLProperty'
import AIEHTMLMonitor from './AIEHTMLMonitor'

const TOTAL_ID = 'total'
const MAX_ID = 'max'
const MIN_ID = 'min'
const HTML_SUFFIX_PRESTACE_FIELD = 'properties'
const HTML_SUFFIX_TRIGGER_ON_CHANGE = 'on-change'
const HTML_PREFIX = 'aie-'

/*
  The BaseElement is a DOM element
*/
export default class AIEHTMLElement extends AIEElement {
  protected baseElement: HTMLElement
  protected style: Object

  public constructor(baseElement: any) {
    super(baseElement)
  }

  public parseAttr(text: string): Array<AIEHTMLProperty> {
      if (!text) {
        return []
      }

      const properties:Array<AIEHTMLProperty> = []
      
      text.split(',').forEach(el => {
        const components = el.split('|')
        if (components.length) {
          const name = components.shift().trim()
          const property = new AIEHTMLProperty(name, this)
          components.forEach(element => {
            const parts = element.split(':')
            if (parts.length === 2) {
              if (parts[0] === MAX_ID) {
                property.setMax(parseFloat(parts[1].trim()))
              }
              if (parts[0] === MIN_ID) {
                property.setMin(parseFloat(parts[1].trim()))
              }
              if (parts[0] === TOTAL_ID) {
                property.setTotal(parseFloat(parts[1].trim()))
              }
            }
          });
          properties.push(property)
        }
      })
      return properties
  }

  public setChildren(element: AIEElement) {
    super.setChildren(element)
    this.setProperties(this.parseAttr(this.getAttr(HTML_SUFFIX_PRESTACE_FIELD)))
    this.setOnChangeTrigger(this.getAttr(HTML_SUFFIX_TRIGGER_ON_CHANGE))
  }

  public initializeMemory(seed: string): AIEMemory {
    return new AIEHTMLMemory(seed)
  }

  public setBaseElement(baseElement: HTMLElement) {
    this.baseElement = baseElement
    this.style = {
      ...window.getComputedStyle(baseElement)
    }
  }

  public getBaseElement(): HTMLElement {
    return this.baseElement
  }

  public getAttr(attributeName: string) {
    const name = `${HTML_PREFIX}${attributeName}`
    if (this.baseElement === undefined) {
      return undefined
    }
    const val = this.baseElement.attributes.getNamedItem(name)
    return val ? val.value : undefined
  }

  public getAttrs(attributeName: string) {
    const values = this.getAttr(attributeName);

    return values === undefined
      ? undefined
      : values.split(',').map(function(item) {
        return item.trim();
      })
  }

  public bindTriggers() {
    const triggers:any = this.getTriggersName()
    for (let t in triggers) {
      this.baseElement.addEventListener(triggers[t], this.onTrigger.bind(this, triggers[t]))
    }
  }

  public generate(baseElement:any): AIEHTMLElement {
    return new AIEHTMLElement(baseElement)
  }

  public getBaseElementParent(): Node {
    return this.getBaseElement().parentNode
  }

  public transform(): void {
    this.getProperties().forEach(prop => { 
      prop.transform(this)
    })
  }

  public getPhysicalAttributes() {
    const el = this.getBaseElement()
    if (!el) {
      return {}
    }
    return this.getAbsoluteBoundingRect(el)
  }

  private getAbsoluteBoundingRect (el: HTMLElement) {
    const doc  = document,
        win  = window,
        body = doc.body,
        rect = el.getBoundingClientRect()
        // pageXOffset and pageYOffset work everywhere except IE <9.
    let offsetX = win.pageXOffset,
        offsetY = win.pageYOffset

    if (el !== body) {
        let parentNode: any = el.parentNode
        // The element's rect will be affected by the scroll positions of
        // *all* of its scrollable parents, not just the window, so we have
        // to walk up the tree and collect every scroll offset. Good times.
        while (parentNode !== body) {
            offsetX += parentNode.scrollLeft;
            offsetY += parentNode.scrollTop;
            parentNode = parentNode.parentNode;
        }
    }

    return {
        height: rect.height,
        left  : rect.left + offsetX,
        top   : rect.top + offsetY,
        width : rect.width
    };
  }
}