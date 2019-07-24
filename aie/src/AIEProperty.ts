import AIEElement from './AIEElement'
import AIEMeasure from './AIEMeasure';

export default abstract class AIEProperty {
    protected initialValues: any
    protected name: string
    protected max: number = null
    protected min: number = 0
    protected total: number = null
    protected number: number = 1
    protected transformFn: Function = null
    protected measures: Array<AIEMeasure> = []
    protected measure: AIEMeasure

    public constructor(name: string, initialValues: any) {
        this.name = name
        this.initialValues = initialValues
    }

    public getName(): string {
        return this.name
    }

    public setMeasure(childName: string, value: AIEMeasure) {
        this.measures[childName] = value
    }

    public getMeasure(childName: string) : AIEMeasure {
        const value = this.initialValues[childName]
        let m
        if (!this.measures[childName]) {
             m = this.measure.clone()
        } else {
            return this.measures[childName]
        }
        m.setValue(value)
        return m
    }

    public getTotal(): number {
        return this.total
    }

    public getMax(childName: string): number {
        const m = this.getMeasure(childName)
        return Math.min(this.max, m ? m.getValue() : (this.min || 0))
    }
    
    public setMax(max: number) {
        if (max < 0) {
            console.error('Maximum value must be greater than 0')
        }
        if (this.min && (max < this.min)) {
            console.error('Maximum value must be greater than the mininum')
        }
        this.max = max
    }
    public setTotal(total: number) {
        if (total < 0) {
            console.error('Maximum value must be greater than 0')
        }
        if (this.max && (total < this.max)) {
            console.error('total value must be greater than the maximun')
        }
        this.total = total
    }

    public setMin(min: number) {
        if (min < 0) {
            console.error('Mininum value must be greater than 0')
        }
        if (this.max && (min > this.max)) {
            console.error('Maximum value must be lower than the maximum')
        }
        this.min = min
    }

    public setTransform(fn: Function) {
        this.transformFn = fn.bind(this)
    }

    public dimensionedValue(value: number) {
        const dimensionedValue = this.max ? Math.min(value, this.max) : value
        return this.min ? Math.max(dimensionedValue, this.min) : dimensionedValue
    }

    public transform (element: AIEElement) {
        if (!element.hasOnChangeTrigger() || element.runOnChangeTrigger() !== false) {
            this.transformFn && this.transformFn(element, this.initialValues)
        } else {
            console.warn('Mutation for',name,'canceled by user')
        }
    }
}
