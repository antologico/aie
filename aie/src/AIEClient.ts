import AIEMonitor from './AIEMonitor'
import AIE from './AIE'
import AIEElement from './AIEElement';

export default class AIEClient extends AIEMonitor {
    static enableLog: boolean = true

    static sendPregnancies (eventName: string = '', element: AIEElement, environmentName: string = '') : void {
        AIEClient.log('[AIE] AIEClient send pregnancies for <' + eventName + '>');
        const state = AIEMonitor.getState()
        if (state && state.length) {
            const detail = {
                event: eventName,
                aie: environmentName,
                element: element.getName(),
                pregnacy: element.getPregnancy(),
            }
            
            // Send PUT to server

        }
    }

    static log(text: string): void {
        AIEClient.enableLog && console.log(text)
    }

    static exposeEnviroments (): void {
        // Wait for events
        const w = (<any>window)
        // Dispatch events
        AIEMonitor.environments.map((env: AIE) => {
            env.registerEvent('change', (myEvent: string, element: AIEElement) => {
                AIEClient.sendPregnancies(myEvent, element, env.getName())
            })
        })
    }
}
