import AIE from './AIE'

export default class AIEMonitor {
  static environments: Array<AIE> = []

  static addEnvironments(env: AIE) {
    AIEMonitor.environments.push(env)
  }

  static getEnvironments(): Array<AIE> {
    return AIEMonitor.environments
  }
}
