import AIEElement from './AIEElement'
import AIEMemory from './AIEMemory'
import AIEHTMLMemory from './AIEHTMLMemory'
import AIEHTMLAIEProperty from './AIEHTMLProperty'

const MAX_ID = 'max'
const MIN_ID = 'min'
const HTML_SUFFIX_PRESTACE_FIELD = 'prestance-fields'
const HTML_PREFIX = 'aie-'

/*
  The BaseElement is a DOM element
*/
export default class AIEHTMLElement extends AIEElement {
  protected baseElement: HTMLElement

  public constructor(baseElement: any) {
    super(baseElement)
    this.setProperties(this.parseAttr(this.getAttr(HTML_SUFFIX_PRESTACE_FIELD)))
  }

  public parseAttr(text: string): Array<AIEHTMLAIEProperty> {
      if (!text) {
        return []
      }

      const properties:Array<AIEHTMLAIEProperty> = []
      
      text.split(',').forEach(el => {
        const components = el.split('|')
        if (components.length) {
          const property = new AIEHTMLAIEProperty(components.shift().trim())
          components.forEach(element => {
            const parts = element.split(':')
            if (parts.length === 2) {
              if (parts[0] === MAX_ID) {
                property.setMax(parseFloat(parts[1].trim()))
              }
              if (parts[0] === MIN_ID) {
                property.setMin(parseFloat(parts[1].trim()))
              }
            }
          });
          properties.push(property)
        }
      })
      return properties
  }

  public initializeMemory(seed: string): AIEMemory {
    return new AIEHTMLMemory(seed)
  }

  public setBaseElement(baseElement: HTMLElement) {
    this.baseElement = baseElement
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

  public bindTriggers() {
    if (this.getTriggerName()) {
      this.baseElement.addEventListener(this.getTriggerName(), this.onTrigger.bind(this))
    }
  }

  public generate(baseElement:any): AIEHTMLElement {
    return new AIEHTMLElement(baseElement)
  }

  public getBaseElementParent(): Node {
    return this.getBaseElement().parentNode
  }

  public getDate(): number {
    const d = new Date()
    return d.getMilliseconds()
  }

  public transform(percent: number): void {
    this.getProperties().forEach(prop => {
      prop.transform(this)
    })
  }
}
