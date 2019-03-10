import AIE from './AIE'
import AIEElement from './AIEElement'
import AIEHTMLElement from './AIEHTMLElement'
import AIEAbstractPrestanceSpeed from './AIEAbstractPrestanceSpeed'
import AIEAbstractMaduration from './AIEAbstractMaduration'
import AIEDefaultPrestanceSpeed from './AIEDefaultPrestanceSpeed'
import AIEDefaultMaduration from './AIEDefaultMaduration'
import AIEHTMLMonitor from './AIEHTMLMonitor'

/*
  The BaseElement is a DOM element
*/
export default class AIEHTML extends AIE {

  constructor(name: string, context = 'body') {
    super(name, context)
  }

  public getElements():NodeListOf<HTMLElement> {
    return document.querySelectorAll(this.getContext() + ' [aie-name]')
  }

  public createElement(el: HTMLElement): AIEElement {
    return new AIEHTMLElement(el)
  }

  public getPrestanceSpeed(): AIEAbstractPrestanceSpeed {
    return new AIEDefaultPrestanceSpeed()
  }

  public getMaduration(): AIEAbstractMaduration {
    return new AIEDefaultMaduration()
  }

  public start() {
    AIEHTMLMonitor.log('[AIE] Running ...')
    super.start()
  }
}
