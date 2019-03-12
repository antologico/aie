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
            if (event.element.hasParent()) {
                const elParent = event.element.getParent();
                const increment = event.element.updatePrestance();
                elParent.updateChildrenPrestance(-increment, [event.element]);
                elParent.onTrigger(event.name);
                event.name && this.events.change(event.name, event.element);
            }
        }
        setTimeout(this.inspect.bind(this), 0);
    }
}
//# sourceMappingURL=AIEEventProcessor.js.map