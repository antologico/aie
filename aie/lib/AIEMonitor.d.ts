import AIE from './AIE';
export default class AIEMonitor {
    static environments: Array<AIE>;
    static addEnvironments(env: AIE): void;
    static getState(): any;
}
