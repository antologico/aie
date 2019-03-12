export default class AIEMonitor {
    static addEnvironments(env) {
        AIEMonitor.environments.push(env);
    }
    static getState() {
        return AIEMonitor.environments.map((env) => env.getState());
    }
}
AIEMonitor.environments = [];
//# sourceMappingURL=AIEMonitor.js.map