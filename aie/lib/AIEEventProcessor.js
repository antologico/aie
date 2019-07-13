export default class AIEEventProcessor {
    constructor(enviroment) {
        this.enviroment = enviroment;
        this.queue = [];
        this.events = {
            change: () => { },
        };
        this.interaction = 0;
        this.inspect();
    }
    notify(event) {
        this.queue.push(event);
    }
    registerEvent(event, func) {
        this.events[event] = func;
    }
    inspect() {
        const event = this.queue.shift();
        if (event) {
            let element = event.element;
            let elParent;
            element.incrementScore();
            while (element.hasParent()) {
                elParent = element.getParent();
                elParent.incrementScore();
                element = elParent;
            }
            this.enviroment.updatePregnancy();
            // For monitoring ...
            event.name && this.events.change(event.name, event.element);
        }
        setTimeout(this.inspect.bind(this), 0);
    }
}
//# sourceMappingURL=AIEEventProcessor.js.map