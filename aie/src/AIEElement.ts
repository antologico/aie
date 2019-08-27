import AIEMemory from './AIEMemory'
import AIEEventProcessor from './AIEEventProcessor'
import AIEPregnancyCalculator from './AIEPregnancyCalculator'
import AIEProperty from './AIEProperty'
import AIEMonitor from './AIEMonitor';

const DEFAULT_MAX_PRESTANCE = 1

export default abstract class AIEElement {
  private trigger: string
  protected baseElement: any
  private name: string
  private children: Array <AIEElement>
  private processor: AIEEventProcessor
  private parent: AIEElement
  private memory: AIEMemory
  private onChangeTrigger: string
  private pregnancy: number
  private pregnancyCalculator: AIEPregnancyCalculator
  private maxPregnancy: number
  private pregnancyBase: number
  private freePregnancy: number
  private updates: number
  private maxUpdates: number = null
  private born: number
  private properties: Array<AIEProperty> 

  public constructor(baseElement: any) {
    this.pregnancyBase = 0
    this.freePregnancy = 0
    if(baseElement) {
      this.setBaseElement(baseElement)
      this.name = this.getAttr('name').trim()
      this.trigger = this.getAttrs('trigger')
      this.pregnancyBase = parseFloat(this.getAttr('pregnancy'))
      this.freePregnancy = parseFloat(this.getAttr('free'))
      if (isNaN(this.pregnancyBase)) {
        this.pregnancyBase = 0
      }
      if (isNaN(this.freePregnancy)) {
        this.freePregnancy = 0
      }
      this.bindTriggers()
    }
    this.pregnancy = this.pregnancyBase
    this.children = []
    this.processor = null
    this.parent = null
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

  public updatePregnancy() {
    this.setPregnancy(this.pregnancyCalculator.calculate(this))
    this.updateChildrenPregnancy()
  }

  public getInteractions(): number {
    return this.memory.getScore()
  }

  public getEnvInteractions(): number {
    return this.parent 
      ? this.parent.getChildren().reduce((p, a) => p+a.getInteractions(), 0) 
      : 0
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

  getPregnancyIncrement(): number {
    return this.pregnancy - this.pregnancyBase
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
  
  public setOnChangeTrigger(trigger: string) {
    this.onChangeTrigger = trigger
  }
  
  public hasOnChangeTrigger(): boolean {
    return !!this.onChangeTrigger
  }
  
  public runOnChangeTrigger(): boolean {
    try {
      if (this.onChangeTrigger) {
        const trigger = new Function('pregnancy', this.onChangeTrigger )
        return trigger(this.getPregnancy())
      }
    } catch (excep) {
      console.warn ('Error parsing on change of <',this.getName(),'>:', excep)
    }
    return false
  }

  public getProperties(): Array<AIEProperty> {
    return this.properties || []
  } 

  public getPropertiesNames(): Array<String> {
    return this.getProperties().map((prop: AIEProperty) => prop.getName())
  }

  public setChildren(element: AIEElement) {
    this.children.push(element)
    const prevParent = element.getParent()
    if (prevParent) {
      prevParent.removeChild(element)
    }
    element.setParent(this)
  }

  private removeChild(element: AIEElement) {
    this.children = this.children.filter(c => c !== element)
  }

  public onTrigger(name: string) {
    if (this.processor) {
      this.processor.notify({ name, element: this })
    }
  }

  public getChildren() {
    return this.children
  }

  public incrementScore() {
    this.memory.anoteEvent()
  }

  public getScore(): number {
    return this.memory.getScore()
  }

  public updateChildrenPregnancy(): void {
    this.children.forEach((child) => child.updatePregnancy())
  }

  public getMaxAmbientPregnancy(): number {
    return this.children.reduce((total, child) => Math.max(total, child.getPregnancy()), 0)
  }

  public getTotalAmbientPregnancy(): number {
    if (!this.hasChildren()) {
      return this.getTotalPregnancy()
    }
    return this.children.reduce((total, child) => total + child.getTotalPregnancy(), 0)
  }

  public getMaxAmbientPropertyValue(name:string): number {
    const p = this.getProperty(name)
    
    if (!this.hasChildren() || !p) {
      return 0
    } 

    const sum = this.children.reduce((total, child) => {
      return total + this.getChildPropertyMaxValue(name, child.name)
    }, 0)
    return p.getTotal() || sum
  }

  public getProperty(nameProp: string): AIEProperty {
    return this.properties.find(p => p.getName() === nameProp)
  }

  public getChildPropertyValue(nameProp: string, childName: string): number {
    const p = this.getProperty(nameProp)
    return p ? p.getMeasure(childName).getValue() : 0
  }

  public getChildPropertyMaxValue(nameProp: string, childName: string): number {
    const p = this.properties.find(p => p.getName() === nameProp)
    if (!p) {
      return 0
    }
    const max = p.getMax(childName)
    return max || this.getChildPropertyValue(nameProp, childName)
  }

  public getPercentualPregnancy(): number {
    if (!this.hasParent()) {
      return 1
    }
    return this.getPregnancy() / this.parent.getPregnancy()
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

  public getTotalPregnancy(): number {
    return this.pregnancy + this.freePregnancy
  }

  public setFreePregnancy(free: number) {
    if (free > 0) {
      this.freePregnancy = free
    } else {
      this.freePregnancy = 0
    }
  }

  public getFreePregnancy() {
    return this.freePregnancy
  }

  public mutate(): void {
    this.transform()
    this.getChildren().forEach((child: AIEElement) => {
      child.mutate()
    })

    this.recalculatePregnancyAfterMutation()
  }

  private recalculatePregnancyAfterMutation() {
    const actualTotal:number = this.getTotalPregnancy()
    let totalChildren:number

    if (!this.properties.length) {
      totalChildren = this.getTotalAmbientPregnancy()
    } else { 
      totalChildren = this.children.reduce((totalChild, child: AIEElement) => {
        const childPregnancy:number = actualTotal * this.properties.reduce((total, prop) => {
          const childProp:number = prop.getMeasure(child.name).getValue() / this.getMaxAmbientPropertyValue(prop.getName())
          return total + (childProp || 0)
        }, 0)/this.properties.length || 0
        child.setPregnancy(childPregnancy)
        return totalChild + childPregnancy
      }, 0)
    }
    this.setFreePregnancy(actualTotal - totalChildren)
    this.pregnancy = totalChildren
  }

  public abstract initializeMemory(seed: string): AIEMemory
  public abstract setBaseElement(baseElement: any): void
  public abstract getAttr(attributeName: string): string
  public abstract getAttrs(attributeName: string): any
  public abstract getBaseElementParent(): Node
  public abstract getBaseElement(): any
  public abstract bindTriggers(): void
  public abstract getPhysicalAttributes(): any
  public abstract transform(): void
}
