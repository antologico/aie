export default abstract class AIEMeasure  {
    protected valid: boolean = false
    protected value: number = 0
    protected unit: string = null

    public getValue(): number {
        return this.value
    }

    public abstract toString(): string
    public abstract clone(): AIEMeasure
    public abstract calculate (value:number): AIEMeasure
    public abstract setValue (value:string)
}