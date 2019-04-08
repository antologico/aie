import AIEMonitor from './AIEMonitor';
export default class AIEClient extends AIEMonitor {
    static sendPregnancies(eventName = '', element, environmentName = '') {
        AIEClient.log('[AIE] AIEClient send pregnancies for <' + eventName + '>');
        const state = AIEMonitor.getState();
        if (state && state.length) {
            const detail = {
                event: eventName,
                aie: environmentName,
                element: element.getName(),
                pregnacy: element.getPregnancy(),
            };
            // Send PUT to server
        }
    }
    static log(text) {
        AIEClient.enableLog && console.log(text);
    }
    static exposeEnviroments() {
        // Wait for events
        const w = window;
        // Dispatch events
        AIEMonitor.environments.map((env) => {
            env.registerEvent('change', (myEvent, element) => {
                AIEClient.sendPregnancies(myEvent, element, env.getName());
            });
        });
    }
}
AIEClient.enableLog = true;
//# sourceMappingURL=AIEClient.js.map