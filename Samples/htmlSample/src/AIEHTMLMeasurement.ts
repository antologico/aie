const DEFAULT_UNIT = 'px'

export default class AIEHTMLMeasurement  {
    protected val: number = null
    protected unit: string = null
    protected initial: string = null
    protected valid: boolean = false
    
    constructor (text: any) {
        const arr = (''+text).match(/(\d*)([a-z%]*)/)
        this.initial = text
        if (arr && arr[1]) {
            this.val = parseFloat(arr[1])
            this.unit = arr[2] || DEFAULT_UNIT
            this.valid = true
        }
    }

    isValid (): boolean {
        return this.valid
    }

    toString(): string {
        if (!this.isValid()) {
            return ''
        }
        return `${this.val}${this.unit}` 
    }

    multiply (value:number) {
        if (!this.isValid()) {
            return this.initial
        }
        this.val = Math.round(this.val * value)
        return this
    }
}