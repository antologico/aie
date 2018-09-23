export default class AIEProperty {
    protected name: string
    protected max: number = null
    protected min: number = null
    protected transformFn: Function = null

    public constructor(name: string) {
        this.name = name
    }

    public setMax(max: number) {
        this.max = max
    }

    public setMin(min: number) {
        this.min = min
    }

    public setTransform(fn: Function) {
        this.transformFn = fn.bind(this)
    }

    public transform () {
        this.transformFn && this.transformFn(arguments)
    }
}
