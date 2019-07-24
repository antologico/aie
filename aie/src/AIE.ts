import AIEElement from './AIEElement'
import AIEMonitor from './AIEMonitor'
import AIEEventProcessor from './AIEEventProcessor'
import AIEPregnancyCalculator from './AIEPregnancyCalculator'
import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEAbstractMutation from './AIEAbstractMutation'
import AIEHTMLMonitor from './AIEHTMLMonitor'

export default abstract class AIE {
  private eventProcessor: AIEEventProcessor
  private environment: AIEElement
  private name: string
  private context: string
  private cycles: number
  private maxUpdateCycles: number
  private pregnancyCalculator: AIEPregnancyCalculator

  public constructor(name: string, context: any) {
    this.eventProcessor = new AIEEventProcessor(this)
    this.name = name
    this.context = context
    this.cycles = 0
    this.maxUpdateCycles = 0
    this.pregnancyCalculator = new AIEPregnancyCalculator(
      this,
      this.getPregnancySpeed(),
      this.getMaduration(),
      this.getMutation(),
    )
    AIEMonitor.addEnvironments(this)
  }

  public addCycle() {
    this.cycles += 1
  }

  public getCycles(): number {
    return 0;
  }

  public setMaxUpdatedCycles(max) {
    this.maxUpdateCycles = max
  }

  public getMaxUpdatedCycles(): number {
    return 0;
  }

  public abstract getPregnancySpeed(): number
  public abstract getMutation(): AIEAbstractMutation
  public abstract getMaduration(): AIEAbstractMaduration
  public abstract getElements():NodeListOf<any>

  public registerEvent (event: string, func: any) {
    this.eventProcessor.registerEvent(event, func)
  }

  private createTree(elements: Array<AIEElement>) {
    const toRemove: Array<number> = []
    elements.forEach((element, index) => {
      const elParent = this.getParentNode(elements, element.getBaseElementParent())
      if (elParent) {
        elParent.setChildren(element)
        toRemove.push(index)
      }
    })
    this.createEnvironment(elements.reduce((total, element, index) => {
      return toRemove.includes(index) ? total : total.concat(element)
    }, []))

  }

  private getParentNode(elements: Array<AIEElement>, element:Node): AIEElement {
    if (!element) {
      return null
    }
    const parent:AIEElement = elements.find((el: AIEElement) => {
      return el.getBaseElement() === element
    })

    return !parent
      ? this.getParentNode(elements, element.parentNode)
      : parent
  }

  public getName(): string {
    return this.name
  }

  private createEnvironment(elements: Array<AIEElement>) {
    this.environment = this.createElement(null)
    this.environment.setName(this.name)
    elements.forEach((el: AIEElement) => {
      this.environment.setChildren(el)
    })
    this.updatePregnancyTree(this.environment)
  }

  private updatePregnancyTree(element: AIEElement) {
    element.getChildren().forEach((el: AIEElement) => this.updatePregnancyTree(el))
    element.setPregnancy(element.getTotalAmbientPregnancy())
  }
  
  private initializeElements(matches: NodeListOf<any>) {
    const elements: Array<AIEElement> = []
    matches.forEach((el: Node) => {
      const aiee = this.createElement(el)
      aiee.setPregnancyCalculator(this.pregnancyCalculator)
      aiee.setProccesor(this.eventProcessor)
      elements.push(aiee)
    })
    this.createTree(elements)
  }

  public start() {
    this.initializeElements(this.getElements())
  }

  public getState():any {
    return this.getElementState(this.environment)
  }

  public setState(value: any, child: AIEElement = null) {
    const parent = child ? child : this.environment
    parent.setScore(value.score)
    parent.setPregnancy(value.pregnancy)
    parent.setFreePregnancy(value.freePregnancy)
    value.children.map((childValues: any) => {
      const el = parent.getChildren().find((e: AIEElement) => e.getName() === childValues.name)
      if (el) {
        this.setState(childValues, el)
      }
    })
  }

  public getContext():any {
    return this.context
  }

  public mutate() {
    this.environment.getChildren().forEach((child: AIEElement) => {
      child.mutate()
    })
  }

  public updatePregnancy() {
    this.environment.getChildren().forEach((child: AIEElement) => {
      child.updatePregnancy()
    })
  }

  private getElementState(element: AIEElement):any {
    const values:any = {
      name: element.getName(),
      pregnancy: element.getPregnancy(),
      score: element.getScore(),
      cycles: this.getCycles(),
      properties: element.getPropertiesNames(),
      triggers: element.getTriggersName(),
      freePregnancy: element.getFreePregnancy(),
      physicalAttribute: element.getPhysicalAttributes(),
      children: element.getChildren().map((children: AIEElement) => {
        return this.getElementState(children)
      })
    }
    return values
  }

  public abstract createElement(el: any): AIEElement
}
