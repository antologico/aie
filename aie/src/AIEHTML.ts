import AIE from './AIE'
import AIEElement from './AIEElement'
import AIEHTMLElement from './AIEHTMLElement'
import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEAbstractMutation from './AIEAbstractMutation'
import AIEDefaultMaduration from './AIEDefaultMaduration'
import AIEDefaultMutation from './AIEDefaultMutation'
import AIEHTMLMonitor from './AIEHTMLMonitor'

/*
  The BaseElement is a DOM element
*/
export default class AIEHTML extends AIE {

  constructor(name: string, context = 'body') {
    super(name, context)
  } 

  public getElements():NodeListOf<HTMLElement> {
    return document.querySelectorAll(
      this.getContext() + '[aie-name], ' + this.getContext() + ' [aie-name]'
    )
  }

  public createElement(el: HTMLElement): AIEElement {
    return new AIEHTMLElement(el)
  }

  public getPregnancySpeed(): number {
    return 1
  }

  public getMaduration(): AIEAbstractMaduration {
    return new AIEDefaultMaduration()
  }

  public getMutation(): AIEAbstractMutation {
    return new AIEDefaultMutation()
  }

  public start() {
    AIEHTMLMonitor.log('[AIE] Running ...')
    super.start()
  }
}
