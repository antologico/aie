import AIEElement from './AIEElement'
import AIEMemory from './AIEMemory'
import AIEHTMLMemory from './AIEHTMLMemory'

/*
  The BaseElement is a DOM element
*/
export default class AIEHTMLElement extends AIEElement {
  protected baseElement: HTMLElement
  public fields: Array<string>

  public constructor(baseElement: any) {
    super(baseElement)
    console.log(baseElement)
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
    const name = `aie-${attributeName}`
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
    console.log(this.getName() , 'Cambiando el ' + Math.round(percent * 100) +  '%', 'de', )
  }
}
