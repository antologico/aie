import AIEProperty from './AIEProperty';
import AIEElement from './AIEElement';
import AIEHTMLElement from './AIEHTMLElement';
export default class AIEHTMLProperty extends AIEProperty {
    constructor(name: string, element: AIEHTMLElement);
    colorFn(element: AIEElement): void;
    fontSizeFn(element: AIEElement): void;
    widthFn(element: AIEElement): void;
    heightFn(element: AIEElement): void;
    propDefaultFn(prop: string, element: AIEElement): void;
    positionFn(element: AIEElement): void;
    displayFn(element: any): void;
    getLevelParentElement(element: AIEElement, parentElement: AIEElement, topLevelParent: AIEElement): AIEElement;
    levelFn(element: AIEHTMLElement, topLevelParent: AIEElement): void;
}
