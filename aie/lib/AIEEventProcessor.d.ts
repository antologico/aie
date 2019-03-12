import AIE from './AIE';
import AIEElement from './AIEElement';
export interface AIEEvent {
    name: string;
    element: AIEElement;
}
export default class AIEEventProcessor {
    private enviroment;
    private queue;
    private interaction;
    private events;
    constructor(enviroment: AIE);
    notify(event: AIEEvent): void;
    registerEvent(event: string, func: any): void;
    private inspect;
}
