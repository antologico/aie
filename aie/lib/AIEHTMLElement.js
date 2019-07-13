import AIEElement from './AIEElement';
import AIEHTMLMemory from './AIEHTMLMemory';
import AIEHTMLProperty from './AIEHTMLProperty';
const MAX_ID = 'max';
const MIN_ID = 'min';
const HTML_SUFFIX_PRESTACE_FIELD = 'properties';
const HTML_SUFFIX_TRIGGER_ON_CHANGE = 'on-change';
const HTML_PREFIX = 'aie-';
/*
  The BaseElement is a DOM element
*/
export default class AIEHTMLElement extends AIEElement {
    constructor(baseElement) {
        super(baseElement);
    }
    parseAttr(text) {
        if (!text) {
            return [];
        }
        const properties = [];
        text.split(',').forEach(el => {
            const components = el.split('|');
            if (components.length) {
                const name = components.shift().trim();
                const property = new AIEHTMLProperty(name, this);
                components.forEach(element => {
                    const parts = element.split(':');
                    if (parts.length === 2) {
                        if (parts[0] === MAX_ID) {
                            property.setMax(parseFloat(parts[1].trim()));
                        }
                        if (parts[0] === MIN_ID) {
                            property.setMin(parseFloat(parts[1].trim()));
                        }
                    }
                });
                properties.push(property);
            }
        });
        return properties;
    }
    setChildren(element) {
        super.setChildren(element);
        this.setProperties(this.parseAttr(this.getAttr(HTML_SUFFIX_PRESTACE_FIELD)));
        this.setOnChangeTrigger(this.getAttr(HTML_SUFFIX_TRIGGER_ON_CHANGE));
    }
    initializeMemory(seed) {
        return new AIEHTMLMemory(seed);
    }
    setBaseElement(baseElement) {
        this.baseElement = baseElement;
        this.style = Object.assign({}, window.getComputedStyle(baseElement));
    }
    getBaseElement() {
        return this.baseElement;
    }
    getAttr(attributeName) {
        const name = `${HTML_PREFIX}${attributeName}`;
        if (this.baseElement === undefined) {
            return undefined;
        }
        const val = this.baseElement.attributes.getNamedItem(name);
        return val ? val.value : undefined;
    }
    getAttrs(attributeName) {
        const values = this.getAttr(attributeName);
        return values === undefined
            ? undefined
            : values.split(',').map(function (item) {
                return item.trim();
            });
    }
    bindTriggers() {
        const triggers = this.getTriggersName();
        for (let t in triggers) {
            this.baseElement.addEventListener(triggers[t], this.onTrigger.bind(this, triggers[t]));
        }
    }
    generate(baseElement) {
        return new AIEHTMLElement(baseElement);
    }
    getBaseElementParent() {
        return this.getBaseElement().parentNode;
    }
    transform() {
        this.getProperties().forEach(prop => {
            prop.transform(this);
        });
    }
    getPhysicalAttributes() {
        const el = this.getBaseElement();
        if (!el) {
            return {};
        }
        return this.getAbsoluteBoundingRect(el);
    }
    getAbsoluteBoundingRect(el) {
        const doc = document, win = window, body = doc.body, rect = el.getBoundingClientRect();
        // pageXOffset and pageYOffset work everywhere except IE <9.
        let offsetX = win.pageXOffset, offsetY = win.pageYOffset;
        if (el !== body) {
            let parentNode = el.parentNode;
            // The element's rect will be affected by the scroll positions of
            // *all* of its scrollable parents, not just the window, so we have
            // to walk up the tree and collect every scroll offset. Good times.
            while (parentNode !== body) {
                offsetX += parentNode.scrollLeft;
                offsetY += parentNode.scrollTop;
                parentNode = parentNode.parentNode;
            }
        }
        return {
            height: rect.height,
            left: rect.left + offsetX,
            top: rect.top + offsetY,
            width: rect.width
        };
    }
}
//# sourceMappingURL=AIEHTMLElement.js.map