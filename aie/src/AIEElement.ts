import AIEMemory from './AIEMemory'
import AIEEventProcessor from './AIEEventProcessor'
import AIEPregnancyCalculator from './AIEPregnancyCalculator'
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
  private pregnancy: number
  private pregnancyCalculator: AIEPregnancyCalculator
  private maxPregnancy: number
  private updates: number
  private maxUpdates: number = null
  private born: number
  private properties: Array<AIEProperty> 

  public constructor(baseElement: any) {
    if(baseElement) {
      this.setBaseElement(baseElement)
      this.name = this.getAttr('name')
      this.trigger = this.getAttrs('trigger')
      this.bindTriggers()
    }
    this.born = this.getDate()
    this.children = []
    this.processor = null
    this.parent = null
    this.pregnancy = 0
    this.updates = 0
    this.properties = []
    this.maxPregnancy = DEFAULT_MAX_PRESTANCE // By default
    this.memory = this.initializeMemory(this.generateId())
  }

  public setUpdates(updates: number) {
    this.maxUpdates = updates
  }

  public setMaxPregnancy(pregnancy: number) {
    this.maxPregnancy = pregnancy
  }

  public setName(name: string) {
    this.name = name
    this.memory.setId(this.generateId())
  }

  public generateId() {
    return 'aie::' + this.name
  }

  public updatePregnancy(increment: number = null): number {
    if (!this.hasParent() || (this.maxUpdates && (this.updates >= this.maxUpdates))) {
      return 0
    }
    if (increment !== null) {
      this.pregnancy += (this.pregnancy + increment > 0) ? increment : 0
      return increment
    }
    this.updates ++
    const newIncrement = this.pregnancyCalculator.calculateIncrement(this)
    this.pregnancy += newIncrement
    return newIncrement
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

  public getTriggersName(): any {
    return this.trigger || []
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

  public getProperties(): Array<AIEProperty> {
    return this.properties || []
  }

  public getPropertiesNames(): Array<String> {
    return this.getProperties().map((prop: AIEProperty) => prop.getName())
  }

  public setChildren(element: AIEElement) {
    this.children.push(element)
    element.setParent(this)
  }

  public onTrigger(name: string) {
    this.memory.anoteEvent()
    if (this.processor) {
      this.processor.notify({ name, element: this })
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

  public updateChildrenPregnancy(increment: number, excluded: Array<AIEElement> = []): void {
    this.children.forEach((child) => !excluded.includes(child) && child.updatePregnancy(increment))
  }
  public getMaxPregnancy(): number {
    return this.children.reduce((total, child) => Math.max(total, child.getPregnancy()), 0)
  }

  public hasParent(): boolean {
    return !!this.parent
  }

  public hasChildren(): boolean {
    return this.children.length !== 0
  }

  public setPregnancyCalculator(pregnancyCalculator: AIEPregnancyCalculator) {
    this.pregnancyCalculator = pregnancyCalculator
  }

  public getPregnancy(): number {
    return this.pregnancy
  }

  public setScore(value: number) {
    return this.memory.setScore(value)
  }

  public setPregnancy(value:number) {
    this.pregnancy = value
  }

  public mutate(maxPregnancy: number): void {
    this.transform(maxPregnancy ? this.getPregnancy() / maxPregnancy : 0)
    const maxGroupPregnancy = this.getMaxPregnancy()
    this.getChildren().forEach((child: AIEElement) => {
      child.mutate(maxGroupPregnancy)
    })

  }

  public abstract initializeMemory(seed: string): AIEMemory
  public abstract setBaseElement(baseElement: any): void
  public abstract getAttr(attributeName: string): string
  public abstract getAttrs(attributeName: string): any
  public abstract getBaseElementParent(): Node
  public abstract getBaseElement(): any
  public abstract bindTriggers(): void
  public abstract getDate(): number
  public abstract getPhysicalAttributes(): any
  public abstract transform(percent: number): void
}
