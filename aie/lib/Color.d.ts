export default class Color {
    protected r: number;
    protected g: number;
    protected b: number;
    protected a: number;
    constructor(text: string);
    private incrementColor;
    increment(value: number): Color;
    toString(): string;
}
