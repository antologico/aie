class EventDispatcher {
    constructor() {
        this.events = {}
    }

    registerEvent(event, func) {
        if (!this.events) {
            this.events = {}
        }

        if (!this.events[event]) {
            this.events[event] = func
            return
        }
        const oldFunc = this.events[event]
        this.events[event] = (values) => {
            oldFunc(values)
            func(values)
        }
    }
}

export default EventDispatcher
