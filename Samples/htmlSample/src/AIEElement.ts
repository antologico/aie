import AIEMemory from './AIEMemory'
import AIEEventProcessor from './AIEEventProcessor'
import AIEPrestanceCalculator from './AIEPrestanceCalculator'
import AIEProperty from './AIEProperty'

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
  private born: number
  private properties: Array<AIEProperty> 

  public constructor(baseElement: any) {
    if(baseElement) {
      this.setBaseElement(baseElement)
      this.name = this.getAttr('name')
      this.trigger = this.getAttr('trigger')
      this.bindTriggers()
    }
    this.born = this.getDate()
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

  public updatePrestance(increment: number = null): number {
    if (this.hasParent()) {
      if (increment !== null) {
        this.prestance += (this.prestance + increment > 0) ? increment : 0
        return increment
      }
      this.updates ++
      const newIncrement = this.prestanceCalculator.calculateIncrement(this)
      this.prestance += newIncrement
      return newIncrement
    }
    return 0
  }

  public getInteractions(): number {
    return this.memory.getScore()
  }

  public getParentInteractions(): number {
    return this.parent ? this.parent.getInteractions() : 0
  }

  public getLife(now: number = null): number {
    const myDate = now || this.getDate()
    return myDate - this.born
  }

  public getParentLife(now: number = null): number {
    const myDate = now || this.getDate()
    return myDate - this.parent.born
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
  
  public setProperties(properties: Array<AIEProperty>) {
    this.properties = properties
  }

  public getProperties() {
    return this.properties
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

  public updateChildrenPrestance(increment: number, excluded: Array<AIEElement> = []): void {
    this.children.forEach((child) => !excluded.includes(child) && child.updatePrestance(increment))
  }
  public getMaxPrestance(): number {
    return this.children.reduce((total, child) => Math.max(total, child.getPrestace()), 0)
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

  public setScore(value: number) {
    return this.memory.setScore(value)
  }

  public mutate(maxPrestance: number): void {
    this.transform(maxPrestance ? this.getPrestace() / maxPrestance : 0)
    const maxGroupPrestance = this.getMaxPrestance()
    this.getChildren().forEach((child: AIEElement) => {
      child.mutate(maxGroupPrestance)
    })

  }

  public abstract initializeMemory(seed: string): AIEMemory
  public abstract setBaseElement(baseElement: any): void
  public abstract getAttr(attributeName: string): string
  public abstract getBaseElementParent(): Node
  public abstract getBaseElement(): any
  public abstract bindTriggers(): void
  public abstract getDate(): number
  public abstract transform(percent: number): void
}
