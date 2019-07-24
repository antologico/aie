import AIEMeasure from "../AIEMeasure";
export default class Position extends AIEMeasure {
    protected value: number = 1

    public toString() {
        return this.value.toString()
    }
    public clone(): AIEMeasure {
        return new Position()
    }
    public calculate (): AIEMeasure {
        return new Position()
    }
    public setValue () {
    }
}