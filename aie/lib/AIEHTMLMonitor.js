import AIEMonitor from './AIEMonitor';
export default class AIEHTMLMonitor extends AIEMonitor {
    static restorePregnancies(event) {
        const pregnancies = JSON.parse(event.detail);
        AIEHTMLMonitor.log('[AIE] AIEHTMLMonitor restore pregnancies');
        pregnancies.map((group) => {
            const aie = AIEMonitor.environments.find((env) => env.getName() === group.name);
            if (aie) {
                aie.setState(group);
            }
        });
    }
    static mutateElements(event) {
        const pregnancies = JSON.parse(event.detail);
        AIEHTMLMonitor.log('[AIE] AIEHTMLMonitor mutate elements');
        pregnancies
            ? pregnancies.map((group) => {
                const aie = AIEMonitor.environments.find((env) => env.getName() === group.name);
                if (aie) {
                    aie.setState(group);
                    aie.mutate();
                }
            })
            : AIEMonitor.environments.forEach((env) => env.mutate());
        AIEHTMLMonitor.sendPregnancies('Reconnect', 'Document', 'All');
    }
    static sendPregnancies(eventName = '', elementName = '', environmentName = '') {
        AIEHTMLMonitor.log('[AIE] AIEHTMLMonitor send pregnancies for <' + eventName + '>');
        const state = AIEMonitor.getState();
        if (state && state.length) {
            const detail = {
                event: eventName,
                aie: environmentName,
                element: elementName,
                state,
            };
            const event = new CustomEvent(AIEHTMLMonitor.eventSendName, { 'detail': JSON.stringify(detail) });
            window.dispatchEvent(event);
        }
    }
    static log(text) {
        AIEHTMLMonitor.enableLog && console.log(text);
    }
    static exposeEnviroments() {
        // Wait for events
        const w = window;
        w.addEventListener(AIEHTMLMonitor.eventConnectName, () => { AIEHTMLMonitor.sendPregnancies('Reconnect', 'Document', 'All'); });
        w.addEventListener(AIEHTMLMonitor.eventRestoreName, AIEHTMLMonitor.restorePregnancies);
        w.addEventListener(AIEHTMLMonitor.eventApplyName, AIEHTMLMonitor.mutateElements);
        // Dispatch events
        AIEMonitor.environments.map((env) => {
            env.registerEvent('change', (myEvent, element) => {
                AIEHTMLMonitor.sendPregnancies(myEvent, element.getName(), env.getName());
            });
        });
    }
}
AIEHTMLMonitor.eventSendName = 'aie-update';
AIEHTMLMonitor.eventRestoreName = 'aie-restore';
AIEHTMLMonitor.eventConnectName = 'aie-connect';
AIEHTMLMonitor.eventApplyName = 'aie-mutate';
AIEHTMLMonitor.enableLog = true;
//# sourceMappingURL=AIEHTMLMonitor.js.map