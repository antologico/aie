import AIEElement from './AIEElement'

export default class AIEProperty {
    protected name: string
    protected max: number = null
    protected min: number = null
    protected transformFn: Function = null

    public constructor(name: string) {
        this.name = name
    }

    public getName() {
        return this.name
    }

    public setMax(max: number) {
        if (max < 1) {
            console.error('Mininum value must be greater than 1')
        }
        this.max = max
    }

    public setMin(min: number) {
        if (min < 0) {
            console.error('Mininum value must be greater than 0')
        }
        this.min = min
    }

    public setTransform(fn: Function) {
        this.transformFn = fn.bind(this)
    }

    public transform (element: AIEElement) {
        this.transformFn && this.transformFn(element)
    }
}
