import AIEMonitor from './AIEMonitor';
export default class AIEHTMLMonitor extends AIEMonitor {
    static eventSendName: string;
    static eventRestoreName: string;
    static eventConnectName: string;
    static eventApplyName: string;
    static enableLog: boolean;
    static restorePregnancies(event: any): void;
    static mutateElements(event: any): void;
    static sendPregnancies(eventName?: string, elementName?: string, environmentName?: string, serverUrl?: string, userName?: any): void;
    static sendPost(serverUrl: string, body: string): void;
    static log(text: string): void;
    static error(text: string): void;
    static exposeEnviroments(serverUrl?: string, userName?: string): void;
}
