import AIEMeasure from "../AIEMeasure";

export default class Color extends AIEMeasure {
   protected color = {
        r: 0,
        g: 0,
        b: 0,
        a: null
    }
   protected initial = {
        r: 0,
        g: 0,
        b: 0,
        a: null
    }
    protected valid: boolean
    protected vector: Object = {}
    static MAX_VALUE: number = 128
    static DARK: number = -1
    static SHINY: number = 1

    public setValue(text:string) {
        const rgb = text.replace(/\s/g, '').match(/^(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d|\.]+))?\)$/);
        if(rgb) {
            this.initial.r = this.color.r = parseInt(rgb[2])
            this.initial.g = this.color.g = parseInt(rgb[3])
            this.initial.b = this.color.b = parseInt(rgb[4])
            this.initial.a = this.color.a = rgb[5] ? parseFloat(rgb[6]) : null
            this.calculateDominantValues()
            this.updateValue()
            this.valid = true
        } else { 
            this.valid = false
            console.error("Incorrect color format: <" + text + ">. Only rgb/rgba() is a valid color forma format for AIE")
        }   
    }


    private updateValue() {
        if (this.isDark(this.vector)) {
            this.value = Color.MAX_VALUE - Math.min(this.color.r, this.color.g, this.color.b)
        } else {
            this.value = Math.max(this.color.r, this.color.g, this.color.b) - Color.MAX_VALUE
        }
    }

    private calculateDominantValues() {
        this.vector = { 
            r: this.calculateVectorColorComponent(this.color.r),
            g: this.calculateVectorColorComponent(this.color.g),
            b: this.calculateVectorColorComponent(this.color.b),
        }
    }

    private isDark(color: any) {
        return (color.a === Color.DARK) && (color.color.b === Color.DARK) && (color.c === Color.DARK)
    }

    private calculateVectorColorComponent(color: number): number {
        return (color < Color.MAX_VALUE) ? Color.DARK : Color.SHINY
    }

    public calculate(value: number): AIEMeasure {
        const m:Color = <Color> this.clone()
        if (value < 0) {
            return m
        }
        const v = Math.min(value, Color.MAX_VALUE)
        m.color.r = this.calculateColorValue('r', v) 
        m.color.g = this.calculateColorValue('g', v)
        m.color.b = this.calculateColorValue('b', v)
        m.calculateDominantValues()
        m.updateValue()
        return m
    }

    public clone(): AIEMeasure {
        const m:Color = new Color()
        m.vector = Object.assign({}, this.vector)
        m.color = Object.assign({}, this.color)
        m.value = this.value
        m.valid = this.valid
        return m
    }

    private calculateColorValue(color: string, value: number): number {
        let v: number
        const original:number = parseFloat(this.initial[color])
        if (this.vector[color] === Color.SHINY) {
            v = ((Color.MAX_VALUE * 2) - original)  * value / Color.MAX_VALUE
        } else {
            v = -(original * value) / Color.MAX_VALUE
        }
        return Math.round(Math.min(original + v, Color.MAX_VALUE * 2))
    }

    public toString(): string {
        return `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a||'1'})` 
    }
}