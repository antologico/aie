import AIEMonitor from './AIEMonitor';
export default class AIEHTMLMonitor extends AIEMonitor {
    static interval: any;
    static eventSendName: string;
    static eventRestoreName: string;
    static eventConnectName: string;
    static eventApplyName: string;
    static enableLog: boolean;
    static restorePrestances(event: any): void;
    static mutateElements(event: any): void;
    static sendPrestances(eventName?: string, elementName?: string, environmentName?: string): void;
    static log(text: string): void;
    static exposeEnviroments(): void;
}
