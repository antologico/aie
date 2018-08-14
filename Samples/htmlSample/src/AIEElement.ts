import AIEMemory from './AIEMemory'
import AIEEventProcessor from './AIEEventProcessor'
import AIEPrestanceCalculator from './AIEPrestanceCalculator'

const DEFAULT_MAX_PRESTANCE = 1

export default abstract class AIEElement {
  private trigger: string
  protected baseElement: any
  private name: string
  private children: Array <AIEElement>
  private processor: AIEEventProcessor
  private parent: AIEElement
  private memory: AIEMemory
  private prestance: number
  private prestanceCalculator: AIEPrestanceCalculator
  private maxPrestance: number
  private updates: number

  public constructor(baseElement: any) {
    if(baseElement) {
      this.setBaseElement(baseElement)
      this.name = this.getAttr('name')
      this.trigger = this.getAttr('trigger')
      this.bindTriggers()
    }
    this.children = []
    this.processor = null
    this.parent = null
    this.prestance = 0
    this.updates = 0
    this.maxPrestance = DEFAULT_MAX_PRESTANCE // By default
    this.memory = this.initializeMemory(this.generateId())
  }

  public setMaxPrestance(prestance: number) {
    this.maxPrestance = prestance
  }

  public setName(name: string) {
    this.name = name
    this.memory.setId(this.generateId())
  }

  public generateId() {
    return 'aie::' + this.name
  }

  public updatePrestance(): void {
    if (this.hasParent()) {
      this.updates ++
      this.prestance += this.prestanceCalculator.calculateIncrement(this)
    }
  }

  public getInteractions(): number {
    return this.memory.getScore()
  }

  public getParentInteractions(): number {
    return this.parent ? this.parent.getInteractions() : 0
  }

  public getName() {
    return this.name
  }

  public getTriggerName() {
    return this.trigger
  }

  public getEventName() {
    return this.name
  }

  public isAmbient() {
    return this.children.length > 0
  }

  public setParent(element: AIEElement) {
    this.parent = element
  }

  public setProccesor(processor: AIEEventProcessor) {
    this.processor = processor
  }

  public getParent() {
    return this.parent
  }

  public setChildren(element: AIEElement) {
    this.children.push(element)
    element.setParent(this)
  }

  public onTrigger() {
    this.memory.anoteEvent()
    if (this.processor) {
      this.processor.notify({ name: this.getTriggerName(), element: this })
    }
  }

  public getChildren() {
    return this.children
  }

  public getScore(): number {
    return this.memory.getScore()
  }

  public getAmbientScore(): number {
    return this.isAmbient()
      ? this.children.reduce((total, child) => total + child.getScore(), 0)
      : 0
  }

  public updateChildrenPrestance(): void {
    this.children.forEach((child) => child.updatePrestance())
  }

  public hasParent(): boolean {
    return !!this.parent
  }

  public setPrestanceCalculator(prestanceCalculator: AIEPrestanceCalculator) {
    this.prestanceCalculator = prestanceCalculator
  }

  public getPrestace(): number {
    return this.prestance
  }

  public abstract initializeMemory(seed: string): AIEMemory
  public abstract setBaseElement(baseElement: any): void
  public abstract getAttr(attributeName: string): string
  public abstract getBaseElementParent(): Node
  public abstract getBaseElement(): any
  public abstract bindTriggers(): void
}
