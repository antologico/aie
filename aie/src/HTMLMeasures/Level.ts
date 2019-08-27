import AIEMeasure from "../AIEMeasure";
export default class Level extends AIEMeasure {
    protected value: number = 1

    public toString() {
        return this.value.toString()
    }
    public clone(): AIEMeasure {
        const c = new Level()
        c.value = this.value
        return c
    }
    public calculate (value: number ): AIEMeasure {
        const c = new Level()
        c.value = value
        return c
    }
    public setValue () {
    }
}