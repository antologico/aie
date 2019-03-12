import AIE from './AIE';
import AIEHTMLElement from './AIEHTMLElement';
import AIEDefaultPrestanceSpeed from './AIEDefaultPrestanceSpeed';
import AIEDefaultMaduration from './AIEDefaultMaduration';
import AIEHTMLMonitor from './AIEHTMLMonitor';
/*
  The BaseElement is a DOM element
*/
export default class AIEHTML extends AIE {
    constructor(name, context = 'body') {
        super(name, context);
    }
    getElements() {
        return document.querySelectorAll(this.getContext() + ' [aie-name]');
    }
    createElement(el) {
        return new AIEHTMLElement(el);
    }
    getPrestanceSpeed() {
        return new AIEDefaultPrestanceSpeed();
    }
    getMaduration() {
        return new AIEDefaultMaduration();
    }
    start() {
        AIEHTMLMonitor.log('[AIE] Running ...');
        super.start();
    }
}
//# sourceMappingURL=AIEHTML.js.map