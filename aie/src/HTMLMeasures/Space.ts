import AIEMeasure from "../AIEMeasure";

const DEFAULT_UNIT = 'px'

export default class Space extends AIEMeasure {
    protected value: number = null
    protected initial: string = null
    protected initialValue: number = null
    
    public setValue (text: any) {
        const arr = (''+text).match(/(\d*)([a-z%]*)/)
        this.initial = text
        if (arr && arr[1]) {
            this.value = this.initialValue = parseFloat(arr[1])
            this.unit = arr[2] || DEFAULT_UNIT
            this.valid = true
        } else {
            this.valid = false
        }
    }

    isValid (): boolean {
        return this.valid
    }

    toString(): string {
        if (!this.isValid()) {
            return ''
        }
        return this.value + this.unit
    }

    public clone(): AIEMeasure {
        const m:Space = new Space()
        m.initial = this.initial
        m.unit = this.unit
        m.value = this.value
        m.valid = this.valid
        return m
    }

    calculate (value:number): AIEMeasure {
        const m: Space = <Space> this.clone()
        if (!this.isValid()) {
            return m
        }
        m.initial = this.initial
        m.value = Math.round(value)
        return m
    }
}