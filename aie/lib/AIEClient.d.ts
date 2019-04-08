import AIEMonitor from './AIEMonitor';
import AIEElement from './AIEElement';
export default class AIEClient extends AIEMonitor {
    static enableLog: boolean;
    static sendPregnancies(eventName: string, element: AIEElement, environmentName?: string): void;
    static log(text: string): void;
    static exposeEnviroments(): void;
}
