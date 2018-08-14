import AIE from './AIE'
import AIEElement from './AIEElement'

export interface AIEEvent {
  name: string;
  element: AIEElement;
}

export default class AIEEventProcessor {
  private enviroment: AIE
  private queue: Array<AIEEvent>
  private interaction: number

  public constructor(enviroment: AIE) {
    this.enviroment = enviroment
    this.queue = []
    this.interaction = 0
    console.info('[AIE] Event processor initialized');
    this.inspect()
  }

  public notify (event: AIEEvent) {
    this.queue.push(event)
  }

  private inspect () {
    const event: AIEEvent = this.queue.shift()
    if (event) {
      console.info('[AIE] Procesing "', event.name, '" over', event.element.getName())
      if (event.element.hasParent()) {
        const elParent: AIEElement = event.element.getParent()
        elParent.updateChildrenPrestance()
        elParent.onTrigger()
      }
    }
    setTimeout(this.inspect.bind(this), 0)
  }

}
