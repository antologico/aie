export default class Color {
    protected r: number= 0
    protected g: number = 0
    protected b: number = 0
    protected a: number = 1
 
    constructor(text:string) {
        const rgb = text.match(/^(rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d|\.]+))?\)$/);
        if(!rgb) {
            this.r = parseInt(rgb[2])
            this.g = parseInt(rgb[3])
            this.b = parseInt(rgb[4])
            this.a = rgb[5] && parseFloat(rgb[6])
        }
    }
    private incrementColor(prop: number, value: number) {
        const result = prop * value
        if (result > 255) {
            return 255
        }
        return result
    }

    public increment(value: number): Color {
        if (value < 0) {
            return
        }
        this.r = this.incrementColor(this.r, value)
        this.g = this.incrementColor(this.g, value)
        this.b = this.incrementColor(this.b, value)

        return this
    }

    public toString(): string {
        return `rgba(${this.r},${this.g},${this.b},${this.a})` 
    }
}