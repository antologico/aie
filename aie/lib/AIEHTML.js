import AIE from './AIE';
import AIEHTMLElement from './AIEHTMLElement';
import AIEDefaultMaduration from './AIEDefaultMaduration';
import AIEDefaultMutation from './AIEDefaultMutation';
import AIEHTMLMonitor from './AIEHTMLMonitor';
/*
  The BaseElement is a DOM element
*/
export default class AIEHTML extends AIE {
    constructor(name, context = 'body') {
        super(name, context);
    }
    getElements() {
        return document.querySelectorAll(this.getContext() + '[aie-name], ' + this.getContext() + ' [aie-name]');
    }
    createElement(el) {
        return new AIEHTMLElement(el);
    }
    getPregnancySpeed() {
        return 1;
    }
    getMaduration() {
        return new AIEDefaultMaduration();
    }
    getMutation() {
        return new AIEDefaultMutation();
    }
    start() {
        AIEHTMLMonitor.log('[AIE] Running ...');
        super.start();
    }
}
//# sourceMappingURL=AIEHTML.js.map