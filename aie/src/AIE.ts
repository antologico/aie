import AIEElement from './AIEElement'
import AIEMonitor from './AIEMonitor'
import AIEEventProcessor from './AIEEventProcessor'
import AIEPrestanceCalculator from './AIEPrestanceCalculator'
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed'
import AIEAbstractMaduration from './AIEAbstractMaduration'

export default abstract class AIE {
  private eventProcessor: AIEEventProcessor
  private environment: AIEElement
  private name: string
  private context: string
  private prestanceCalculator: AIEPrestanceCalculator

  public constructor(name: string, context: any) {
    this.eventProcessor = new AIEEventProcessor(this)
    this.name = name
    this.context = context
    this.prestanceCalculator = new AIEPrestanceCalculator(
      this.getPrestanceSpeed(),
      this.getMaduration()
    )
    AIEMonitor.addEnvironments(this)
  }

  public abstract getPrestanceSpeed(): AIEAbstractPrestanceSpeed
  public abstract getMaduration(): AIEAbstractMaduration
  public abstract getElements():NodeListOf<any>

  public registerEvent (event: string, func: any) {
    this.eventProcessor.registerEvent(event, func)
  }

  private estructureElements(elements: Array<AIEElement>) {
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
    const parent:AIEElement = elements.find((el) => {
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
    elements.forEach((el: AIEElement) => this.environment.setChildren(el))
  }

  private initializeElements(matches: NodeListOf<any>) {
    const elements: Array<AIEElement> = []
    matches.forEach((el: Node) => {
      const aiee = this.createElement(el)
      aiee.setPrestanceCalculator(this.prestanceCalculator)
      aiee.setProccesor(this.eventProcessor)
      elements.push(aiee)
    })
    this.estructureElements(elements)
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
    parent.setPrestance(value.prestance)
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
    const maxGroupPrestance = this.environment.getMaxPrestance()
    this.environment.getChildren().forEach((child: AIEElement) => {
      child.mutate(maxGroupPrestance)
    })
  }

  private getElementState(element: AIEElement):any {
    const values:any = {
      name: element.getName(),
      prestance: element.getPrestance(),
      score: element.getScore(),
      properties: element.getPropertiesNames(),
      physicalAttribute: element.getPhysicalAttributes(),
      children: element.getChildren().map((children: AIEElement) => {
        return this.getElementState(children)
      })
    }
    return values
  }

  public abstract createElement(el: any): AIEElement
}
